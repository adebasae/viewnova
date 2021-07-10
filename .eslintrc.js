module.exports = {
  extends: ['airbnb-typescript-prettier'],
  rules: {
    // 'no-console': 'error',
    'react/jsx-props-no-spreading': 'off',
    'import/no-named-as-default': 0,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
  env: {
    node: true,
    browser: true,
    jest: true,
  },
};
