import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const RentalLayout = () => {
  return (
    <Stack initialRouteName="machinerental">
      <Stack.Screen name="machinerental" options={{ headerShown: false }} />
      <Stack.Screen name="searchcategories" options={{ headerShown: false }} />
      <Stack.Screen name="machines" options={{ headerShown: false }} />
      <Stack.Screen name="machineDetail" options={{ headerShown: false }} />
      <Stack.Screen name="machineconfirm" options={{ headerShown: false }} />
      <Stack.Screen name="orders" options={{ headerShown: false }} />
      <Stack.Screen name="orderdetail" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RentalLayout;
