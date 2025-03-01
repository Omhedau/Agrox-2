import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack initialRouteName="machines-services">
      <Stack.Screen name="machines-services" options={{ headerShown: false }} />
      <Stack.Screen name="addmachines" options={{ headerShown: false }} />
    </Stack>
  );
};

export default _layout;
