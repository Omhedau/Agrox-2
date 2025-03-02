import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack initialRouteName="addmachines">
      <Stack.Screen name="addmachines" options={{ headerShown: false }} />
    </Stack>
  );
};

export default _layout;
