import { useMemo, useEffect } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import {
  useSharedValue,
  useDerivedValue,
  Easing,
  cancelAnimation,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {
  BlurMask,
  vec,
  Canvas,
  Circle,
  Fill,
  Group,
  polar2Canvas,
  mix,
} from '@shopify/react-native-skia';

const c1 = '#61bea2';
const c2 = '#529ca0';

interface RingProps {
  index: number;
  progress: SharedValue<number>;
}

const Ring = ({ index, progress }: RingProps) => {
  const { width, height } = useWindowDimensions();
  const R = width / 4;
  const center = useMemo(() => vec(width / 2, height / 2), [height, width]);

  const theta = (index * (2 * Math.PI)) / 6;
  const transform = useDerivedValue(() => {
    const { x, y } = polar2Canvas(
      { theta, radius: progress.value * R },
      { x: 0, y: 0 }
    );
    const scale = mix(progress.value, 0.3, 1);
    return [{ translateX: x }, { translateY: y }, { scale }];
  }, [progress]);

  return (
    <Group origin={center} transform={transform}>
      <Circle c={center} r={R} color={index % 2 ? c1 : c2} />
    </Group>
  );
};

export const Breathe = () => {
  const { width, height } = useWindowDimensions();
  const center = useMemo(() => vec(width / 2, height / 2), [height, width]);

  const progress = useLoop({ duration: 3000 });
  const transform = useDerivedValue(
    () => [{ rotate: mix(progress.value, -Math.PI, 0) }],
    [progress]
  );

  return (
    <Canvas style={styles.container}>
      <Fill color="rgb(36,43,56)" />
      <Group origin={center} transform={transform} blendMode="screen">
        <BlurMask style="solid" blur={40} />
        {new Array(6).fill(0).map((_, index) => {
          return <Ring key={index} index={index} progress={progress} />;
        })}
      </Group>
    </Canvas>
  );
};

// Export Breathe as default, we can lazy-load this way easier.
export default Breathe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const useLoop = ({ duration }: { duration: number }) => {
  const progress = useSharedValue(0);
  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
    return () => {
      cancelAnimation(progress);
    };
  }, [duration, progress]);
  return progress;
};
