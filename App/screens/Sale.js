import { Ionicons } from "@expo/vector-icons";
import React, {
  useCallback,
  useRef,
  useMemo,
  useState,
  useEffect,
} from "react";
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
import cartList from "../constants/cartlist";

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
  const [products, setProduct] = useState(inventory);
  const [carts, setCarts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(products.at(0));

  const snapPoint = ["40%", "80%", "90%", "95%"];

  const handleSnapPress = (item) => {
    sheetRef.current?.present();
    setSelectedProduct(item);
  };

  const handleAddToCartPress = (orderQuantity, index) => {
    const updatedProducts = [...products];
    const newQuantity = updatedProducts[index].quantity - orderQuantity;
    updatedProducts[index].quantity = newQuantity;

    setProduct(updatedProducts);
    addProductToCart(products[index], orderQuantity);
    handleCancelPress();
  };

  const addProductToCart = (newCartProduct, orderQuantity) => {
    const index = carts.findIndex((item) => item.id === newCartProduct.id);
    if (index === -1) {
      carts.push({
        id: newCartProduct.id,
        imageSource: newCartProduct.imageSource,
        name: newCartProduct.name,
        unit: newCartProduct.unit,
        quantity: orderQuantity,
        price: orderQuantity * newCartProduct.price,
      });
    } else {
      const updatedCart = [...carts];
      updatedCart[index].quantity += orderQuantity;
      updatedCart[index].price += orderQuantity * newCartProduct.price;
      setCarts(updatedCart);
    }
  };

  const handleCancelPress = () => {
    sheetRef.current?.close();
  };

  const handleClearCartPress = () => {
    const updatedProducts = [...products];
    carts.forEach((cartProd) => {
      const index = updatedProducts.findIndex(
        (prod) => prod.id === cartProd.id
      );
      if (index !== -1) {
        updatedProducts[index].quantity += cartProd.quantity;
      }
    });

    setProduct(updatedProducts);
    setCarts([]);
  };

  const checkoutCart = () => {
    setCarts([]);
  };

  const renderAddToCartPage = (item) => {
    return (
      <AddToCart
        info={item}
        handleCancelPress={handleCancelPress}
        handleAddToCartPress={handleAddToCartPress}
      />
    );
  };

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <StatusBar barStyle={"default"} />

        <Searchbar />

        {/* Cart button */}
        <View style={styles.divider}>
          <Text style={styles.text}>All Products</Text>
          <TouchableOpacity style={styles.cartButton}>
            <Text
              style={[styles.text, { fontSize: 15, paddingRight: 10 }]}
              onPress={() => {
                carts.length === 0
                  ? alert("Cart is empty")
                  : navigation.push("Cart", {
                      cartList: carts,
                      saveChangesPress: handleAddToCartPress,
                      prod: products,
                      clearCartPress: handleClearCartPress,
                      checkoutCart: checkoutCart,
                    });
              }}
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
          keyExtractor={(product) => product.id}
          showsVerticalScrollIndicator={false}
        />

        <BottomSheetModal ref={sheetRef} index={1} snapPoints={snapPoint}>
          {renderAddToCartPage(selectedProduct)}
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};
