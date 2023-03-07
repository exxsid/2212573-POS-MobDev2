import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";

import colors from "../constants/colors";

const styles = StyleSheet.create({
  txtError: {
    marginTop: "2%",
    width: "89%",
    color: "white",
  },
  vwClear: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    backgroundColor: colors.backgroundSecondary,
    flex: 1,
    color: colors.text,
    fontWeight: "500",
  },
  vwClear: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.backgroundSecondary,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },

  vwSearch: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.backgroundSecondary,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  icSearch: {
    color: colors.text,
  },
  icClear: {
    color: colors.text,
  },
  searchContainer: {
    width: "90%",
    height: 40,
    flexDirection: "row",
  },
  container: {
    height: 80,
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
});

export const Searchbar = ({ value, updateSearch, style }) => {
  const [query, setQuery] = useState();
  const [error, setError] = useState();
  return (
    <View style={[styles.container, style]}>
      <View style={styles.searchContainer}>
        <View style={styles.vwSearch}>
          <Ionicons name="search" style={styles.icSearch} size={15} />
        </View>

        <TextInput
          value={query}
          placeholder="Search"
          style={styles.textInput}
          onChangeText={(text) => {
            var letters = /^$|^[a-zA-Z._\b ]+$/;
            if (text.length > 12) setError("Query too long.");
            else if (text.match(letters)) {
              setQuery(text);
              updateSearch(text);
              if (error) setError(false);
            } else setError("Please only enter alphabets");
          }}
        />
        {query ? (
          <TouchableOpacity onPress={() => setQuery("")} style={styles.vwClear}>
            <Ionicons
              name="backspace-outline"
              style={styles.icClear}
              size={15}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.vwClear} />
        )}
      </View>
      {error && <Text style={styles.txtError}>{error}</Text>}
    </View>
  );
};
