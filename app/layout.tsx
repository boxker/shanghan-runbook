import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "伤寒论 Runbook",
  description: "面向初学者的《伤寒论》学习 Web、可追溯条文知识库与 Runbook 手册",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        <header className="topbar">
          <Link className="brand" href="/">伤寒论 Runbook <small>v0.3</small></Link>
          <nav>
            <Link href="/learn">六经</Link>
            <Link href="/clauses">条文库</Link>
            <Link href="/keywords">关键词</Link>
            <Link href="/formulas">方剂</Link>
            <Link href="/map">知识地图</Link>
            <Link href="/runbook">Runbook</Link>
          </nav>
        </header>
        <main className="shell">{children}</main>
        <footer className="footer">
          《伤寒论》经典学习项目 · 内容提供来源与校审状态，但不用于疾病诊断、处方或替代专业医疗建议。
        </footer>
      </body>
    </html>
  );
}
