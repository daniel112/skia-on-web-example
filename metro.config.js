// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, { isCSSEnabled: true });

// ref: https://www.youtube.com/watch?v=Md1sHpf1_AM
// needed for error:  Cannot read properties of undefined (reading 'Matrix')
// config.resolver.assetExts.push('wasm');
config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true,
  },
});

module.exports = config;
