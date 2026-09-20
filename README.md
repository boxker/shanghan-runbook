# 伤寒论 Runbook

> 面向《伤寒论》初学者的 Web 学习平台与 Runbook 手册。  
> 当前版本：**v0.3.1**

## v0.3.1

本版重点不是继续堆页面，而是把内容规模、审核机制和“方剂如何区分”同时推进。

### 太阳篇大扩充

太阳篇学习条目由 v0.3 的 8 条扩展到 **32 条**，新增覆盖：

- 桂枝汤连续辨证
- 桂枝汤加减
- 误汗 / 误下后的重新辨证
- 太阳阳明合病
- 葛根汤 / 葛根加半夏汤
- 葛根黄芩黄连汤
- 麻黄汤进一步辨证
- 大青龙汤
- 小青龙汤
- 桂枝加厚朴杏子汤
- 汗出 / 无汗、喘、烦躁、项背强等关键分叉

新增条文统一先进入 **草稿**，避免“刚写入仓库 = 已完成校审”的假象。

### 内容审核状态

```text
草稿
  ↓ 第一轮来源 / 原文 / 编号 / 关联核对
初校
  ↓ 第二次独立人工复核
已校
```

CI 规则：

- 草稿允许没有 `reviewedAt`
- 初校必须填写 `reviewedAt`
- 已校必须填写 `reviewedAt`
- 已校必须填写 `verifiedBy`

审核看板：

```text
/review
```

详细流程：

```text
docs/REVIEW_WORKFLOW.md
```

### 方剂两两对比

新增：

```text
/comparisons
/comparisons/[slug]
```

首批包括：

- 桂枝汤 vs 麻黄汤
- 桂枝汤 vs 葛根汤
- 麻黄汤 vs 葛根汤
- 麻黄汤 vs 大青龙汤
- 大青龙汤 vs 小青龙汤
- 葛根汤 vs 葛根加半夏汤
- 桂枝汤 vs 桂枝加葛根汤
- 桂枝汤 vs 桂枝加厚朴杏子汤

对比维度包括汗、恶风恶寒、身痛、项背强、烦躁、水饮、喘以及代表条文等。

这些页面只用于经典学习，不把差异转成个人用药建议。

## 内容规模

内容源：

```text
content/
├── clauses/
├── formulas/
└── comparisons/
```

构建时自动校验：

```bash
npm run content:check
npm run build
```

## 页面

| 路径 | 功能 |
| --- | --- |
| `/` | v0.3.1 总览 |
| `/learn` | 六经学习 |
| `/clauses` | 条文搜索 |
| `/clauses/[id]` | 条文详情、来源与审核状态 |
| `/keywords` | 关键词反查 |
| `/formulas` | 方剂库 |
| `/formulas/[slug]` | 方剂详情 |
| `/comparisons` | 方剂两两对比 |
| `/comparisons/[slug]` | 对比表 |
| `/map` | 六经 → 条文 → 方剂 |
| `/runbook` | 学习 Runbook |
| `/review` | 内容审核看板 |

## 本地运行

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
```

## Docker / GHCR

```bash
docker pull ghcr.io/boxker/shanghan-runbook:latest

docker run -d \
  --name shanghan-runbook \
  --restart unless-stopped \
  -p 3000:3000 \
  ghcr.io/boxker/shanghan-runbook:latest
```

支持：

- linux/amd64
- linux/arm64

## 内容来源

项目把古籍原文、现代学习解释、审核状态分开管理。

公开交叉核对来源之一为 **中国哲学书电子化计划《伤寒论》**。其页面提供包括《四部丛刊初编》本《注解伤寒论》等电子底本。不同版本可能存在编号、异体字与个别文字差异，因此新增内容会先进入草稿流程，而不是直接标为已校。

## 下一步

v0.3.2 建议重点：

- 把太阳篇草稿按批次推进到初校
- 增加异文说明字段
- 补麻杏石甘汤等太阳篇后续方剂
- 将 Runbook 节点关联到更多新增条文
- 给对比页加入“为什么容易混淆”学习题

## 医疗安全声明

项目用于中国传统医学经典的文本、历史概念和辨证思维学习。

不提供个人疾病诊断，不根据症状自动生成处方，也不建议自行使用麻黄、附子、细辛等存在明确风险的药物。真实疾病应由专业医疗人员结合病史、体征和现代医学检查进行判断。
