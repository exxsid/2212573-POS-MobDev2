import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "@react-native-material/core";
import React from "react";
import { View, Text, StyleSheet, StatusBar, SafeAreaView } from "react-native";
import { Searchbar } from "../components/SearchBar";

import colors from "../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
    padding: 10,
  },
  searchBar: {
    flexDirection: "row",
    backgroundColor: "blue",
  },
  searchTextInput: {
    backgroundColor: "grey",
  },
});

export default () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"default"} />
      <Searchbar />
    </View>
  );
};
