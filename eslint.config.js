import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // Desactivar reglas para preferir el uso de const o let
      'no-var': 'off',  // Desactivar la regla de no usar var
      'prefer-const': 'off',  // Desactivar la preferencia por const
      
      // Permitir el uso del tipo any
      '@typescript-eslint/no-explicit-any': 'off', // Desactivar la regla que evita el uso de any
    },
  },
)
