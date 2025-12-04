import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import eslintImport from 'eslint-plugin-import'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: {
      import: eslintImport,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      // 防止组件/功能层去引用页面层，保持单向依赖
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/pages/*'],
              message: '请勿从 pages 层向下层（components/hooks/utils）导入，保持单向依赖。',
            },
          ],
        },
      ],
      // 推荐使用路径别名而非跨层级相对路径
      'import/no-relative-parent-imports': 'warn',
    },
  },
  {
    // 入口/顶层文件可引用 pages
    files: ['src/App.jsx', 'src/main.jsx'],
    rules: {
      'no-restricted-imports': 'off',
    },
  },
  {
    files: ['scripts/**/*.js'],
    rules: {
      'import/no-relative-parent-imports': 'off',
    },
  },
  {
    files: ['server/**/*.js'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-undef': 'off',
    },
  },
])
