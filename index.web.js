// import '@expo/metro-runtime';
import App from './App';
import { registerRootComponent } from 'expo';

import { LoadSkiaWeb } from '@shopify/react-native-skia/lib/module/web';

LoadSkiaWeb({
  locateFile: (file) => {
    // Provide the path to the wasm file
    console.log({ file });
    // redirect to where you have the wasm file
    if (file === 'canvaskit.wasm') {
      return '/canvaskit.wasm';
    }
    return file;
  },
})
  .then(async () => {
    registerRootComponent(App);
  })
  .catch((err) => {
    console.error('Failed to initialize Skia for Web:', err);
  });

// import { registerRootComponent } from 'expo';

// import App from './App';

// // registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// // It also ensures that whether you load the app in Expo Go or in a native build,
// // the environment is set up appropriately
// registerRootComponent(App);
