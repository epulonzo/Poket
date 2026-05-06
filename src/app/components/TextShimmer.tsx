import { useEffect, useRef } from "react";
import { Animated, View, StyleSheet } from "react-native";

interface TextShimmerProps {
  width?: number | string;
  lines?: number;
}

export function TextShimmer({ width = "100%", lines = 2 }: TextShimmerProps) {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    <View style={[styles.container, { width: width as any }]}>
      {Array.from({ length: lines }).map((_, i) => (
        <Animated.View
          key={i}
          style={[
            styles.line,
            { opacity },
            i === lines - 1 ? styles.lastLine : null,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  line: {
    height: 12,
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 6,
    width: "100%",
  },
  lastLine: {
    width: "65%",
  },
});
