import { Tabs } from 'expo-router';
import React from 'react';
import TabBar from '@/components/TabBar';
import { View } from 'react-native';

const _layout = () => {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="(rental)"
        options={{
          title: "Rent & Hire",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="(recommendation)"
        options={{
          title: "recommend",
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default _layout;
