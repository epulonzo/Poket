import "./global.css";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Layout } from "./src/app/components/Layout";
import { AppProvider } from "./src/context/AppContext";

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <StatusBar style="light" translucent backgroundColor="transparent" />
        <Layout />
      </NavigationContainer>
    </AppProvider>
  );
}
