# 伤寒论 Runbook

> 面向初学者的《伤寒论》Web 学习平台与 Runbook 手册。  
> 用“学习地图 + 方证卡片 + Troubleshooting Runbook”的方式，降低经典入门门槛。

## v0.1 已实现

- 📖 六经学习地图：太阳、阳明、少阳、太阴、少阴、厥阴
- 💊 经典方证卡片：桂枝汤、麻黄汤、葛根汤、小柴胡汤、白虎汤、五苓散
- 🧭 交互式 Runbook：训练“看到症状后下一步还要问什么”
- 📱 响应式 Web UI
- 🐳 Docker 多阶段镜像
- 🚀 GitHub Actions 自动构建并推送 GHCR
- 🩺 明确的医疗安全边界：学习工具，不作为诊断或处方系统

## 学习设计

本项目不把《伤寒论》做成“症状输入 → 自动开方”的工具，而是训练初学者建立判断过程：

```text
看到一个表现
   ↓
还需要补充哪些信息？
   ↓
属于哪一条六经学习路径？
   ↓
对照经典方证
   ↓
回到条文理解关键词
```

例如太阳病入门：

```text
恶寒 / 发热
    ↓
是否出汗？
 ┌──┴──┐
有汗   无汗
 ↓      ↓
桂枝汤  麻黄汤
学习线索 学习线索
```

> 上述流程只表示经典学习关系，不构成疾病诊断或用药建议。

## 技术栈

- Next.js
- React
- TypeScript
- 原生 CSS
- Docker
- GitHub Actions
- GitHub Container Registry (GHCR)

## 本地开发

要求 Node.js 22+。

```bash
npm install
npm run dev
```

浏览器访问：

```text
http://localhost:3000
```

生产构建：

```bash
npm run build
npm start
```

## Docker

本地构建：

```bash
docker build -t shanghan-runbook:local .
docker run --rm -p 3000:3000 shanghan-runbook:local
```

### GHCR

`main` 分支提交后 GitHub Actions 会自动构建：

```text
ghcr.io/boxker/shanghan-runbook:latest
```

拉取：

```bash
docker pull ghcr.io/boxker/shanghan-runbook:latest
docker run -d \
  --name shanghan-runbook \
  --restart unless-stopped \
  -p 3000:3000 \
  ghcr.io/boxker/shanghan-runbook:latest
```

如果 GHCR Package 设置为 private，需要先登录：

```bash
echo "$GHCR_TOKEN" | docker login ghcr.io -u boxker --password-stdin
```

Release Tag（例如 `v0.1.0`）也会生成对应版本镜像标签。

## GitHub Actions 镜像规则

触发条件：

- push 到 `main`
- push `v*` tag
- 手动 `workflow_dispatch`

目标平台：

- `linux/amd64`
- `linux/arm64`

Workflow 使用仓库自带的 `GITHUB_TOKEN` 登录 GHCR，一般无需额外创建 Registry 密钥；仓库 Actions 权限需要允许 `packages: write`。

## 项目结构

```text
.
├── app/
│   ├── page.tsx
│   ├── globals.css
│   ├── learn/
│   ├── formulas/
│   └── runbook/
├── data/
│   └── content.ts
├── .github/workflows/
│   └── docker.yml
├── Dockerfile
├── next.config.mjs
└── package.json
```

## Roadmap

### v0.2：条文学习

- 原文 / 白话解释双栏
- 条文关键词高亮
- 条文 ↔ 六经 ↔ 方证关联
- 原文搜索
- 学习收藏

### v0.3：完整 Runbook

- 发热
- 恶寒 / 恶风
- 有汗 / 无汗
- 寒热往来
- 口渴
- 呕吐
- 下利
- 小便异常
- 手足厥冷
- 状态变化与误治学习

### v0.4：学习系统

- 病例推演
- 方证匹配题
- 六经测验
- 错题本
- 学习进度

### v0.5：内容工程化

- 内容迁移 Markdown / MDX
- 内容校审状态
- 参考文献与版本来源
- 社区贡献规范
- 内容变更审查

## 医疗安全声明

本项目的目标是学习中国传统医学经典《伤寒论》的文本、历史概念和辨证思维。

它：

- 不提供疾病诊断；
- 不根据个人症状自动生成处方；
- 不建议用户自行服用麻黄、附子等存在明确风险的药物；
- 不替代医生、急诊或其他专业医疗服务。

真实疾病可能出现与经典条文相似的表现，但不能因此认为两者具有一一对应关系。

## License

项目代码的开源许可证可在后续版本确定；引用、整理古籍文本时需要同时注明所使用的现代整理本、注释本或其他资料来源。
