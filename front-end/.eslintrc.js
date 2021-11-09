module.exports = {
  'env': {
    'browser': true,
    'es2021': true
  },
  'extends': 'plugin:react/recommended',
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 13,
    'sourceType': 'module'
  },
  'plugins': [
    'react',
    '@typescript-eslint'
  ],
  'rules': {
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'never'],
    'no-trailing-spaces': 'error',
  }
}
