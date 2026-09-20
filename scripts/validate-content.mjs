import fs from "node:fs";
import path from "node:path";

const ROOT = path.join(process.cwd(), "content");
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
  return fs.readdirSync(full).filter(x => x.endsWith(".mdx")).map(x => path.join(full, x));
}

const clauseDocs = files("clauses").map(file => ({ file, ...parse(file) }));
const formulaDocs = files("formulas").map(file => ({ file, ...parse(file) }));

const clauseIds = new Set();
const clauseNumbers = new Set();

for (const doc of clauseDocs) {
  const m = doc.meta;
  for (const key of ["id","number","channel","title","keywords","sourceName","sourceEdition","sourceUrl","reviewStatus","reviewedAt"]) {
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
  if (!statuses.has(m.reviewStatus)) errors.push(`${doc.file}: invalid reviewStatus ${m.reviewStatus}`);
  if (!String(m.sourceUrl || "").startsWith("https://")) errors.push(`${doc.file}: sourceUrl must use https`);
}

const formulaSlugs = new Set();
for (const doc of formulaDocs) {
  const m = doc.meta;
  for (const key of ["slug","name","channel","clues","composition","clauseIds","sourceName","sourceUrl","reviewStatus","reviewedAt"]) {
    if (m[key] === undefined || m[key] === "") errors.push(`${doc.file}: missing ${key}`);
  }
  for (const section of ["定位","对比理解","安全提示"]) {
    if (!doc.sections[section]) errors.push(`${doc.file}: missing section ## ${section}`);
  }
  if (formulaSlugs.has(String(m.slug))) errors.push(`${doc.file}: duplicate formula slug ${m.slug}`);
  formulaSlugs.add(String(m.slug));
  if (!statuses.has(m.reviewStatus)) errors.push(`${doc.file}: invalid reviewStatus ${m.reviewStatus}`);
  if (!String(m.sourceUrl || "").startsWith("https://")) errors.push(`${doc.file}: sourceUrl must use https`);
  for (const id of m.clauseIds || []) {
    if (!clauseIds.has(String(id))) errors.push(`${doc.file}: references missing clause ${id}`);
  }
}

for (const doc of clauseDocs) {
  const slug = doc.meta.formulaSlug;
  if (slug && !formulaSlugs.has(String(slug))) errors.push(`${doc.file}: references missing formula ${slug}`);
}

if (errors.length) {
  console.error("\nContent validation failed:\n");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Content validation passed: ${clauseDocs.length} clauses, ${formulaDocs.length} formulas.`);
