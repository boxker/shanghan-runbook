import { formulas } from "@/data/content";

export default function FormulasPage() {
  return (
    <>
      <section className="pageHead">
        <span className="eyebrow">FORMULA CARDS</span>
        <h1>经典方证卡片</h1>
        <p>每张卡片只回答三个问题：它属于哪条学习路径、有哪些经典线索、学习时最容易误解什么。</p>
      </section>
      <div className="grid two">
        {formulas.map((item) => (
          <article className="card formula" key={item.name}>
            <span className="tag">{item.channel}</span>
            <h2>{item.name}</h2>
            <p>{item.summary}</p>
            <h3>经典学习线索</h3>
            <div className="chips">{item.clues.map(c => <span key={c}>{c}</span>)}</div>
            <div className="caution">{item.caution}</div>
          </article>
        ))}
      </div>
    </>
  );
}
