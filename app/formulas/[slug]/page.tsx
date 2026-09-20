import Link from "next/link";
import { notFound } from "next/navigation";
import { getClauses, getFormula, getFormulaComparisons, getFormulas } from "@/lib/content";

export function generateStaticParams() {
  return getFormulas().map((item) => ({ slug: item.slug }));
}

export default async function FormulaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const formula = getFormula(slug);
  if (!formula) notFound();

  const clauses = getClauses().filter((item) => formula.clauseIds.includes(item.id));
  const comparisons = getFormulaComparisons(formula.slug);
  const related = getFormulas()
    .filter((item) => item.slug !== formula.slug && item.channel.startsWith(formula.channel.replace("相关", "")))
    .slice(0, 3);

  return (
    <>
      <div className="breadcrumb">
        <Link href="/formulas">方剂库</Link><span>→</span><span>{formula.name}</span>
      </div>

      <section className="formulaDetailHead">
        <div className="clauseMeta">
          <span className="tag">{formula.channel}</span>
          <span className="reviewBadge" data-status={formula.reviewStatus}>{formula.reviewStatus}</span>
        </div>
        <h1>{formula.name}</h1>
        <p>{formula.summary}</p>
      </section>

      <div className="grid two formulaDetailGrid">
        <article className="studyPanel">
          <span className="panelLabel">经典学习线索</span>
          <div className="chips largeChips">
            {formula.clues.map((clue) => <span key={clue}>{clue}</span>)}
          </div>
          <div className="learningTip">
            <strong>对比理解</strong>
            <span>{formula.comparison}</span>
          </div>
        </article>

        <article className="studyPanel">
          <span className="panelLabel">古籍组成名称</span>
          <ul className="compositionList">
            {formula.composition.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <div className="caution formulaSafety">
            <strong>安全边界：</strong>{formula.caution}
          </div>
        </article>
      </div>

      {comparisons.length > 0 && (
        <section>
          <div className="sectionTitle">
            <div><span className="eyebrow">PAIRWISE COMPARISON</span><h2>最值得并排比较</h2></div>
            <Link href="/comparisons">全部对比 →</Link>
          </div>
          <div className="grid two">
            {comparisons.map((item) => (
              <Link className="card comparisonMini" href={`/comparisons/${item.slug}`} key={item.slug}>
                <span className="reviewBadge" data-status={item.reviewStatus}>{item.reviewStatus}</span>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section>
        <div className="sectionTitle">
          <div><span className="eyebrow">RELATED CLAUSES</span><h2>关联条文</h2></div>
        </div>
        {clauses.length ? (
          <div className="grid two">
            {clauses.map((clause) => (
              <Link className="card miniClause" href={`/clauses/${clause.id}`} key={clause.id}>
                <div className="clauseMeta">
                  <span className="clauseNo">#{clause.number}</span>
                  <span className="tag">{clause.channel}</span>
                  <span className="reviewBadge" data-status={clause.reviewStatus}>{clause.reviewStatus}</span>
                </div>
                <h3>{clause.title}</h3>
                <p>{clause.original}</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="emptyState">当前版本尚未挂接代表条文，已列入后续校补任务。</div>
        )}
      </section>

      <section className="sourcePanel">
        <div>
          <span className="eyebrow">SOURCE & REVIEW</span>
          <h2>来源与校审</h2>
        </div>
        <dl>
          <div><dt>公开核对来源</dt><dd><a href={formula.sourceUrl} target="_blank" rel="noreferrer">{formula.sourceName} ↗</a></dd></div>
          <div><dt>校审状态</dt><dd>{formula.reviewStatus}</dd></div>
          <div><dt>最近校审</dt><dd>{formula.reviewedAt || "等待初校"}</dd></div>
          <div><dt>独立复核</dt><dd>{formula.verifiedBy || "尚未进入已校"}</dd></div>
        </dl>
      </section>

      {related.length > 0 && (
        <section>
          <div className="sectionTitle">
            <div><span className="eyebrow">RELATED FORMULAS</span><h2>同路径继续阅读</h2></div>
          </div>
          <div className="grid three">
            {related.map((item) => (
              <Link className="card" href={`/formulas/${item.slug}`} key={item.slug}>
                <span className="tag">{item.channel}</span>
                <h3>{item.name}</h3>
                <p>{item.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
