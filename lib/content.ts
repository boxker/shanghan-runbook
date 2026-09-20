import fs from "node:fs";
import path from "node:path";
import type { Clause, Formula } from "./content-types";

const ROOT = path.join(process.cwd(), "content");

export const channelOrder = ["太阳", "阳明", "少阳", "太阴", "少阴", "厥阴"] as const;

export const clauseSourceNote =
  "v0.3 起，条文内容由 content/clauses/*.mdx 管理，并记录公开核对来源、底本说明和校审状态。条文编号仍采用常见宋本编号体系作学习索引；不同整理本可能存在编号、异体字和个别文字差异。";

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
        reviewStatus: meta.reviewStatus as Clause["reviewStatus"],
        reviewedAt: String(meta.reviewedAt || ""),
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
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name, "zh-CN"));
}

export function getFormula(slug: string) {
  return getFormulas().find((item) => item.slug === slug);
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
