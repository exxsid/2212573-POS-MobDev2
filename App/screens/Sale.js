import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useRef, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  TextInput,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

import ProductContainer from "../components/ProductContainer";
import { Searchbar } from "../components/SearchBar";
import colors from "../constants/colors";
import AddToCart from "../components/AddToCart";
import { inventory } from "../constants/products";

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
    backgroundColor: colors.primary,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 2,
    justifyContent: "space-between",
  },
});

export default ({ navigation }) => {
  const sheetRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProduct] = useState(inventory);
  const [selectedProduct, setSelectedProduct] = useState(products.at(0));

  const updateProdQuantity = (newQuantity, index) => {
    const updatedProducts = products.map((item, i) => {
      if (i === index) {
        return { ...item, quantity: newQuantity };
      } else {
        return item;
      }
    });
    setProduct(updatedProducts);
  };

  const snapPoint = ["40%", "80%", "90%", "95%"];

  const handleSnapPress = (item) => {
    sheetRef.current?.present();
    // updateProdQuantity(inventory.at(index).quantity, index);
    setSelectedProduct(item);
  };

  const handleCancelPress = () =>{
    sheetRef.current?.close();
  }

  const renderAtToCartPage = (item) => {
    return <AddToCart info={item} handleCancelPress={handleCancelPress}/>;
  };
  // const handleClosePress = useCallback(() => {
  //   sheetRef.current?.close();
  //   setIsOpen(false);
  // }, []);

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <StatusBar barStyle={"default"} />

        <Searchbar />

        <View style={styles.divider}>
          <Text style={styles.text}>All Products</Text>
          <TouchableOpacity style={styles.cartButton}>
            <Text
              style={[styles.text, { fontSize: 15, paddingRight: 10 }]}
              onPress={() => navigation.push("Cart")}
            >
              Cart
            </Text>
            <Ionicons name="cart" size={30} color={colors.text} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={inventory}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => handleSnapPress(item)}>
                <ProductContainer info={item} />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(product) => product.name}
          showsVerticalScrollIndicator={false}
        />
        <BottomSheetModal ref={sheetRef} index={1} snapPoints={snapPoint}>
          {renderAtToCartPage(selectedProduct)}
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};
