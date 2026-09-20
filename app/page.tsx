import Link from "next/link";
import { channels } from "@/data/content";
import { getClauses, getComparisons, getFormulas, getKeywordIndex, getReviewSummary } from "@/lib/content";

export default function Home() {
  const clauses = getClauses();
  const formulas = getFormulas();
  const keywords = getKeywordIndex();
  const comparisons = getComparisons();
  const review = getReviewSummary();
  const taiyang = clauses.filter((item) => item.channel === "太阳");

  return (
    <>
      <section className="hero">
        <span className="eyebrow">《伤寒论》初学者学习工具 · v0.3.1</span>
        <h1>太阳篇扩充，内容状态公开，方剂开始真正“对着学”</h1>
        <p>
          本版把太阳篇扩展到更完整的代表条文链路，同时把“草稿 → 初校 → 已校”
          变成可执行的审核流程，并新增方剂两两对比页面。
        </p>
        <div className="actions">
          <Link className="button primary" href="/clauses?q=太阳">学习太阳篇</Link>
          <Link className="button" href="/comparisons">方剂对比</Link>
          <Link className="button" href="/review">内容审核</Link>
          <Link className="button" href="/runbook">Runbook</Link>
        </div>
        <div className="heroStats">
          <div><strong>{taiyang.length}</strong><span>太阳篇条文</span></div>
          <div><strong>{formulas.length}</strong><span>方剂详情</span></div>
          <div><strong>{comparisons.length}</strong><span>方剂对比</span></div>
          <div><strong>{review.counts.草稿}/{review.counts.初校}/{review.counts.已校}</strong><span>草稿 / 初校 / 已校</span></div>
        </div>
      </section>

      <section>
        <div className="sectionTitle">
          <div><span className="eyebrow">TAIYANG · v0.3.1</span><h2>太阳篇从几个点，变成一条学习链</h2></div>
          <Link href="/clauses?q=太阳">查看全部太阳条文 →</Link>
        </div>
        <div className="grid three">
          {taiyang.slice(0, 9).map((item) => (
            <Link className="card clausePreview" href={`/clauses/${item.id}`} key={item.id}>
              <div className="clauseMeta">
                <span className="clauseNo">#{item.number}</span>
                <span className="tag">{item.channel}</span>
                <span className="reviewBadge" data-status={item.reviewStatus}>{item.reviewStatus}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.original}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="sectionTitle">
          <div><span className="eyebrow">PAIRWISE LEARNING</span><h2>不要孤立背方，直接看差异</h2></div>
          <Link href="/comparisons">全部方剂对比 →</Link>
        </div>
        <div className="grid three">
          {comparisons.slice(0, 6).map((item) => (
            <Link className="card comparisonMini" href={`/comparisons/${item.slug}`} key={item.slug}>
              <span className="reviewBadge" data-status={item.reviewStatus}>{item.reviewStatus}</span>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="sectionTitle">
          <div><span className="eyebrow">REVIEW PIPELINE</span><h2>发布不等于已校</h2></div>
          <Link href="/review">查看审核看板 →</Link>
        </div>
        <div className="grid three">
          <article className="card">
            <span className="reviewBadge" data-status="草稿">草稿</span>
            <h3>先进入知识库</h3>
            <p>新扩充内容允许先上线学习，但明确标记为待初校，不隐瞒成熟度。</p>
          </article>
          <article className="card">
            <span className="reviewBadge" data-status="初校">初校</span>
            <h3>完成第一轮核对</h3>
            <p>核对原文、编号、来源和关联关系，并记录审核日期。</p>
          </article>
          <article className="card">
            <span className="reviewBadge" data-status="已校">已校</span>
            <h3>独立人工复核</h3>
            <p>必须额外填写 verifiedBy；CI 会阻止没有复核人的内容冒充已校。</p>
          </article>
        </div>
      </section>

      <section>
        <div className="sectionTitle">
          <div><span className="eyebrow">INDEX</span><h2>继续从关系进入</h2></div>
        </div>
        <div className="grid four">
          <Link className="card pathCard" href="/learn">
            <span className="number">01</span><h3>六经地图</h3><p>{channels.length} 个六经章节。</p>
          </Link>
          <Link className="card pathCard" href="/keywords">
            <span className="number">02</span><h3>关键词</h3><p>{keywords.length} 个关键词反查入口。</p>
          </Link>
          <Link className="card pathCard" href="/formulas">
            <span className="number">03</span><h3>方剂库</h3><p>{formulas.length} 个可追溯方剂条目。</p>
          </Link>
          <Link className="card pathCard" href="/map">
            <span className="number">04</span><h3>知识地图</h3><p>六经 → 条文 → 方剂关系。</p>
          </Link>
        </div>
      </section>

      <aside className="notice">
        <strong>学习边界：</strong>
        草稿、初校、已校是本站内容工程状态，不代表医学权威认证；方剂对比也不构成个人诊断或用药建议。
      </aside>
    </>
  );
}
