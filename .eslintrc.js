// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    node: true,
  },
  extends: 'airbnb-base',
  rules: {
    'arrow-parens': ['error', 'as-needed', {
      requireForBlockBody: false,
    }],
    'no-underscore-dangle': ["error", {
      "allow": ["_bar"],
      "allowAfterThis": true
    }],
    'comma-dangle': [
      "error",
      "only-multiline"
    ]
  }
}
