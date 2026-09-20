import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "伤寒论 Runbook",
  description: "面向初学者的《伤寒论》学习 Web、可追溯知识库、方剂对比与 Runbook 手册",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        <header className="topbar">
          <Link className="brand" href="/">伤寒论 Runbook <small>v0.3.1</small></Link>
          <nav>
            <Link href="/learn">六经</Link>
            <Link href="/clauses">条文库</Link>
            <Link href="/keywords">关键词</Link>
            <Link href="/formulas">方剂</Link>
            <Link href="/comparisons">方剂对比</Link>
            <Link href="/map">知识地图</Link>
            <Link href="/runbook">Runbook</Link>
            <Link href="/review">审核</Link>
          </nav>
        </header>
        <main className="shell">{children}</main>
        <footer className="footer">
          《伤寒论》经典学习项目 · 草稿/初校/已校仅表示项目内部内容审核状态，不用于疾病诊断、处方或替代专业医疗建议。
        </footer>
      </body>
    </html>
  );
}
