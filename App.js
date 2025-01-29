import Constants from "expo-constants";
import { Text, View, StyleSheet } from "react-native";
import { Breathe } from "./Breathe";

import { Canvas, Circle } from "@shopify/react-native-skia";

const CircleDemo = () => {
  const r = 128;
  return (
    <Canvas style={{ flex: 1 }}>
      <Circle cx={r} cy={r} r={r} color="lightblue" />
    </Canvas>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello world</Text>
      <Breathe />
      {/* <CircleDemo /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
  },
});
