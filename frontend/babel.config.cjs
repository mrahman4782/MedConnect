module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    //plugins: ['expo-router/babel'],
    plugins: ['@babel/plugin-syntax-import-attributes'],
  };
};
