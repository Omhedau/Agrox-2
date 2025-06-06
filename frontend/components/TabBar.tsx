import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const text_primaryColor = "#4F83CC"; //Dark Green Color
  const primaryColor = "#4ADE80"; // Light green for active tab background
  const primaryColor_300 = "#84EC84";
  const primaryColor_400 = "#4F83CC";
  const primaryColor_500 = "#2C7F30";
  const greyColor = "#737373"; // Gray for inactive tab background

  const icons: { [key: string]: string } = {
    home: "home",
    "(rental)": "construct",
    "(recommendation)": "leaf", // Good for trending suggestions
  };

  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          typeof options.tabBarLabel === "string"
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            style={styles.tabbarItem}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: isFocused ? primaryColor_400 : "#E5E7EB" },
              ]}
            >
              <Ionicons
                name={
                  icons[
                    route.name as keyof typeof icons
                  ] as keyof typeof Ionicons.glyphMap
                }
                size={22}
                color={isFocused ? "#fff" : greyColor}
              />
            </View>
            <Text
              className="font-rubik"
              style={[
                styles.tabbarLabel,
                { color: isFocused ? text_primaryColor : greyColor },
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabbar: {
    bottom: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 4,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 3,
    width: "100%",
  },
  tabbarItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  tabbarLabel: {
    fontSize: 11,
    fontWeight: "600",
    marginTop: 3,
  },
});

export default TabBar;
