import { View } from "react-native";
import { Stack } from "expo-router";
import React from "react";
import TopBar from "../../components/TopBar"; // Adjust the path as needed

const RootLayout = () => {

  return (
    <View style={{ flex: 1 }}>
      {/* Top Bar */}
      <TopBar />

      {/* Screens */}
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="blogone" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
};

export default RootLayout;
