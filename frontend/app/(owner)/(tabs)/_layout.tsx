import { Tabs } from "expo-router";
import React from "react";
import OwnerTabBar from "@/components/OwnerTabBar";

const OwnerTabLayout = () => {
  return (
    <Tabs tabBar={(props) => <OwnerTabBar {...props} />}>
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "dashboard",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="(machines-services)"
        options={{
          title: "machines",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "orders",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="revenue"
        options={{
          title: "revenue",
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default OwnerTabLayout;
