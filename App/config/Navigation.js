import React from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Dimensions } from "react-native";

import Home from "../screens/Home";
import Inventory from "../screens/Inventory";
import Sale from "../screens/Sale";
import Settings from "../screens/Settings";
import colors from "../constants/colors";
import Cart from "../screens/Cart";
import AddToCart from "../components/AddToCart";

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: colors.backgroundPrimary,
    borderBottomWidth: 0,
  },
});

const screen = Dimensions.get("window");

// screens
const homeName = "Home";
const inventoryName = "Inventory";
const saleName = "Sale";
const settingsName = "Settings";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export const TabNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={saleName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? "home" : "home-outline";
            } else if (rn === inventoryName) {
              iconName = focused ? "list" : "list-outline";
            } else if (rn === saleName) {
              iconName = focused ? "cart" : "cart-outline";
            } else if (rn === settingsName) {
              iconName = focused ? "settings" : "settings-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarStyle: {
            backgroundColor: colors.backgroundPrimary,
            height: screen.height * 0.09,
            paddingVertical: 10,
            borderTopWidth: 0,
          },
          headerShown: false,
        })}
        tabBarOptions={{
          activeTintColor: colors.primary,
          inactiveTintColor: colors.text,
          labelStyle: { paddingBottom: 10, fontSize: 10, marginTop: 10 },
        }}
      >
        <Tab.Screen name={homeName} component={Home} />
        <Tab.Screen name={inventoryName} component={Inventory} />
        <Tab.Screen name={saleName} component={SaleStack} />
        <Tab.Screen name={settingsName} component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export const SaleStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: styles.headerStyle,
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 30,
        },
      }}
    >
      <Stack.Screen name="Sale" component={Sale} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="AddToCart" component={AddToCart} />
    </Stack.Navigator>
  );
};
