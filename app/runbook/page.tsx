"use client";

import { useState } from "react";
import { runbookSteps } from "@/data/content";

export default function RunbookPage() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});

  return (
    <>
      <section className="pageHead">
        <span className="eyebrow">INTERACTIVE RUNBOOK</span>
        <h1>辨证思路训练</h1>
        <p>
          下面不是诊断问卷，而是帮助初学者练习“看到一个症状后还要继续问什么”的学习流程。
        </p>
      </section>

      <div className="runbook">
        {runbookSteps.map((step, index) => {
          const answer = answers[step.id];
          return (
            <article className="step" key={step.id}>
              <div className="stepIndex">{index + 1}</div>
              <div className="stepBody">
                <h2>{step.question}</h2>
                <div className="choiceRow">
                  <button onClick={() => setAnswers(a => ({ ...a, [step.id]: true }))}>是 / 符合</button>
                  <button onClick={() => setAnswers(a => ({ ...a, [step.id]: false }))}>否 / 不符合</button>
                </div>
                {answer !== undefined && (
                  <div className="result">
                    <strong>下一步学习：</strong> {answer ? step.yes : step.no}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <aside className="notice">
        <strong>重要：</strong>
        Runbook 的目标是训练阅读《伤寒论》的提问顺序。真实患者需要结合现代医学检查、病史、体征以及专业医疗人员判断。
      </aside>
    </>
  );
}
