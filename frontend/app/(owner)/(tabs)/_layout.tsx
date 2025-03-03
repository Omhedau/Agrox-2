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
          title: "add",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="(urmachines)"
        options={{
          title: "Machines",
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default OwnerTabLayout;
