import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useRef, useMemo, useState } from "react";
import { View, Text, StyleSheet, StatusBar, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

import ProductContainer from "../components/ProductContainer";
import { Searchbar } from "../components/SearchBar";
import colors from "../constants/colors";
import AddToCart from "../components/AddToCart";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
    padding: 10,
  },
  text: {
    color: colors.text,
    fontWeight: "bold",
    fontSize: 10,
  },
  divider: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  cartButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.backgroundSecondary,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 2,
    justifyContent: "space-between",
  },
});

const products = [
  {
    imageSource: require("../assets/images/pepsi.png"),
    name: "Pepsi",
    unit: "1 liter",
    quantity: "100",
    price: "50.00",
  },
  {
    imageSource: require("../assets/images/fishcake.webp"),
    name: "Fish Cake",
    unit: "25 grams",
    quantity: "50",
    price: "2.00",
  },
  {
    imageSource: require("../assets/images/dragonsid.webp"),
    name: "Dragon Sid",
    unit: "10 grams",
    quantity: "45",
    price: "2.00",
  },
];

export default ({ navigation }) => {
  const sheetRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const snapPoint = ["40%", "80%"];

  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
    setIsOpen(true);
  }, []);
  // const handleClosePress = useCallback(() => {
  //   sheetRef.current?.close();
  //   setIsOpen(false);
  // }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"default"} />

      <Searchbar />

      <View style={styles.divider}>
        <Text style={styles.text}>All Products</Text>
        <TouchableOpacity style={styles.cartButton}>
          <Text
            style={[
              styles.text,
              { fontSize: 15, paddingRight: 10, color: "red" },
            ]}
            onPress={() => navigation.push("Cart")}
          >
            Clear cart
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        renderItem={({ item }) => {
          return (
            <ProductContainer
              info={item}
              onPress={() => handleSnapPress(0)}
              trailing={"trash"}
            />
          );
        }}
        keyExtractor={(product) => product.id}
        showsVerticalScrollIndicator={false}
      />

      {/* <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoint}
        enablePanDownToClose={true}
        onClose={() => setIsOpen(false)}
      >
        <BottomSheetView>
          <AddToCart info={products.at(0)} />
        </BottomSheetView>
      </BottomSheet> */}
    </View>
  );
};
