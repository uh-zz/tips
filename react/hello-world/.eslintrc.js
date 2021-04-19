module.exports = { // eslint-disable-line
  globals: {
    __PATH_PREFIX__: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    semi: 'warn',
    'no-extra-semi': 'error',
    'no-unexpected-multiline': 'error',
    'no-unreachable': 'error',
    'comma-spacing': 2,
    'no-multiple-empty-lines': [2, { max: 1 }],
    "indent": ["warn", 2]
  },

};
