import Link from "next/link";
import { channels } from "@/data/content";
import { getClauses, getFormulas } from "@/lib/content";

export default function KnowledgeMapPage() {
  const clauses = getClauses();
  const formulas = getFormulas();

  return (
    <>
      <section className="pageHead">
        <span className="eyebrow">KNOWLEDGE GRAPH · v0.3</span>
        <h1>六经 → 条文 → 方剂</h1>
        <p>
          每一个节点都来自内容库。点击条文可查看来源和校审状态，点击方剂可进入详情页。
        </p>
      </section>

      <div className="knowledgeMap">
        {channels.map((channel) => {
          const channelClauses = clauses.filter((item) => item.channel === channel.name);
          const channelFormulas = formulas.filter((item) =>
            channelClauses.some((clause) => clause.formulaSlug === item.slug) ||
            item.channel.startsWith(channel.name)
          );

          return (
            <section className="mapLane" key={channel.name}>
              <Link href="/learn" className="mapChannel">
                <span className="tag">{channel.name}</span>
                <strong>{channel.hint}</strong>
              </Link>

              <div className="mapArrow">→</div>

              <div className="mapClauses">
                {channelClauses.length ? channelClauses.map((clause) => (
                  <Link href={`/clauses/${clause.id}`} key={clause.id}>
                    #{clause.number} {clause.title}
                  </Link>
                )) : <span className="muted">后续补充条文</span>}
              </div>

              <div className="mapArrow">→</div>

              <div className="mapFormulas">
                {channelFormulas.length ? channelFormulas.map((formula) => (
                  <Link href={`/formulas/${formula.slug}`} key={formula.slug}>{formula.name}</Link>
                )) : <span className="muted">先学总纲</span>}
              </div>
            </section>
          );
        })}
      </div>

      <aside className="notice">
        <strong>怎么看这张图：</strong>
        先从六经定位，再读条文，最后进入方剂详情。图中的箭头表示经典学习关联，
        不表示现代医学中的病程顺序，也不表示现实处方路径。
      </aside>
    </>
  );
}
