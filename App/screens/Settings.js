import React from "react";
import { View, Text, StyleSheet, StatusBar, SafeAreaView } from "react-native";
import colors from "../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
});

export default () => {
  return (
    <View>
      <StatusBar barStyle={"default"} />
      <SafeAreaView>
        <Text>Settings Screen</Text>
      </SafeAreaView>
    </View>
  );
};
