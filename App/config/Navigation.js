import React from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {Ionicons} from "@expo/vector-icons";

import Home from "../screens/Home";
import Inventory from "../screens/Inventory";
import Sale from "../screens/Sale";
import Settings from "../screens/Settings";
import colors from "../constants/colors";

// screens
const homeName = "Home";
const inventoryName = "Inventory";
const saleName = "Sale";
const settingsName = "Settings";

const Tab = createBottomTabNavigator();

const bottomNavBackground = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme,
        background: colors.backgroundPrimary
    }
}

export default () => {
  return (
    <NavigationContainer
    >
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? "home" : "home-outline";
            } else if (rn === inventoryName) {
              iconName = focused ? "list" : "list-outline";
            } else if (rn === settingsName) {
              iconName = focused ? "settings" : "settings-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: colors.primary,
          inactiveTintColor: colors.text,
          labelStyle: { paddingBottom: 10, fontSize: 10,},
          
        }}
      >
        <Tab.Screen name={homeName} component={Home} />
        <Tab.Screen name={inventoryName} component={Inventory} />
        <Tab.Screen name={settingsName} component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
