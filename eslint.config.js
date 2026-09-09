import js from '@eslint/js'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  // Bỏ qua các thư mục không cần lint
  { ignores: ['dist', 'build', 'node_modules', 'tmp'] },

  // Cấu hình chính cho các file TypeScript
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // React Hooks — bắt buộc tuân thủ rules of hooks & exhaustive-deps
      ...reactHooks.configs.recommended.rules,

      // React Refresh — cảnh báo nếu export không phải component
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // TypeScript — cảnh báo lạm dụng type any
      '@typescript-eslint/no-explicit-any': 'warn',

      // TypeScript — cảnh báo biến không dùng, bỏ qua biến bắt đầu bằng _
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      // Hạn chế console.log rác, chỉ cho phép console.warn và console.error
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
)
