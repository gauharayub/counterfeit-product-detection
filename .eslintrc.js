module.exports = {
  root: true,

  extends: '@react-native-community',
  rules: {
    'linebreak-style': [
      'error',
      process.platform === 'win32' ? 'windows' : 'unix',
    ],
  },
};
