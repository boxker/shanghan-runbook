"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { runbookNodes } from "@/data/runbook";

export default function RunbookPage() {
  const [currentId, setCurrentId] = useState("start");
  const [history, setHistory] = useState<string[]>([]);
  const node = runbookNodes[currentId];

  const progress = useMemo(
    () => Math.min(100, 18 + history.length * 16),
    [history.length]
  );

  function choose(nextId?: string) {
    if (!nextId) return;
    setHistory((items) => [...items, currentId]);
    setCurrentId(nextId);
  }

  function reset() {
    setCurrentId("start");
    setHistory([]);
  }

  function back() {
    const previous = history[history.length - 1];
    if (!previous) return;
    setHistory((items) => items.slice(0, -1));
    setCurrentId(previous);
  }

  return (
    <>
      <section className="pageHead">
        <span className="eyebrow">INTERACTIVE RUNBOOK · v0.2</span>
        <h1>像排障一样练辨证思路</h1>
        <p>
          每一步只问一个问题，让你练习“下一步应该继续观察什么”。结果是学习路径，
          不是疾病诊断，更不是自动处方。
        </p>
      </section>

      <div className="runbookShell">
        <div className="runbookToolbar">
          <div>
            <span>学习路径进度</span>
            <div className="progressTrack"><i style={{ width: `${progress}%` }} /></div>
          </div>
          <div className="toolbarActions">
            <button disabled={!history.length} onClick={back}>← 上一步</button>
            <button onClick={reset}>重新开始</button>
          </div>
        </div>

        {node.result ? (
          <article className="runbookResult">
            <span className="eyebrow">LEARNING DESTINATION</span>
            <h2>{node.result.title}</h2>
            <p>{node.result.description}</p>

            <div className="resultRelations">
              {node.result.channel && <span className="tag">{node.result.channel}</span>}
              {node.result.formula && <span className="relationTag">{node.result.formula}</span>}
            </div>

            {!!node.result.clauseIds?.length && (
              <div className="resultLinks">
                <strong>推荐继续阅读</strong>
                <div>
                  {node.result.clauseIds.map((id) => (
                    <Link className="button" href={`/clauses/${id}`} key={id}>
                      第 {id} 条
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="actions">
              <Link className="button primary" href="/clauses">进入条文库</Link>
              <Link className="button" href="/map">查看知识地图</Link>
              <button onClick={reset}>再走一遍</button>
            </div>
          </article>
        ) : (
          <article className="runbookQuestion">
            <div className="questionIndex">STEP {history.length + 1}</div>
            <h2>{node.question}</h2>
            <p>{node.help}</p>
            <div className="decisionGrid">
              <button onClick={() => choose(node.yes)}>
                <span>是 / 更符合</span>
                <small>沿这个分支继续</small>
              </button>
              <button onClick={() => choose(node.no)}>
                <span>否 / 不突出</span>
                <small>换一个方向观察</small>
              </button>
            </div>
          </article>
        )}

        <div className="pathHistory">
          <strong>已走路径：</strong>
          {history.length === 0 ? (
            <span>起点</span>
          ) : (
            history.map((id, index) => (
              <span key={`${id}-${index}`}>
                {index > 0 && " → "}{runbookNodes[id].question.slice(0, 12)}…
              </span>
            ))
          )}
        </div>
      </div>

      <aside className="notice">
        <strong>安全边界：</strong>
        真实疾病需要结合病史、体征、检查与专业医疗判断。这里展示的是古典文本学习关系，
        不能用来确认自己“属于哪一证”，也不能据此自行服药。
      </aside>
    </>
  );
}
