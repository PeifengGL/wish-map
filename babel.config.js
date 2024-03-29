module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          tests: ['./tests/'],
          '@components': ['./src/components/'],
          '@pages': ['./src/pages/'],
          '@service': ['./src/service/'],
          '@assets': ['./src/assets/'],
          '@router': ['./src/router/'],
        },
      },
    ],
    ['@babel/plugin-proposal-export-namespace-from'],
    'react-native-reanimated/plugin',
  ],
};
