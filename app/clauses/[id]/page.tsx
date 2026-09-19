import Link from "next/link";
import { notFound } from "next/navigation";
import { clauses, clauseSourceNote, getClause } from "@/data/clauses";

export function generateStaticParams() {
  return clauses.map((item) => ({ id: item.id }));
}

export default async function ClauseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const clause = getClause(id);

  if (!clause) notFound();

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
          {clause.pattern && <span className="relationTag">{clause.pattern}</span>}
        </div>
        <h1>{clause.title}</h1>
      </section>

      <div className="studySplit">
        <article className="studyPanel originalPanel">
          <span className="panelLabel">原文</span>
          <blockquote>{clause.original}</blockquote>
          <div className="chips">
            {clause.keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}
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
              <Link href="/formulas">{clause.formula}</Link>
            </>
          )}
        </div>
      </section>

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
                <span className="clauseNo">#{item.number}</span>
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
