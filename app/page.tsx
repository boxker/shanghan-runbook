import Link from "next/link";
import { channels, formulas } from "@/data/content";
import { clauses } from "@/data/clauses";

export default function Home() {
  return (
    <>
      <section className="hero">
        <span className="eyebrow">《伤寒论》初学者学习工具 · v0.2</span>
        <h1>从六经地图，到条文与方证</h1>
        <p>
          像看 Runbook 一样学习《伤寒论》：先建立六经框架，再从核心条文、关键词和方证关系逐步深入，
          不要求一开始死背原文。
        </p>
        <div className="actions">
          <Link className="button primary" href="/clauses">搜索条文</Link>
          <Link className="button" href="/runbook">开始 Runbook</Link>
          <Link className="button" href="/map">打开知识地图</Link>
        </div>
        <div className="heroStats">
          <div><strong>{clauses.length}</strong><span>核心条文</span></div>
          <div><strong>{channels.length}</strong><span>六经章节</span></div>
          <div><strong>{formulas.length}</strong><span>方证卡片</span></div>
        </div>
      </section>

      <section>
        <div className="sectionTitle">
          <div><span className="eyebrow">v0.2 WORKFLOW</span><h2>推荐学习路径</h2></div>
        </div>
        <div className="grid four">
          <Link className="card pathCard" href="/learn">
            <span className="number">01</span><h3>建立六经地图</h3>
            <p>先知道太阳、阳明、少阳、太阴、少阴、厥阴分别关注什么。</p>
          </Link>
          <Link className="card pathCard" href="/clauses">
            <span className="number">02</span><h3>读核心条文</h3>
            <p>原文与白话双栏，对关键词做搜索和对照。</p>
          </Link>
          <Link className="card pathCard" href="/map">
            <span className="number">03</span><h3>串起知识关系</h3>
            <p>把六经、条文、证候和代表方重新连接起来。</p>
          </Link>
          <Link className="card pathCard" href="/runbook">
            <span className="number">04</span><h3>用 Runbook 复习</h3>
            <p>通过树状追问训练“下一步还要观察什么”。</p>
          </Link>
        </div>
      </section>

      <section>
        <div className="sectionTitle">
          <div><span className="eyebrow">CORE CLAUSES</span><h2>先读这些代表条文</h2></div>
          <Link href="/clauses">进入条文库 →</Link>
        </div>
        <div className="grid three">
          {clauses.slice(0, 6).map((item) => (
            <Link className="card clausePreview" href={`/clauses/${item.id}`} key={item.id}>
              <div className="clauseMeta"><span className="clauseNo">#{item.number}</span><span className="tag">{item.channel}</span></div>
              <h3>{item.title}</h3>
              <p>{item.original}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="sectionTitle">
          <div><span className="eyebrow">SIX CHANNELS</span><h2>六经不是六个固定阶段</h2></div>
          <Link href="/learn">查看六经学习 →</Link>
        </div>
        <div className="grid three">
          {channels.map((item) => (
            <article className="card" key={item.name}>
              <span className="tag">{item.name}</span>
              <h3>{item.hint}</h3>
              <p>{item.focus}</p>
            </article>
          ))}
        </div>
      </section>

      <aside className="notice">
        <strong>学习边界：</strong>
        本项目用于《伤寒论》经典学习，不提供在线诊断，也不会根据个人症状自动推荐处方。
        真实疾病应由专业医疗人员结合病史、体征和检查判断。
      </aside>
    </>
  );
}
