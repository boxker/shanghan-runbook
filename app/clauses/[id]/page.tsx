import Link from "next/link";
import { notFound } from "next/navigation";
import { clauseSourceNote, getClause, getClauses } from "@/lib/content";

export function generateStaticParams() {
  return getClauses().map((item) => ({ id: item.id }));
}

export default async function ClauseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const clauses = getClauses();
  const clause = getClause(id);

  if (!clause) notFound();

  const index = clauses.findIndex((item) => item.id === clause.id);
  const previous = index > 0 ? clauses[index - 1] : undefined;
  const next = index < clauses.length - 1 ? clauses[index + 1] : undefined;

  const related = clauses
    .filter((item) =>
      item.id !== clause.id &&
      (item.channel === clause.channel ||
        (!!clause.formula && item.formula === clause.formula))
    )
    .slice(0, 4);

  return (
    <>
      <div className="breadcrumb">
        <Link href="/clauses">条文库</Link><span>→</span><span>第 {clause.number} 条</span>
      </div>

      <section className="clauseDetailHead">
        <div className="clauseMeta">
          <span className="clauseNo">#{clause.number}</span>
          <span className="tag">{clause.channel}</span>
          <span className="reviewBadge" data-status={clause.reviewStatus}>{clause.reviewStatus}</span>
          {clause.pattern && <span className="relationTag">{clause.pattern}</span>}
        </div>
        <h1>{clause.title}</h1>
      </section>

      <div className="studySplit">
        <article className="studyPanel originalPanel">
          <span className="panelLabel">原文</span>
          <blockquote>{clause.original}</blockquote>
          <div className="chips">
            {clause.keywords.map((keyword) => (
              <Link href={`/clauses?q=${encodeURIComponent(keyword)}`} key={keyword}>{keyword}</Link>
            ))}
          </div>
        </article>

        <article className="studyPanel">
          <span className="panelLabel">白话理解</span>
          <p>{clause.plain}</p>
          <div className="learningTip">
            <strong>初学提示</strong>
            <span>{clause.learningNote}</span>
          </div>
        </article>
      </div>

      <section className="sourcePanel">
        <div>
          <span className="eyebrow">SOURCE & REVIEW</span>
          <h2>来源与校审</h2>
        </div>
        <dl>
          <div><dt>公开核对来源</dt><dd><a href={clause.sourceUrl} target="_blank" rel="noreferrer">{clause.sourceName} ↗</a></dd></div>
          <div><dt>底本说明</dt><dd>{clause.sourceEdition}</dd></div>
          <div><dt>异文说明</dt><dd>{clause.variantNotes || "当前未记录明确异文；后续校审如发现版本差异会在此补充。"}</dd></div>
          <div><dt>校审状态</dt><dd>{clause.reviewStatus}</dd></div>
          <div><dt>最近校审</dt><dd>{clause.reviewedAt || "等待初校"}</dd></div>
          <div><dt>独立复核</dt><dd>{clause.verifiedBy || "尚未进入已校"}</dd></div>
        </dl>
      </section>

      <section className="relationPanel">
        <span className="eyebrow">RELATIONS</span>
        <h2>这条条文放在知识地图哪里？</h2>
        <div className="relationFlow">
          <Link href="/learn">{clause.channel}</Link>
          <span>→</span>
          <span>{clause.pattern || "条文学习"}</span>
          {clause.formula && (
            <>
              <span>→</span>
              <Link href={clause.formulaSlug ? `/formulas/${clause.formulaSlug}` : "/formulas"}>
                {clause.formula}
              </Link>
            </>
          )}
        </div>
      </section>

      <nav className="adjacentNav" aria-label="条文前后导航">
        {previous ? (
          <Link href={`/clauses/${previous.id}`}>
            <small>← 上一条</small>
            <strong>#{previous.number} {previous.title}</strong>
          </Link>
        ) : <span />}
        {next ? (
          <Link href={`/clauses/${next.id}`}>
            <small>下一条 →</small>
            <strong>#{next.number} {next.title}</strong>
          </Link>
        ) : <span />}
      </nav>

      {related.length > 0 && (
        <section>
          <div className="sectionTitle">
            <div>
              <span className="eyebrow">NEXT READING</span>
              <h2>继续对照阅读</h2>
            </div>
          </div>
          <div className="grid two">
            {related.map((item) => (
              <Link className="card miniClause" href={`/clauses/${item.id}`} key={item.id}>
                <div className="clauseMeta">
                  <span className="clauseNo">#{item.number}</span>
                  <span className="reviewBadge" data-status={item.reviewStatus}>{item.reviewStatus}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.original}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <aside className="notice sourceNote">
        <strong>版本说明：</strong>{clauseSourceNote}
      </aside>
    </>
  );
}
