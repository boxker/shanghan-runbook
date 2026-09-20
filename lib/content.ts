import fs from "node:fs";
import path from "node:path";
import type { Clause, Formula, FormulaComparison, ReviewItem, ReviewStatus } from "./content-types";

const ROOT = path.join(process.cwd(), "content");

export const channelOrder = ["太阳", "阳明", "少阳", "太阴", "少阴", "厥阴"] as const;

export const clauseSourceNote =
  "v0.3.2 起，条文可额外记录异文说明；草稿 → 初校 → 已校的审核流保持不变。异文说明用于记录不同底本、字形、标点或编号差异，不代表项目替某一版本作最终裁断。";

function parseValue(raw: string): unknown {
  const value = raw.trim();
  if (!value) return "";
  if (
    value.startsWith('"') ||
    value.startsWith("[") ||
    value === "true" ||
    value === "false" ||
    /^-?\d+(\.\d+)?$/.test(value)
  ) {
    try {
      return JSON.parse(value);
    } catch {
      return value.replace(/^"|"$/g, "");
    }
  }
  return value;
}

function parseDocument(filePath: string) {
  const raw = fs.readFileSync(filePath, "utf8");
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!match) throw new Error(`Invalid content document: ${filePath}`);

  const meta: Record<string, unknown> = {};
  for (const line of match[1].split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf(":");
    if (idx < 1) continue;
    meta[trimmed.slice(0, idx).trim()] = parseValue(trimmed.slice(idx + 1));
  }

  const sections: Record<string, string> = {};
  const body = match[2].trim();
  const parts = body.split(/^##\s+/m);
  for (const part of parts) {
    if (!part.trim()) continue;
    const [heading, ...rest] = part.split("\n");
    sections[heading.trim()] = rest.join("\n").trim();
  }

  return { meta, sections };
}

function listMdx(dir: string) {
  const full = path.join(ROOT, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => path.join(full, name));
}

export function getClauses(): Clause[] {
  return listMdx("clauses")
    .map((filePath) => {
      const { meta, sections } = parseDocument(filePath);
      return {
        id: String(meta.id),
        number: Number(meta.number),
        channel: meta.channel as Clause["channel"],
        title: String(meta.title),
        original: sections["原文"] || "",
        plain: sections["白话"] || "",
        learningNote: sections["初学提示"] || "",
        keywords: (meta.keywords || []) as string[],
        pattern: meta.pattern ? String(meta.pattern) : undefined,
        formula: meta.formula ? String(meta.formula) : undefined,
        formulaSlug: meta.formulaSlug ? String(meta.formulaSlug) : undefined,
        sourceName: String(meta.sourceName || ""),
        sourceEdition: String(meta.sourceEdition || ""),
        sourceUrl: String(meta.sourceUrl || ""),
        variantNotes: meta.variantNotes ? String(meta.variantNotes) : undefined,
        reviewStatus: meta.reviewStatus as Clause["reviewStatus"],
        reviewedAt: String(meta.reviewedAt || ""),
        verifiedBy: meta.verifiedBy ? String(meta.verifiedBy) : undefined,
      };
    })
    .sort((a, b) => a.number - b.number);
}

export function getClause(id: string) {
  return getClauses().find((item) => item.id === id);
}

export function getFormulas(): Formula[] {
  return listMdx("formulas")
    .map((filePath) => {
      const { meta, sections } = parseDocument(filePath);
      return {
        slug: String(meta.slug),
        name: String(meta.name),
        channel: String(meta.channel),
        summary: sections["定位"] || "",
        clues: (meta.clues || []) as string[],
        caution: sections["安全提示"] || "",
        composition: (meta.composition || []) as string[],
        clauseIds: (meta.clauseIds || []) as string[],
        aliases: (meta.aliases || []) as string[],
        comparison: sections["对比理解"] || "",
        sourceName: String(meta.sourceName || ""),
        sourceUrl: String(meta.sourceUrl || ""),
        reviewStatus: meta.reviewStatus as Formula["reviewStatus"],
        reviewedAt: String(meta.reviewedAt || ""),
        verifiedBy: meta.verifiedBy ? String(meta.verifiedBy) : undefined,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name, "zh-CN"));
}

export function getFormula(slug: string) {
  return getFormulas().find((item) => item.slug === slug);
}

export function getComparisons(): FormulaComparison[] {
  return listMdx("comparisons")
    .map((filePath) => {
      const { meta, sections } = parseDocument(filePath);
      const points = ((meta.points || []) as string[]).map((row) => {
        const [axis, left, right] = row.split("|");
        return { axis, left, right };
      });
      return {
        slug: String(meta.slug),
        title: String(meta.title),
        leftSlug: String(meta.leftSlug),
        rightSlug: String(meta.rightSlug),
        points,
        summary: sections["一句话"] || "",
        decisionGuide: sections["辨别顺序"] || "",
        confusion: sections["为什么容易混淆"] || "",
        questions: (sections["学习题"] || "")
          .split("\n")
          .map((line) => line.trim().replace(/^[-*]\s+/, ""))
          .filter(Boolean),
        safety: sections["安全提示"] || "",
        reviewStatus: meta.reviewStatus as FormulaComparison["reviewStatus"],
        reviewedAt: String(meta.reviewedAt || ""),
        verifiedBy: meta.verifiedBy ? String(meta.verifiedBy) : undefined,
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title, "zh-CN"));
}

export function getComparison(slug: string) {
  return getComparisons().find((item) => item.slug === slug);
}

export function getFormulaComparisons(formulaSlug: string) {
  return getComparisons().filter(
    (item) => item.leftSlug === formulaSlug || item.rightSlug === formulaSlug
  );
}

export function getKeywordIndex() {
  const map = new Map<string, Clause[]>();
  for (const clause of getClauses()) {
    for (const keyword of clause.keywords) {
      const items = map.get(keyword) || [];
      items.push(clause);
      map.set(keyword, items);
    }
  }
  return [...map.entries()]
    .map(([keyword, clauses]) => ({ keyword, clauses }))
    .sort((a, b) => b.clauses.length - a.clauses.length || a.keyword.localeCompare(b.keyword, "zh-CN"));
}

export function getReviewItems(): ReviewItem[] {
  return [
    ...getClauses().map((item) => ({
      kind: "条文" as const,
      id: item.id,
      title: `#${item.number} ${item.title}`,
      href: `/clauses/${item.id}`,
      reviewStatus: item.reviewStatus,
      reviewedAt: item.reviewedAt,
      verifiedBy: item.verifiedBy,
    })),
    ...getFormulas().map((item) => ({
      kind: "方剂" as const,
      id: item.slug,
      title: item.name,
      href: `/formulas/${item.slug}`,
      reviewStatus: item.reviewStatus,
      reviewedAt: item.reviewedAt,
      verifiedBy: item.verifiedBy,
    })),
    ...getComparisons().map((item) => ({
      kind: "对比" as const,
      id: item.slug,
      title: item.title,
      href: `/comparisons/${item.slug}`,
      reviewStatus: item.reviewStatus,
      reviewedAt: item.reviewedAt,
      verifiedBy: item.verifiedBy,
    })),
  ];
}

export function getReviewSummary() {
  const items = getReviewItems();
  const counts: Record<ReviewStatus, number> = { 草稿: 0, 初校: 0, 已校: 0 };
  for (const item of items) counts[item.reviewStatus] += 1;
  return { items, counts, total: items.length };
}
