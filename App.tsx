import "./global.css";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Layout } from "./src/app/components/Layout";
import { AppProvider } from "./src/context/AppContext";
import { Onboarding } from "./src/app/screens/Onboarding";
import { useAppContext } from "./src/context/AppContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

function RootNavigator() {
  const { isOnboarded, completeOnboarding } = useAppContext();
  const overlay = useRef(new Animated.Value(0)).current;

  const handleComplete = () => {
    // Fade to dark over 350ms
    Animated.timing(overlay, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
    }).start(() => {
      // Swap happens underneath the dark overlay — totally invisible
      completeOnboarding();
      // Reveal home screen over 500ms
      Animated.timing(overlay, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <View style={{ flex: 1 }}>
      {isOnboarded ? <Layout /> : <Onboarding onComplete={handleComplete} />}
      {/* Persistent overlay bridges both screens — sits above everything */}
      <Animated.View
        pointerEvents="none"
        style={[StyleSheet.absoluteFillObject, { backgroundColor: "#080111", opacity: overlay }]}
      />
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <NavigationContainer theme={DarkTheme}>
          <StatusBar style="light" translucent backgroundColor="transparent" />
          <RootNavigator />
        </NavigationContainer>
      </AppProvider>
    </SafeAreaProvider>
  );
}
