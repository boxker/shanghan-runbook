import Link from "next/link";
import { getComparisons, getFormula } from "@/lib/content";

export default function ComparisonsPage() {
  const comparisons = getComparisons();

  return (
    <>
      <section className="pageHead">
        <span className="eyebrow">FORMULA COMPARISONS · v0.3.1</span>
        <h1>方剂两两对比</h1>
        <p>
          不再孤立背方名，而是把两个最容易混淆的方放在同一张表里：
          看共同基础、关键分叉、代表条文和学习顺序。
        </p>
        <div className="stats">
          <div><strong>{comparisons.length}</strong><span>对比主题</span></div>
          <div><strong>2×2</strong><span>并排学习</span></div>
          <div><strong>MDX</strong><span>可审核内容</span></div>
        </div>
      </section>

      <div className="comparisonGrid">
        {comparisons.map((item) => {
          const left = getFormula(item.leftSlug);
          const right = getFormula(item.rightSlug);
          return (
            <Link className="comparisonCard" href={`/comparisons/${item.slug}`} key={item.slug}>
              <div className="comparisonCardHead">
                <span className="reviewBadge" data-status={item.reviewStatus}>{item.reviewStatus}</span>
                <small>{item.points.length} 个对比维度</small>
              </div>
              <h2>{item.title}</h2>
              <div className="versusRow">
                <strong>{left?.name || item.leftSlug}</strong>
                <span>VS</span>
                <strong>{right?.name || item.rightSlug}</strong>
              </div>
              <p>{item.summary}</p>
              <strong className="learnMore">进入对比 →</strong>
            </Link>
          );
        })}
      </div>

      <aside className="notice">
        <strong>使用边界：</strong>
        对比页回答的是“经典学习上如何区分”，不是“现实症状应该选哪个方”。
      </aside>
    </>
  );
}
