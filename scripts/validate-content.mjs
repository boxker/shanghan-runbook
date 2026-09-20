import fs from "node:fs";
import path from "node:path";

const ROOT = path.join(process.cwd(), "content");
const RUNBOOK_FILE = path.join(process.cwd(), "data", "runbook.ts");
const statuses = new Set(["草稿", "初校", "已校"]);
let errors = [];

function parseValue(raw) {
  const value = raw.trim();
  if (!value) return "";
  if (value.startsWith('"') || value.startsWith("[") || value === "true" || value === "false" || /^-?\d+(\.\d+)?$/.test(value)) {
    try { return JSON.parse(value); } catch { return value.replace(/^"|"$/g, ""); }
  }
  return value;
}

function parse(file) {
  const raw = fs.readFileSync(file, "utf8");
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!match) {
    errors.push(`${file}: missing valid frontmatter`);
    return { meta: {}, sections: {} };
  }
  const meta = {};
  for (const line of match[1].split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf(":");
    if (idx < 1) continue;
    meta[trimmed.slice(0, idx).trim()] = parseValue(trimmed.slice(idx + 1));
  }
  const sections = {};
  for (const part of match[2].trim().split(/^##\s+/m)) {
    if (!part.trim()) continue;
    const [heading, ...rest] = part.split("\n");
    sections[heading.trim()] = rest.join("\n").trim();
  }
  return { meta, sections };
}

function files(dir) {
  const full = path.join(ROOT, dir);
  if (!fs.existsSync(full)) return [];
  return fs.readdirSync(full).filter(x => x.endsWith(".mdx")).map(x => path.join(full, x));
}

function validateReview(file, meta) {
  if (!statuses.has(meta.reviewStatus)) {
    errors.push(`${file}: invalid reviewStatus ${meta.reviewStatus}`);
    return;
  }
  if (meta.reviewStatus === "初校" && !String(meta.reviewedAt || "").trim()) {
    errors.push(`${file}: 初校 requires reviewedAt`);
  }
  if (meta.reviewStatus === "已校") {
    if (!String(meta.reviewedAt || "").trim()) errors.push(`${file}: 已校 requires reviewedAt`);
    if (!String(meta.verifiedBy || "").trim()) errors.push(`${file}: 已校 requires verifiedBy`);
  }
}

const clauseDocs = files("clauses").map(file => ({ file, ...parse(file) }));
const formulaDocs = files("formulas").map(file => ({ file, ...parse(file) }));
const comparisonDocs = files("comparisons").map(file => ({ file, ...parse(file) }));

const clauseIds = new Set();
const clauseNumbers = new Set();

for (const doc of clauseDocs) {
  const m = doc.meta;
  for (const key of ["id","number","channel","title","keywords","sourceName","sourceEdition","sourceUrl","reviewStatus"]) {
    if (m[key] === undefined || m[key] === "") errors.push(`${doc.file}: missing ${key}`);
  }
  for (const section of ["原文","白话","初学提示"]) {
    if (!doc.sections[section]) errors.push(`${doc.file}: missing section ## ${section}`);
  }
  if (clauseIds.has(String(m.id))) errors.push(`${doc.file}: duplicate clause id ${m.id}`);
  if (clauseNumbers.has(Number(m.number))) errors.push(`${doc.file}: duplicate clause number ${m.number}`);
  clauseIds.add(String(m.id));
  clauseNumbers.add(Number(m.number));
  if (!Array.isArray(m.keywords) || m.keywords.length === 0) errors.push(`${doc.file}: keywords must be a non-empty array`);
  if (!String(m.sourceUrl || "").startsWith("https://")) errors.push(`${doc.file}: sourceUrl must use https`);
  if (m.variantNotes !== undefined && typeof m.variantNotes !== "string") errors.push(`${doc.file}: variantNotes must be a string`);
  validateReview(doc.file, m);
}

const formulaSlugs = new Set();
for (const doc of formulaDocs) {
  const m = doc.meta;
  for (const key of ["slug","name","channel","clues","composition","clauseIds","sourceName","sourceUrl","reviewStatus"]) {
    if (m[key] === undefined || m[key] === "") errors.push(`${doc.file}: missing ${key}`);
  }
  for (const section of ["定位","对比理解","安全提示"]) {
    if (!doc.sections[section]) errors.push(`${doc.file}: missing section ## ${section}`);
  }
  if (formulaSlugs.has(String(m.slug))) errors.push(`${doc.file}: duplicate formula slug ${m.slug}`);
  formulaSlugs.add(String(m.slug));
  if (!String(m.sourceUrl || "").startsWith("https://")) errors.push(`${doc.file}: sourceUrl must use https`);
  for (const id of m.clauseIds || []) {
    if (!clauseIds.has(String(id))) errors.push(`${doc.file}: references missing clause ${id}`);
  }
  validateReview(doc.file, m);
}

for (const doc of clauseDocs) {
  const slug = doc.meta.formulaSlug;
  if (slug && !formulaSlugs.has(String(slug))) errors.push(`${doc.file}: references missing formula ${slug}`);
}

const comparisonSlugs = new Set();
for (const doc of comparisonDocs) {
  const m = doc.meta;
  for (const key of ["slug","title","leftSlug","rightSlug","points","reviewStatus"]) {
    if (m[key] === undefined || m[key] === "") errors.push(`${doc.file}: missing ${key}`);
  }
  for (const section of ["一句话","为什么容易混淆","辨别顺序","学习题","安全提示"]) {
    if (!doc.sections[section]) errors.push(`${doc.file}: missing section ## ${section}`);
  }
  const questions = String(doc.sections["学习题"] || "")
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean);
  if (questions.length < 3) errors.push(`${doc.file}: 学习题 requires at least three questions`);
  if (comparisonSlugs.has(String(m.slug))) errors.push(`${doc.file}: duplicate comparison slug ${m.slug}`);
  comparisonSlugs.add(String(m.slug));
  if (!formulaSlugs.has(String(m.leftSlug))) errors.push(`${doc.file}: missing left formula ${m.leftSlug}`);
  if (!formulaSlugs.has(String(m.rightSlug))) errors.push(`${doc.file}: missing right formula ${m.rightSlug}`);
  if (m.leftSlug === m.rightSlug) errors.push(`${doc.file}: comparison cannot compare a formula with itself`);
  if (!Array.isArray(m.points) || m.points.length < 2) {
    errors.push(`${doc.file}: points must contain at least two rows`);
  } else {
    for (const row of m.points) {
      if (String(row).split("|").length !== 3) errors.push(`${doc.file}: invalid comparison point ${row}`);
    }
  }
  validateReview(doc.file, m);
}

if (fs.existsSync(RUNBOOK_FILE)) {
  const runbook = fs.readFileSync(RUNBOOK_FILE, "utf8");
  const nodeIds = new Set(
    [...runbook.matchAll(/^  (?:"([^"]+)"|([A-Za-z0-9_-]+)):\s*\{/gm)]
      .map(match => match[1] || match[2])
  );

  for (const match of runbook.matchAll(/\b(?:yes|no):\s*"([^"]+)"/g)) {
    const target = match[1];
    if (!nodeIds.has(target)) errors.push(`data/runbook.ts: references missing node ${target}`);
  }

  for (const match of runbook.matchAll(/formulaSlug:\s*"([^"]+)"/g)) {
    const slug = match[1];
    if (!formulaSlugs.has(slug)) errors.push(`data/runbook.ts: references missing formula ${slug}`);
  }

  for (const match of runbook.matchAll(/clauseIds:\s*\[([^\]]*)\]/g)) {
    const ids = [...match[1].matchAll(/"([^"]+)"/g)].map(item => item[1]);
    for (const id of ids) {
      if (!clauseIds.has(id)) errors.push(`data/runbook.ts: references missing clause ${id}`);
    }
  }
}

if (errors.length) {
  console.error("\nContent validation failed:\n");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

const reviewCounts = { 草稿: 0, 初校: 0, 已校: 0 };
for (const doc of [...clauseDocs, ...formulaDocs, ...comparisonDocs]) reviewCounts[doc.meta.reviewStatus] += 1;
console.log(`Content validation passed: ${clauseDocs.length} clauses, ${formulaDocs.length} formulas, ${comparisonDocs.length} comparisons.`);
console.log(`Review status: 草稿 ${reviewCounts.草稿}, 初校 ${reviewCounts.初校}, 已校 ${reviewCounts.已校}.`);
