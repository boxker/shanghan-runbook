import Link from "next/link";
import { channels, formulas } from "@/data/content";
import { clauses } from "@/data/clauses";

export default function KnowledgeMapPage() {
  return (
    <>
      <section className="pageHead">
        <span className="eyebrow">KNOWLEDGE GRAPH</span>
        <h1>六经 → 条文 → 方证</h1>
        <p>
          初学时最容易把方名、条文和六经记成互不相干的碎片。这个页面把它们重新连成一张学习地图。
        </p>
      </section>

      <div className="knowledgeMap">
        {channels.map((channel) => {
          const channelClauses = clauses.filter((item) => item.channel === channel.name);
          const channelFormulas = formulas.filter((item) =>
            channelClauses.some((clause) => clause.formula === item.name) ||
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
                  <Link href="/formulas" key={formula.name}>{formula.name}</Link>
                )) : <span className="muted">先学总纲</span>}
              </div>
            </section>
          );
        })}
      </div>

      <aside className="notice">
        <strong>怎么看这张图：</strong>
        先从六经定位学习章节，再读总纲和代表条文，最后才看关联方证。
        “存在关联”不表示现实中可以据此自行诊断或用药。
      </aside>
    </>
  );
}
