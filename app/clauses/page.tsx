import ClauseExplorer from "@/components/ClauseExplorer";
import { clauseSourceNote, clauses } from "@/data/clauses";

export default function ClausesPage() {
  return (
    <>
      <section className="pageHead">
        <span className="eyebrow">CLAUSE LIBRARY · v0.2</span>
        <h1>条文学习库</h1>
        <p>
          从核心条文开始，原文、白话解释、关键词、六经和方证放在一起看。
          先建立关系，再逐步扩展到完整条文集。
        </p>
        <div className="stats">
          <div><strong>{clauses.length}</strong><span>核心条文</span></div>
          <div><strong>6</strong><span>六经覆盖</span></div>
          <div><strong>全文</strong><span>关键词搜索</span></div>
        </div>
      </section>

      <ClauseExplorer />

      <aside className="notice sourceNote">
        <strong>版本说明：</strong>{clauseSourceNote}
      </aside>
    </>
  );
}
