import Link from "next/link";
import { getFormulas } from "@/lib/content";

export default function FormulasPage() {
  const formulas = getFormulas();

  return (
    <>
      <section className="pageHead">
        <span className="eyebrow">FORMULA LIBRARY · v0.3</span>
        <h1>方剂详情库</h1>
        <p>
          方剂不再只是卡片：每个方都关联代表条文、组成名称、对比理解、来源与校审状态。
          这里展示的是古籍知识关系，不提供可执行的处方方案。
        </p>
        <div className="stats">
          <div><strong>{formulas.length}</strong><span>方剂条目</span></div>
          <div><strong>MDX</strong><span>内容源</span></div>
          <div><strong>引用</strong><span>条文关联</span></div>
        </div>
      </section>

      <div className="grid two">
        {formulas.map((item) => (
          <Link className="card formula" href={`/formulas/${item.slug}`} key={item.slug}>
            <div className="clauseMeta">
              <span className="tag">{item.channel}</span>
              <span className="reviewBadge">{item.reviewStatus}</span>
            </div>
            <h2>{item.name}</h2>
            <p>{item.summary}</p>
            <h3>经典学习线索</h3>
            <div className="chips">{item.clues.map(c => <span key={c}>{c}</span>)}</div>
            <div className="formulaFoot">
              <span>{item.clauseIds.length} 条关联条文</span>
              <strong>查看详情 →</strong>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
