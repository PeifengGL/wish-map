module.exports = {
  root: true,
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 7,
    sourceType: 'module',
  },
  env: {
    jest: true,
  },
  rules: {
    'implicit-arrow-linebreak': ['off'],
    'arrow-parens': ['error', 'as-needed'],
    'react/jsx-props-no-spreading': [
      'error',
      {
        custom: 'ignore',
      },
    ],
    'object-curly-newline': [
      'error',
      {
        ObjectPattern: { multiline: true },
      },
    ],
    'no-confusing-arrow': [
      'off',
      {
        onlyOneSimpleParam: true,
      },
    ],
    'class-methods-use-this': [
      'error',
      {
        enforceForClassFields: false,
      },
    ],
    'function-paren-newline': 'off',
    'react/jsx-curly-newline': 'off',

    // To support typescript enum keyword.
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],

    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],

    'react/jsx-no-useless-fragment': [0],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '_' }],
    'max-len': [
      'error',
      {
        code: 80,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'operator-linebreak': ['off'],
    '@typescript-eslint/indent': ['off'],
  },
};
