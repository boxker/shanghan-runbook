# 伤寒论 Runbook

> 面向初学者的《伤寒论》Web 学习平台与 Runbook 手册。  
> v0.3 开始将“内容可信、来源可追溯、结构可维护”作为核心能力。

## v0.3

### 本版完成

- 📜 条文改为 `content/clauses/*.mdx` 单一内容源
- 💊 方剂改为 `content/formulas/*.mdx`
- ✅ 构建前自动执行内容 Schema / 引用完整性校验
- 🔗 自动检查条文 → 方剂、方剂 → 条文引用是否断链
- 🧾 每条内容记录：
  - 公开核对来源
  - 底本说明
  - 校审状态
  - 最近校审日期
- ☀️ 太阳篇第一批扩充：
  - 第 12 条：桂枝汤证
  - 第 40 条：表不解兼水气 / 小青龙汤
- 📖 条文详情新增上一条 / 下一条导航
- 🔎 新增证候关键词索引
- 💊 方剂从卡片升级为独立详情页
- 🧠 知识地图可直接进入条文与方剂详情
- 🐳 standalone Docker 镜像携带 MDX 内容目录
- 🚀 PR 自动内容校验 + Next.js Build；main 自动发布 GHCR

## 学习路径

```text
六经地图
   ↓
条文原文 + 白话
   ↓
来源 / 校审
   ↓
关键词反查
   ↓
方剂详情
   ↓
同路径对比
   ↓
Runbook 复习
```

## 内容目录

```text
content/
├── clauses/
│   ├── 001.mdx
│   ├── 002.mdx
│   ├── 003.mdx
│   ├── 012.mdx
│   ├── 031.mdx
│   ├── 035.mdx
│   ├── 040.mdx
│   └── ...
└── formulas/
    ├── gui-zhi-tang.mdx
    ├── ma-huang-tang.mdx
    ├── ge-gen-tang.mdx
    ├── xiao-qing-long-tang.mdx
    └── ...
```

页面不再维护第二份条文常量；内容修改优先改 MDX。

## 内容校验

```bash
npm run content:check
```

会检查：

- 条文 ID / 编号重复
- 必填字段缺失
- 原文 / 白话 / 初学提示缺失
- 来源 URL 缺失
- 校审状态是否合法
- 方剂引用了不存在的条文
- 条文引用了不存在的方剂

生产构建自动包含这一步：

```bash
npm run build
```

详细格式见：

```text
docs/CONTENT_GUIDE.md
```

## 页面

| 页面 | 功能 |
| --- | --- |
| `/` | v0.3 学习首页 |
| `/learn` | 六经学习 |
| `/clauses` | 条文全文搜索 |
| `/clauses/[id]` | 条文、来源、校审、前后导航 |
| `/keywords` | 证候关键词索引 |
| `/formulas` | 方剂库 |
| `/formulas/[slug]` | 方剂详情、组成名称、关联条文、对比 |
| `/map` | 六经 → 条文 → 方剂 |
| `/runbook` | 树状学习 Runbook |

## 本地开发

要求 Node.js 22+。

```bash
npm install
npm run dev
```

生产检查：

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

镜像支持：

- `linux/amd64`
- `linux/arm64`

## 内容来源原则

项目将古籍原文与现代学习解释分开管理。

当前公开交叉核对来源之一为 **中国哲学书电子化计划《伤寒论》**，其页面列出了《四部丛刊初编》本《注解伤寒论》等电子底本资源。

注意：

- 本项目不是古籍校勘本；
- 不同版本可能存在编号、异体字与文字差异；
- 白话与“初学提示”为项目学习解释，不冒充原典；
- `初校` 只表示项目内已做第一轮核对，不代表医学权威审定。

## 后续 v0.3.x

- 继续扩展太阳篇代表条文
- 给阳明、少阳等增加更多代表方证
- 增加“待复核 / 异文说明”
- 方剂之间增加显式对比关系
- 内容改动 PR 模板
- 自动检查外部来源链接

## v0.4 方向

- 学习进度
- 收藏条文
- 六经测验
- 方证匹配题
- 病例式学习题
- 错题本

## 医疗安全声明

本项目用于中国传统医学经典《伤寒论》的文本、历史概念和辨证思维学习。

它不提供疾病诊断，不根据症状自动生成处方，也不建议自行使用麻黄、附子、细辛等存在明确风险的药物。真实疾病应由专业医疗人员结合病史、体征和现代医学检查进行判断。
