import Link from "next/link";
import { getReviewSummary } from "@/lib/content";
import type { ReviewStatus } from "@/lib/content-types";

const stages: Array<{ status: ReviewStatus; title: string; rule: string }> = [
  {
    status: "草稿",
    title: "草稿",
    rule: "已进入知识库，但尚未完成第一次正式来源/文字核对。允许浏览，必须明确显示草稿状态。",
  },
  {
    status: "初校",
    title: "初校",
    rule: "至少完成一轮原文、编号、来源与关联检查，并记录 reviewedAt。仍不代表权威审定。",
  },
  {
    status: "已校",
    title: "已校",
    rule: "在初校基础上完成第二次独立人工复核，并填写 verifiedBy。CI 会阻止缺少复核人的内容标为已校。",
  },
];

export default function ReviewPage() {
  const { items, counts, total } = getReviewSummary();

  return (
    <>
      <section className="pageHead">
        <span className="eyebrow">CONTENT REVIEW · v0.3.2</span>
        <h1>内容审核状态</h1>
        <p>
          页面是否上线和内容是否完成校审是两回事。这里公开展示每条内容当前处于
          草稿、初校还是已校，避免把“已经发布”误认为“已经核准”。
        </p>
        <div className="stats">
          <div><strong>{total}</strong><span>审核对象</span></div>
          <div><strong>{counts.草稿}</strong><span>草稿</span></div>
          <div><strong>{counts.初校}</strong><span>初校</span></div>
          <div><strong>{counts.已校}</strong><span>已校</span></div>
        </div>
      </section>

      <div className="reviewStages">
        {stages.map((stage, index) => (
          <article className="reviewStage" key={stage.status}>
            <div className="reviewStageTop">
              <span className="number">0{index + 1}</span>
              <span className="reviewBadge" data-status={stage.status}>{stage.title}</span>
            </div>
            <p>{stage.rule}</p>
          </article>
        ))}
      </div>

      {stages.map((stage) => {
        const filtered = items.filter((item) => item.reviewStatus === stage.status);
        return (
          <section key={stage.status}>
            <div className="sectionTitle">
              <div>
                <span className="eyebrow">{stage.status.toUpperCase()}</span>
                <h2>{stage.title} · {filtered.length}</h2>
              </div>
            </div>
            {filtered.length ? (
              <div className="reviewList">
                {filtered.map((item) => (
                  <Link href={item.href} className="reviewItem" key={`${item.kind}-${item.id}`}>
                    <span className="tag">{item.kind}</span>
                    <strong>{item.title}</strong>
                    <span className="reviewItemMeta">
                      {item.reviewedAt ? `最近核对 ${item.reviewedAt}` : "等待初校"}
                      {item.verifiedBy ? ` · 复核：${item.verifiedBy}` : ""}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="emptyState">当前没有处于该状态的内容。</div>
            )}
          </section>
        );
      })}

      <aside className="notice">
        <strong>重要：</strong>
        “已校”只描述本项目内部内容审核状态，不代表医学指南、临床推荐或任何专业机构认证。
      </aside>
    </>
  );
}
