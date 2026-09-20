import Link from "next/link";
import { channels } from "@/data/content";
import { getClauses, getFormulas, getKeywordIndex } from "@/lib/content";

export default function Home() {
  const clauses = getClauses();
  const formulas = getFormulas();
  const keywords = getKeywordIndex();

  return (
    <>
      <section className="hero">
        <span className="eyebrow">《伤寒论》初学者学习工具 · v0.3</span>
        <h1>内容可信，关系清楚，才能真正长期学下去</h1>
        <p>
          v0.3 把条文和方剂迁入 MDX 内容库，补上来源、校审状态、前后文导航与关键词索引，
          并把方剂从“卡片”升级成可追溯的详情页。
        </p>
        <div className="actions">
          <Link className="button primary" href="/clauses">搜索条文</Link>
          <Link className="button" href="/formulas">查看方剂</Link>
          <Link className="button" href="/keywords">关键词索引</Link>
          <Link className="button" href="/runbook">开始 Runbook</Link>
        </div>
        <div className="heroStats">
          <div><strong>{clauses.length}</strong><span>MDX 条文</span></div>
          <div><strong>{formulas.length}</strong><span>方剂详情</span></div>
          <div><strong>{keywords.length}</strong><span>关键词</span></div>
          <div><strong>{channels.length}</strong><span>六经章节</span></div>
        </div>
      </section>

      <section>
        <div className="sectionTitle">
          <div><span className="eyebrow">v0.3 WORKFLOW</span><h2>从“看懂”升级到“可追溯”</h2></div>
        </div>
        <div className="grid four">
          <Link className="card pathCard" href="/clauses">
            <span className="number">01</span><h3>读条文</h3>
            <p>原文、白话、关键词、来源与校审状态放在同一页。</p>
          </Link>
          <Link className="card pathCard" href="/formulas">
            <span className="number">02</span><h3>看方剂</h3>
            <p>从代表条文进入方剂详情，再做同路径对比。</p>
          </Link>
          <Link className="card pathCard" href="/keywords">
            <span className="number">03</span><h3>反查关键词</h3>
            <p>从恶寒、汗出、口渴、脉沉等概念回到相关条文。</p>
          </Link>
          <Link className="card pathCard" href="/runbook">
            <span className="number">04</span><h3>Runbook 复习</h3>
            <p>用分支追问训练观察顺序，再回到原文核对。</p>
          </Link>
        </div>
      </section>

      <section>
        <div className="sectionTitle">
          <div><span className="eyebrow">TAIYANG EXPANSION</span><h2>太阳篇第一批扩充</h2></div>
          <Link href="/clauses?q=太阳">查看太阳相关 →</Link>
        </div>
        <div className="grid three">
          {clauses.filter((item) => item.channel === "太阳").slice(0, 6).map((item) => (
            <Link className="card clausePreview" href={`/clauses/${item.id}`} key={item.id}>
              <div className="clauseMeta">
                <span className="clauseNo">#{item.number}</span>
                <span className="tag">{item.channel}</span>
                <span className="reviewBadge">{item.reviewStatus}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.original}</p>
            </Link>
          ))}
        </div>
      </section>

      <aside className="notice">
        <strong>学习边界：</strong>
        本项目用于《伤寒论》经典学习与知识整理。来源和校审字段用于提高可追溯性，
        并不意味着本站内容可以替代现代医疗诊断或成为个人用药依据。
      </aside>
    </>
  );
}
