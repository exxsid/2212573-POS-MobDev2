import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { Input } from "@ui-kitten/components";

import colors from "../constants/colors";
import { SearchBar } from "react-native-screens";

export default ({ info }) => {
  const { imageSource, name, unit, quantity, price } = info;
  return (
    <View style={{ padding: 5 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 5,
        }}
      >
        <Image source={imageSource} style={styles.productImage} />
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.productHeader}>{name}</Text>
          <Text style={styles.productSub}>{unit}</Text>
          <Text style={styles.productSub}>{quantity} pcs available</Text>
        </View>
        <Text style={styles.productHeader}>Php {price}</Text>
      </View>
      <Text style={{ fontWeight: "bold" }}>Quantity</Text>
      <Text
        style={{
          margin: 10,
          // paddingHorizotal: 20,
          paddingVertical: 10,
          backgroundColor: "grey",
        }}
      >
        1
      </Text>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "gray",
            paddingVertical: 5,
            paddingHorizontal: 15,
            borderRadius: 2,
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 15,
              color: "red",
              fontWeight: "bold",
            }}
          >
            Cancel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: colors.primary,
            paddingVertical: 5,
            paddingHorizontal: 15,
            borderRadius: 2,
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 15,
              color: colors.text,
              fontWeight: "bold",
            }}
          >
            Add to cart
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productImage: {
    height: 100,
    width: 100,
    borderRadius: 2,
  },
  productHeader: { fontWeight: "bold", fontSize: 20 },
  productSub: { fontSize: 10 },
  input: {
    flex: 1,
    margin: 2,
    backgroundColor: "red",
  },
});
