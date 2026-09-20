# Content Guide

v0.3.1 使用 MDX-compatible 文本文件作为内容单一事实源。当前解析器使用 YAML-like frontmatter + 固定 Markdown 二级标题，不执行 JSX。

## 内容类型

```text
content/
├── clauses/       # 条文
├── formulas/      # 方剂
└── comparisons/   # 方剂两两对比
```

## Clause

```md
---
id: "14"
number: 14
channel: "太阳"
title: "项背强反汗出与桂枝加葛根汤"
keywords: ["项背强","汗出","恶风"]
pattern: "太阳中风兼项背强"
formula: "桂枝加葛根汤"
formulaSlug: "gui-zhi-jia-ge-gen-tang"
sourceName: "..."
sourceEdition: "..."
sourceUrl: "https://..."
reviewStatus: "草稿"
reviewedAt: ""
verifiedBy: ""
---

## 原文

...

## 白话

...

## 初学提示

...
```

## Formula

```md
---
slug: "da-qing-long-tang"
name: "大青龙汤"
channel: "太阳"
clues: ["脉浮紧","无汗","烦躁"]
composition: ["麻黄","桂枝","甘草","杏仁","石膏","生姜","大枣"]
clauseIds: ["38","39"]
aliases: []
sourceName: "..."
sourceUrl: "https://..."
reviewStatus: "草稿"
reviewedAt: ""
verifiedBy: ""
---

## 定位

...

## 对比理解

...

## 安全提示

...
```

## Formula comparison

```md
---
slug: "gui-zhi-vs-ma-huang"
title: "桂枝汤 vs 麻黄汤"
leftSlug: "gui-zhi-tang"
rightSlug: "ma-huang-tang"
points: ["汗|多见汗出|多见无汗","脉|常见缓|常见紧"]
reviewStatus: "草稿"
reviewedAt: ""
verifiedBy: ""
---

## 一句话

...

## 辨别顺序

...

## 安全提示

...
```

`points` 每一行固定为：

```text
对比维度|左侧方剂|右侧方剂
```

CI 会检查左右方剂是否真实存在，以及每行是否正好有三列。

## Review status

审核流固定为：

```text
草稿
  ↓ 第一次正式来源 / 文字 / 引用检查
初校
  ↓ 第二次独立人工复核
已校
```

### 草稿

- 新增内容的默认状态。
- 可以进入网站供学习和协作校对。
- 必须在 UI 明确展示“草稿”。
- `reviewedAt` 可以为空。
- 不应在描述中暗示已经完成正式校审。

### 初校

升级条件：

- 原文与目标底本完成一轮核对；
- 条文编号完成核对；
- 来源 URL 可追溯；
- 方剂 / 条文交叉引用无断链；
- 白话解释与原文没有明显方向性冲突；
- 填写 `reviewedAt`。

### 已校

升级条件：

- 已经满足“初校”；
- 再由独立人工复核一次；
- 填写 `verifiedBy`；
- 对存在版本差异的内容记录异文或保持较低审核等级。

CI 会阻止：

```text
reviewStatus: "已校"
verifiedBy: ""
```

## AI-assisted content

AI 可以协助：

- 建立草稿；
- 做格式检查；
- 生成检索关键词建议；
- 找潜在断链；
- 帮助对比不同条文。

AI 辅助生成的内容 **不能因为模型自检就直接升为“已校”**。已校要求额外独立人工复核。

## Safety

允许展示：

- 古籍原文；
- 历史方剂组成名称；
- 条文与方剂关系；
- 经典学习对比。

不提供：

- 针对个人的剂量；
- 可执行煎服方案；
- 根据症状自动推荐处方；
- 把古籍证候直接映射为现代疾病诊断。

## Validation

```bash
npm run content:check
npm run build
```

所有内容 PR 必须通过上述检查。
