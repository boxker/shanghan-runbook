import Link from "next/link";
import { notFound } from "next/navigation";
import { getComparison, getComparisons, getFormula } from "@/lib/content";

export function generateStaticParams() {
  return getComparisons().map((item) => ({ slug: item.slug }));
}

export default async function ComparisonDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const comparison = getComparison(slug);
  if (!comparison) notFound();

  const left = getFormula(comparison.leftSlug);
  const right = getFormula(comparison.rightSlug);
  if (!left || !right) notFound();

  return (
    <>
      <div className="breadcrumb">
        <Link href="/comparisons">方剂对比</Link><span>→</span><span>{comparison.title}</span>
      </div>

      <section className="comparisonHero">
        <span className="reviewBadge" data-status={comparison.reviewStatus}>{comparison.reviewStatus}</span>
        <h1>{comparison.title}</h1>
        <p>{comparison.summary}</p>
        <div className="comparisonFormulaLinks">
          <Link href={`/formulas/${left.slug}`}>{left.name}</Link>
          <span>VS</span>
          <Link href={`/formulas/${right.slug}`}>{right.name}</Link>
        </div>
      </section>

      <section className="compareTableWrap">
        <table className="compareTable">
          <thead>
            <tr>
              <th>对比维度</th>
              <th><Link href={`/formulas/${left.slug}`}>{left.name}</Link></th>
              <th><Link href={`/formulas/${right.slug}`}>{right.name}</Link></th>
            </tr>
          </thead>
          <tbody>
            {comparison.points.map((point) => (
              <tr key={point.axis}>
                <th>{point.axis}</th>
                <td>{point.left}</td>
                <td>{point.right}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="grid two">
        <article className="studyPanel">
          <span className="panelLabel">辨别顺序</span>
          <p>{comparison.decisionGuide}</p>
        </article>
        <article className="studyPanel">
          <span className="panelLabel">安全边界</span>
          <p>{comparison.safety}</p>
        </article>
      </div>

      <section className="compareClauseLinks">
        <div className="sectionTitle">
          <div><span className="eyebrow">GO BACK TO TEXT</span><h2>最后回到代表条文</h2></div>
        </div>
        <div className="grid two">
          <Link className="card" href={`/formulas/${left.slug}`}>
            <span className="tag">{left.channel}</span>
            <h3>{left.name}</h3>
            <p>{left.summary}</p>
          </Link>
          <Link className="card" href={`/formulas/${right.slug}`}>
            <span className="tag">{right.channel}</span>
            <h3>{right.name}</h3>
            <p>{right.summary}</p>
          </Link>
        </div>
      </section>
    </>
  );
}
