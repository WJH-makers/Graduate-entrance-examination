# 考研知识点 Web App
React + Vite 前端，用于整理考研数学一、计算机 408、英语一、政治的知识点、真题脉络和预测。

## 快速开始
- 安装依赖：`npm install`
- 本地开发：`npm run dev`
- 生产构建：`npm run build`
- 预览构建：`npm run preview`
- 代码检查：`npm run lint`
- 知识库审计：`npm run audit:knowledge`

## 重要资料
- 冲刺 20 天日程表：`STUDY_PLAN_20DAYS.md`
- 知识点与预测汇总：`EXAM_PREDICTION.md`
- 数据源：`src/data/knowledge/*.js`（按科目拆分）

## 项目结构
- `src/components/`：页面与组件
- `src/data/knowledge/`：四科知识点、二级结论、年度真题脉络
- `scripts/audit-knowledge.js`：统计字段缺失与分类

## 备注
- 请勿提交 `.env` 中的密钥，生产环境优先走后端代理 DeepSeek API。
- 项目已启用 ESLint；提交前建议运行 `npm run lint` 与 `npm run build`。
"# Graduate-entrance-examination" 
