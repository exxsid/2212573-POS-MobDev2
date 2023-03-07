import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, StatusBar, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import colors from "../constants/colors";

const styles = StyleSheet.create({
  container: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.text,
    width: "100%",
    flexDirection: "row",
    paddingVertical: 10,
    marginTop: 10,
    alignItems: "center",
  },
  productImage: {
    height: 50,
    width: 50,
    borderRadius: 2,
  },
  productDetails: {
    flexDirection: "column",
    paddingLeft: 10,
  },
  productHeader: {
    color: colors.text,
    fontWeight: "bold",
    fontSize: 20,
  },
  productSub: {
    color: colors.text,
    fontSize: 10,
  },
});

export default ({ info, onPress, trailing }) => {
  const { imageSource, name, unit, quantity, price } = info;
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          alignItems: "center",
        }}
      >
        <Image source={imageSource} style={styles.productImage} />
        <View style={styles.productDetails}>
          <Text style={styles.productHeader}>{name}</Text>
          <Text style={styles.productSub}>{unit}</Text>
          <Text style={styles.productSub}>{quantity} pcs available</Text>
        </View>
      </View>

      <Text style={styles.productHeader}>Php {price}</Text>
      <TouchableOpacity style={{ paddingLeft: 10 }} onPress={onPress}>
        <Ionicons name={trailing} size={20} color={colors.text} />
      </TouchableOpacity>
    </View>
  );
};
