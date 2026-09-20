import Link from "next/link";
import { notFound } from "next/navigation";
import { getClauses, getFormula, getFormulas } from "@/lib/content";

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
          <span className="reviewBadge">{formula.reviewStatus}</span>
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
          <div><dt>最近校审</dt><dd>{formula.reviewedAt}</dd></div>
        </dl>
      </section>

      {related.length > 0 && (
        <section>
          <div className="sectionTitle">
            <div><span className="eyebrow">COMPARE</span><h2>同路径继续比较</h2></div>
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
