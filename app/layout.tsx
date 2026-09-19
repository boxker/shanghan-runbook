import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "伤寒论 Runbook",
  description: "面向初学者的《伤寒论》学习 Web 与 Runbook 手册",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        <header className="topbar">
          <Link className="brand" href="/">伤寒论 Runbook</Link>
          <nav>
            <Link href="/learn">六经学习</Link>
            <Link href="/formulas">方证卡片</Link>
            <Link href="/runbook">Runbook</Link>
          </nav>
        </header>
        <main className="shell">{children}</main>
        <footer className="footer">
          学习资料仅用于经典阅读与知识整理，不用于疾病诊断、处方或替代专业医疗建议。
        </footer>
      </body>
    </html>
  );
}
