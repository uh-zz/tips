module.exports = {
  // root:trueを指定することでより
  // 上位のeslintrc.jsを探しに行かないようにできる
  'root': true,
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'google',
    "plugin:prettier/recommended",
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'project': './tsconfig.json',
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'plugins': [
    '@typescript-eslint',
    'prettier',
  ],
  'rules': {
    "prettier/prettier": [
      "error",
      {
        'singleQuote': true,
        'semi':true,
        "indent": ["error", 2],
      }
    ],
    "require-jsdoc": ["warn", {
      "require": {
          "FunctionDeclaration": true,
          "MethodDefinition": false,
          "ClassDeclaration": true,
          "ArrowFunctionExpression": false,
          "FunctionExpression": false
      }
    }],
  }
};
