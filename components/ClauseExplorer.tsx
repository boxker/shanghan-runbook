"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Clause } from "@/lib/content-types";

const channelOrder = ["太阳", "阳明", "少阳", "太阴", "少阴", "厥阴"];

export default function ClauseExplorer({
  clauses,
  initialQuery = "",
}: {
  clauses: Clause[];
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [channel, setChannel] = useState("全部");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return clauses.filter((item) => {
      const channelMatch = channel === "全部" || item.channel === channel;
      const text = [
        item.number,
        item.channel,
        item.title,
        item.original,
        item.plain,
        item.pattern,
        item.formula,
        item.reviewStatus,
        ...item.keywords,
      ].join(" ").toLowerCase();
      return channelMatch && (!q || text.includes(q));
    });
  }, [clauses, query, channel]);

  return (
    <>
      <div className="searchPanel">
        <label className="searchBox">
          <span>全文搜索</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="试试：恶寒、汗出、小青龙汤、脉沉……"
          />
        </label>
        <div className="filterRow">
          {["全部", ...channelOrder].map((item) => (
            <button
              className={channel === item ? "filter active" : "filter"}
              key={item}
              onClick={() => setChannel(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="resultCount">找到 {filtered.length} 条学习条文</div>

      <div className="clauseList">
        {filtered.map((item) => (
          <Link className="clauseCard" href={`/clauses/${item.id}`} key={item.id}>
            <div className="clauseMeta">
              <span className="clauseNo">#{item.number}</span>
              <span className="tag">{item.channel}</span>
              <span className="reviewBadge">{item.reviewStatus}</span>
              {item.formula && <span className="relationTag">关联 {item.formula}</span>}
            </div>
            <h2>{item.title}</h2>
            <blockquote>{item.original}</blockquote>
            <p>{item.plain}</p>
            <div className="chips">
              {item.keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="emptyState">
          没找到匹配条文。可以减少关键词，或者切换到“全部”六经。
        </div>
      )}
    </>
  );
}
