import { channels } from "@/data/content";

export default function LearnPage() {
  return (
    <>
      <section className="pageHead">
        <span className="eyebrow">SIX CHANNELS</span>
        <h1>六经学习地图</h1>
        <p>把六经先当成六组典型的疾病状态模型，重点理解症状组合与变化，而不是机械套病名。</p>
      </section>
      <div className="grid two">
        {channels.map((item, index) => (
          <article className="card channel" key={item.name}>
            <div className="number">0{index + 1}</div>
            <div>
              <span className="tag">{item.name}</span>
              <h2>{item.hint}</h2>
              <ul>{item.signs.map(s => <li key={s}>{s}</li>)}</ul>
              <p className="focus">{item.focus}</p>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
