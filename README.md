# 伤寒论 Runbook

> 面向初学者的《伤寒论》Web 学习平台与 Runbook 手册。  
> 用“六经地图 → 核心条文 → 方证关系 → Runbook 推演”的方式降低经典入门门槛。

## v0.2

v0.2 从展示型 Demo 升级为可检索、可关联、可推演的学习知识库。

### 已实现

- 📖 六经学习地图：太阳、阳明、少阳、太阴、少阴、厥阴
- 📜 核心条文库：原文、自编白话解释、关键词、六经归属、证候 / 方证关联、详情页
- 🔎 条文全文搜索与六经筛选
- 🧠 六经 → 条文 → 方证知识关系图
- 💊 方证卡片
- 🧭 树状交互 Runbook：单步追问、分支、回退、重置、推荐条文
- 📱 响应式 Web UI
- 🐳 Docker 多阶段镜像
- ✅ PR Next.js Build 检查
- 🚀 main 合并后自动构建 amd64/arm64 镜像并推送 GHCR
- 🩺 明确医疗安全边界：学习工具，不作为诊断或处方系统

## 学习方式

推荐顺序：

```text
① 六经地图
     ↓
② 核心条文
     ↓
③ 关键词与白话理解
     ↓
④ 条文 ↔ 方证关系
     ↓
⑤ Runbook 分支推演
     ↓
⑥ 回到原文复习
```

项目不会设计成：

```text
输入症状 → 自动诊断 → 自动开方
```

而是：

```text
看到一个表现
   ↓
下一步还应该观察什么？
   ↓
哪些经典条文值得对照？
   ↓
这个条文在六经体系中的位置是什么？
```

## v0.2 条文库

当前先收录六经核心代表条文，作为学习索引，并持续扩展。

条文编号采用常见宋本编号体系。不同整理本在编号、异体字、个别文字上可能有差异，因此本站明确定位为 **学习工具，不是古籍校勘本**。

古籍原文建议同时交叉核对可靠的纸质整理本或公开古籍来源。本站白话解释为项目学习用途自行整理，不直接搬用现代注本。

## 技术栈

- Next.js
- React
- TypeScript
- 原生 CSS
- Docker
- GitHub Actions
- GitHub Container Registry

## 页面

| 页面 | 作用 |
| --- | --- |
| `/` | 学习首页 |
| `/learn` | 六经学习 |
| `/clauses` | 条文搜索与筛选 |
| `/clauses/[id]` | 原文 / 白话 / 关系详情 |
| `/formulas` | 方证卡片 |
| `/map` | 六经 → 条文 → 方证关系图 |
| `/runbook` | 树状学习 Runbook |

## 本地开发

Node.js 22+：

```bash
npm install
npm run dev
```

访问：

```text
http://localhost:3000
```

生产构建：

```bash
npm run build
npm start
```

## Docker

```bash
docker build -t shanghan-runbook:local .

docker run --rm \
  -p 3000:3000 \
  shanghan-runbook:local
```

## GHCR

main 分支成功构建后发布：

```text
ghcr.io/boxker/shanghan-runbook:latest
```

部署：

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

如果 Package 为 Private：

```bash
echo "$GHCR_TOKEN" | docker login ghcr.io -u boxker --password-stdin
```

## CI/CD

Pull Request：

```text
npm install
    ↓
npm run build
```

合并到 main：

```text
GitHub Actions
      ↓
Docker Buildx
      ↓
amd64 + arm64
      ↓
GHCR
```

镜像标签：

```text
latest
main
sha-xxxxxxx
vX.Y.Z
```

## 项目结构

```text
.
├── app/
│   ├── clauses/
│   │   ├── page.tsx
│   │   └── [id]/
│   ├── formulas/
│   ├── learn/
│   ├── map/
│   ├── runbook/
│   ├── globals.css
│   └── page.tsx
├── components/
│   └── ClauseExplorer.tsx
├── data/
│   ├── clauses.ts
│   ├── content.ts
│   └── runbook.ts
├── .github/workflows/
│   ├── docker.yml
│   └── pr-check.yml
└── Dockerfile
```

## Roadmap

### v0.3：扩充经典知识库

- 扩展太阳篇条文
- 六经核心条文逐步补齐
- 条文前后文导航
- 方剂详情页面
- 药物组成仅作古籍知识展示
- 证候关键词索引
- 条文来源与校审状态

### v0.4：学习系统

- 病例式学习题
- 方证匹配题
- 六经测验
- 错题本
- 本地学习进度
- 收藏条文

### v0.5：内容工程化

- Markdown / MDX 内容化
- 内容 Schema 校验
- 来源版本字段
- 内容 Review 流程
- 社区贡献规范
- 自动检查断链和关联关系

## 医疗安全声明

本项目的目标是学习中国传统医学经典《伤寒论》的文本、历史概念和辨证思维。

它：

- 不提供疾病诊断；
- 不根据个人症状生成医疗结论；
- 不根据 Runbook 自动生成处方；
- 不建议自行使用麻黄、附子等存在明确风险的药物；
- 不替代医生、急诊或其他专业医疗服务。

真实疾病可能出现与古籍条文相似的表现，但两者不能据此建立一一对应关系。
