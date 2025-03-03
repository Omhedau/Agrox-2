import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack initialRouteName="urmachines">
      <Stack.Screen name="urmachines" options={{ headerShown: false }} />
      <Stack.Screen name="ownermachinedetail" options={{ headerShown: false }} />
      <Stack.Screen name="editMachine" options={{ headerShown: false }} />
      <Stack.Screen name="deleteMachine" options={{ headerShown: false }} />
    </Stack>
  );
};

export default _layout;
