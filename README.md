# 考研知识点 Web App
React + Vite 前端，用于整理考研数学一、计算机 408、英语一、政治的知识点、真题脉络和预测。

## 快速开始
- 安装依赖：`npm install`
- 本地开发：`npm run dev`
- 生产构建：`npm run build`
- 预览构建：`npm run preview`
- 代码检查：`npm run lint`
- 知识库审计：`npm run audit:knowledge`
- 生成知识导览/冲刺清单：`npm run generate:knowledge`

## 重要资料
- 冲刺 20 天日程表：`STUDY_PLAN_20DAYS.md`
- 知识点与预测汇总：`EXAM_PREDICTION.md`
- 数据源：`src/data/knowledge/*.js`（按科目拆分）
- 知识点快速导览：`public/knowledge_summary.md`
- 冲刺 30 条清单：`public/knowledge_shortlist.md`
- 全量澄清版（含二级结论）：`public/knowledge_clarified.md`

## 架构要点
- 全局状态：`src/store/useAppStore.js`（zustand，集中管理 tab、搜索词、面板开关、主题偏好）。
- 数据获取与缓存：`@tanstack/react-query` 在 `src/main.jsx` 注入，新闻摘要使用 `useNewsDigest`，AI 聊天使用 mutation 并复用缓存策略。
- 设计令牌：`src/constants/theme.js` & `src/index.css` 暴露字体、间距、圆角、阴影变量；`SectionShell` 统一区块标题、徽标与留白。
- 脚本：`scripts/generate-knowledge.mjs` 生成汇总/清单；CI 会运行 lint + build + generate:knowledge 并上传 md 工件。
- 澄清与二级结论生成：`npm run clarify:knowledge`，输出 `public/knowledge_clarified.md`（为每个知识点补足最少 2 条二级结论）。
- 页面分层：`src/pages/` 持有 Home/Knowledge/Plan/Workbench 页面骨架；`App.jsx` 仅负责路由/快捷键。
- 路径别名：`@` 指向 `src/`（见 `vite.config.js`、`jsconfig.json`）。
- 快速冒烟测试：`npm run test:smoke`（build 后检查 dist 关键产物）；可在预览或部署前先运行。
- 详细架构文档：见 `docs/ARCHITECTURE.md`。

## 项目结构
- `src/components/`：页面与组件
- `src/data/knowledge/`：四科知识点、二级结论、年度真题脉络
- `scripts/audit-knowledge.js`：统计字段缺失与分类

## 备注
- 请勿提交 `.env` 中的密钥，生产环境优先走后端代理 DeepSeek API。
- 项目已启用 ESLint + lint-staged + Husky；提交前建议运行 `npm run lint` 与 `npm run build`。
