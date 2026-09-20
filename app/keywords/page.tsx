import Link from "next/link";
import { getKeywordIndex } from "@/lib/content";

export default function KeywordsPage() {
  const groups = getKeywordIndex();

  return (
    <>
      <section className="pageHead">
        <span className="eyebrow">SYMPTOM & CONCEPT INDEX · v0.3</span>
        <h1>证候关键词索引</h1>
        <p>
          不从方名出发，而从“恶寒、汗出、口渴、脉沉、胸胁苦满”等词回到相关条文。
          这是学习检索入口，不是症状诊断器。
        </p>
        <div className="stats">
          <div><strong>{groups.length}</strong><span>关键词</span></div>
          <div><strong>→</strong><span>反查条文</span></div>
        </div>
      </section>

      <div className="keywordGrid">
        {groups.map(({ keyword, clauses }) => (
          <Link
            href={`/clauses?q=${encodeURIComponent(keyword)}`}
            className="keywordCard"
            key={keyword}
          >
            <strong>{keyword}</strong>
            <span>{clauses.length} 条</span>
            <small>{clauses.slice(0, 3).map((item) => `#${item.number}`).join(" · ")}</small>
          </Link>
        ))}
      </div>

      <aside className="notice">
        <strong>使用方法：</strong>
        点击关键词会进入条文库并自动带入搜索词。相同关键词可出现在不同六经、不同方证中，
        因此关键词只负责“找到材料”，不负责“给出结论”。
      </aside>
    </>
  );
}
