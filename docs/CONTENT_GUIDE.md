# Content Guide

v0.3 使用 MDX-compatible 文本文件作为内容源。当前解析器使用 YAML-like frontmatter + 固定 Markdown 二级标题，不执行 JSX。

## Clause

路径：

```text
content/clauses/012.mdx
```

示例：

```md
---
id: "12"
number: 12
channel: "太阳"
title: "桂枝汤证的代表条文"
keywords: ["汗自出","恶风","发热"]
pattern: "太阳中风营卫不和"
formula: "桂枝汤"
formulaSlug: "gui-zhi-tang"
sourceName: "..."
sourceEdition: "..."
sourceUrl: "https://..."
reviewStatus: "初校"
reviewedAt: "2026-09-20"
---

## 原文

...

## 白话

...

## 初学提示

...
```

## Formula

路径：

```text
content/formulas/gui-zhi-tang.mdx
```

必需字段包括：

- slug
- name
- channel
- clues
- composition
- clauseIds
- sourceName
- sourceUrl
- reviewStatus
- reviewedAt

固定正文：

- `## 定位`
- `## 对比理解`
- `## 安全提示`

## Review status

- `草稿`：尚未完成第一轮原文核对
- `初校`：已完成一轮来源/文字检查
- `已校`：至少经过额外人工复核后再使用

不要因为页面“看起来正确”就直接标记为 `已校`。

## Safety

内容文件可以展示古籍组成名称和历史文本关系，但不应提供面向个人的剂量、煎服方案或“根据症状直接服某方”的执行指令。

## Validation

```bash
npm run content:check
```

所有内容 PR 必须通过校验与 Next.js build。
