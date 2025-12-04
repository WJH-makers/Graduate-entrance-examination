# Web App Architecture & Maintenance Notes

最后更新：2025-12-04

## 技术栈与基础设施
- 前端：React 19 + Vite 7，ESM。
- UI/动画：framer-motion、lucide-react，自定义组件库（`src/components/ui`）。
- 数据获取：`@tanstack/react-query`（QueryClient 位于 `src/lib/queryClient.js`）。
- 全局状态：zustand（`src/store/useAppStore.js`，负责 activePage、搜索词、面板开关、主题）。
- 样式：原子化 Tailwind 内核 + 自定义全局样式（`src/index.css`），设计令牌定义于 `src/constants/theme.js`。
- 路径别名：`@` -> `src/`（见 `vite.config.js`、`jsconfig.json`）。
- 监控：UX signals + error log 初始化于 `src/main.jsx`。
- 构建：`npm run build`，产物在 `dist/`，`base: './'` 便于离线预览。

## 目录总览
- `src/pages/`：页面壳（HomePage / KnowledgePage / PlanPage / WorkbenchPage）。
- `src/components/features/`：业务组件（时间线、资讯、知识库、AI Chat、热榜等）。
- `src/components/layout/`：布局壳与导航（TopNavTabs、SectionShell）。
- `src/components/ui/`：基础 UI 组件（Card、Button、Tabs、Input 等）。
- `src/constants/`：主题令牌、标签映射。
- `src/data/`：静态数据（知识点、时间线、OCR 统计等）。
- `src/hooks/`：复用逻辑（useDeepSeek、useNewsDigest）。
- `src/services/`：API 封装（DeepSeek chat/news）。
- `src/utils/`：工具与埋点。
- `scripts/`：知识点生成、澄清、新闻抓取、产物冒烟检查等。
- `public/`：静态输出（知识汇总/清单、澄清版）。

## 页面路由与状态流
- `App.jsx`：仅负责
  - 读取全局 store（zustand）并驱动页面切换。
  - 注册全局快捷键（`/` 聚焦搜索，Cmd/Ctrl+O 打开 Codex，Cmd/Ctrl+1..4 切页）。
  - 渲染 TopNavTabs、悬浮按钮、AI Chat/Codex/CommandPalette。
- 页面渲染：
  - `home` -> `HomePage`
  - `knowledge` -> `KnowledgePage`
  - `plan` -> `PlanPage`
  - `workbench` -> `WorkbenchPage`
  - 懒加载非首屏页面（Suspense）。
- 搜索词与资源过滤：在 App 用 useMemo 计算，传入 HomePage 以渲染 ResourceGrid。

## 数据与 API
- 静态数据：`src/data/knowledge/*.js`，`resources.js`，`hotLinks.js` 等。
- AI/资讯：
  - `services/api.js` 使用 DeepSeek（OpenAI SDK `dangerouslyAllowBrowser` 开启，本地直连；生产建议后端代理）。
  - `useDeepSeek`（React Query mutation）封装聊天；`useNewsDigest`（React Query query）带本地缓存 + fallback。
  - 环境变量：`VITE_DEEPSEEK_API_KEY`（存放于 `.env`，严禁提交）。

## 设计系统
- 令牌：`theme.js` 定义颜色/圆角/阴影/间距/排版；`index.css` 将其落地为 CSS 变量。
- 区块壳：`SectionShell` 统一标题、徽标、留白与投影。
- 布局工具：`panel-grid`、`hide-scrollbar` 等公用样式在 `index.css`。

## 测试与质量门
- Lint：`npm run lint`（ESLint）。
- 冒烟：`npm run test:smoke`（build 后检查 dist 关键文件）。
- E2E & a11y：`npm run test:e2e`
  - Playwright 配置：`tests/playwright.config.js`
  - 用例：`tests/e2e/home.spec.js`（核心板块可见）、`tests/e2e/a11y.spec.js`（axe 扫描关键区块）。
- CI：`.github/workflows/ci.yml`（lint + build + generate:knowledge）。可按需追加 `test:smoke`/`test:e2e`。

## 构建与运行
- 开发：`npm run dev`
- 预览：`npm run preview -- --host 127.0.0.1 --port 4173`
- 生产构建：`npm run build`

## 知识库生成脚本
- `npm run generate:knowledge`：输出 `public/knowledge_summary.md` & `knowledge_shortlist.md`
- `npm run clarify:knowledge`：输出澄清版 `public/knowledge_clarified.md`（含二级结论、Top30）。

## 约束与实践
- 低耦合：页面壳与业务组件分层，入口只管路由/状态。
- 内聚：相关样式/数据/逻辑尽量同目录存放；Hook 仅做纯逻辑，UI 由组件承担。
- API 错误处理：`useDeepSeek`/`useNewsDigest` 均做异常兜底 + 本地缓存 fallback。
- 资产管理：构建设置 `base: './'` 便于静态打开。

## 建议改进（可择机执行）
1) 在 CI 中新增 `npm run test:smoke` 与 `npm run test:e2e`（需安装 Playwright 浏览器）。
2) 逐步把相对路径替换为别名（`@/...`）以减少路径变更影响。
3) 为 features 目录按领域分子目录（例如 `components/features/knowledge/*`）配合 ESLint module boundary 检查。
4) 将 DeepSeek 调用移到后端代理，前端仅调用自有 API，便于密钥安全与日志治理。
