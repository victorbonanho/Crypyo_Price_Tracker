module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
     // add the below line 
     plugins: ['react-native-reanimated/plugin'], 
     // this should be always last line
  };
};
