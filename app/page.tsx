import Link from "next/link";
import { channels, formulas } from "@/data/content";

export default function Home() {
  return (
    <>
      <section className="hero">
        <span className="eyebrow">《伤寒论》初学者学习工具 · v0.1</span>
        <h1>像看 Runbook 一样，读懂《伤寒论》</h1>
        <p>
          不要求一开始背条文。先建立六经地图，再通过症状线索、方证卡片和交互式
          Runbook 学习张仲景的辨证思路。
        </p>
        <div className="actions">
          <Link className="button primary" href="/runbook">开始 Runbook</Link>
          <Link className="button" href="/learn">从六经入门</Link>
        </div>
      </section>

      <section>
        <div className="sectionTitle">
          <div><span className="eyebrow">LEARNING MAP</span><h2>六经先建立地图</h2></div>
          <Link href="/learn">查看完整内容 →</Link>
        </div>
        <div className="grid three">
          {channels.slice(0, 6).map((item) => (
            <article className="card" key={item.name}>
              <span className="tag">{item.name}</span>
              <h3>{item.hint}</h3>
              <p>{item.focus}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="sectionTitle">
          <div><span className="eyebrow">FORMULA PATTERNS</span><h2>先学方证，不死背药名</h2></div>
          <Link href="/formulas">查看方证卡片 →</Link>
        </div>
        <div className="grid three">
          {formulas.slice(0, 3).map((item) => (
            <article className="card formula" key={item.name}>
              <span className="tag">{item.channel}</span>
              <h3>{item.name}</h3>
              <p>{item.summary}</p>
              <div className="chips">{item.clues.map(c => <span key={c}>{c}</span>)}</div>
            </article>
          ))}
        </div>
      </section>

      <aside className="notice">
        <strong>学习边界：</strong>
        本项目用于《伤寒论》经典学习，不提供在线诊断，也不会根据个人症状自动推荐处方。
        出现高热、呼吸困难、意识异常、持续脱水等情况应及时寻求专业医疗帮助。
      </aside>
    </>
  );
}
