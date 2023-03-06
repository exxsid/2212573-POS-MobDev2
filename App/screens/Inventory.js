import React from "react";
import { View, Text, StyleSheet, StatusBar, SafeAreaView } from "react-native";

export default () => {
  return (
    <View>
      <StatusBar barStyle={"default"} />
      <SafeAreaView>
        <Text>Inventory Screen</Text>
      </SafeAreaView>
    </View>
  );
};
