import ClauseExplorer from "@/components/ClauseExplorer";
import { clauseSourceNote, getClauses } from "@/lib/content";

export default async function ClausesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const clauses = getClauses();

  return (
    <>
      <section className="pageHead">
        <span className="eyebrow">CLAUSE LIBRARY · v0.3</span>
        <h1>条文学习库</h1>
        <p>
          原文、白话、关键词、方证关系与来源信息统一由 MDX 内容文件管理。
          每次构建都会自动检查编号重复、缺失来源和引用断链。
        </p>
        <div className="stats">
          <div><strong>{clauses.length}</strong><span>学习条文</span></div>
          <div><strong>6</strong><span>六经覆盖</span></div>
          <div><strong>MDX</strong><span>内容工程化</span></div>
        </div>
      </section>

      <ClauseExplorer clauses={clauses} initialQuery={q} />

      <aside className="notice sourceNote">
        <strong>版本说明：</strong>{clauseSourceNote}
      </aside>
    </>
  );
}
