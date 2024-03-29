import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useRef, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  Dimensions,
  Button,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  BottomSheetModalProvider,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";

import ProductContainer from "../components/ProductContainer";
import { Searchbar } from "../components/SearchBar";
import colors from "../constants/colors";
import EditCart from "../components/EditCart";

const screen = Dimensions.get("window");

export default ({ route, navigation }) => {
  const sheetRef = useRef(null);
  const { cart, prod, saveChangesPress, clearCartPress } = route.params;
  const [cartList, setCartList] = useState(cart);
  const [selectedProduct, setSelectedProduct] = useState(cartList.at(0));
  const [index, setIndex] = useState(0);

  const snapPoint = ["40%", "80%"];

  const handleSnapPress = useCallback((item, index) => {
    sheetRef.current?.present();
    setSelectedProduct(item);
    setIndex(index);
  }, []);

  const handleCancelPress = () => {
    sheetRef.current?.close();
  };

  const handleSaveChangesPress = (newQuantity) => {
    const inventoryIndex = prod.findIndex(
      (item) => item.id === cartList[index].id
    );
    if (newQuantity > cartList[index].quantity) {
      saveChangesPress(newQuantity - cartList[index].quantity, inventoryIndex);
      setCartListOnSaveChange(newQuantity);
      handleCancelPress();
    } else if (newQuantity < cartList[index].quantity) {
      saveChangesPress(newQuantity - cartList[index].quantity, inventoryIndex);
      setCartListOnSaveChange(newQuantity);
      handleCancelPress();
    }
  };

  const setCartListOnSaveChange = (newQuantity) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = newQuantity;
    updatedCart[index].price = newQuantity * prod[selectedProduct.id - 1].price;
    setCartList(updatedCart);
  };

  const handleClearCartPress = () => {
    clearCartPress();
    setCartList([]);
  };

  const handleCheckOutPress = () => {
    route.params.checkoutCart();
    setCartList([]);
  };

  const removeProduct = () => {
    route.params.removeItemFromCart(
      cartList[index].id,
      cartList[index].quantity,
      index
    );
    const updatedCart = [...cartList];
    updatedCart.splice(index, 1);
    setCartList(updatedCart);
    sheetRef.current?.close();
  };

  const renderEditCartPage = (item) => {
    return (
      <EditCart
        info={item}
        handleCancelPress={handleCancelPress}
        handleSaveChangesPress={handleSaveChangesPress}
        origPrice={prod[item.id - 1].price}
        origQuantity={prod[item.id - 1].quantity}
        removeProduct={removeProduct}
      />
    );
  };

  const renderBottomComponent = () => {
    return (
      <View style={styles.bottomComponent}>
        <View style={styles.total}>
          <Text style={styles.totalText}>Total:</Text>
          <Text style={styles.totalText}>
            Php {cartList.reduce((acc, curr) => acc + curr.price, 0)}.00
          </Text>
        </View>
        <Button
          title="Checkout"
          color={colors.primary}
          onPress={() => {
            alert("Transaction is successfully saved.");
            handleCheckOutPress();
          }}
        />
      </View>
    );
  };

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <StatusBar barStyle={"default"} />

        <Searchbar />

        <View style={styles.divider}>
          <Text style={styles.text}>All Products</Text>

          <TouchableOpacity style={styles.clearButton}>
            <Text
              style={[
                styles.text,
                { fontSize: 15, paddingRight: 10, color: "red" },
              ]}
              onPress={() => handleClearCartPress()}
            >
              Clear cart
            </Text>
          </TouchableOpacity>
        </View>

        {cartList.length > 0 ? (
          <FlatList
            data={cartList}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity onPress={() => handleSnapPress(item, index)}>
                  <ProductContainer info={item} />
                </TouchableOpacity>
              );
            }}
            keyExtractor={(product) => product.id}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <Text>Cart is empty</Text>
        )}

        <BottomSheetModal ref={sheetRef} index={1} snapPoints={snapPoint}>
          {renderEditCartPage(selectedProduct)}
        </BottomSheetModal>

        {renderBottomComponent()}
      </View>
    </BottomSheetModalProvider>
  );
};

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
  clearButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.backgroundSecondary,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 2,
    justifyContent: "space-between",
  },
  bottomComponent: {
    position: "absolute",
    bottom: 0,
    backgroundColor: colors.backgroundSecondary,
    padding: 16,
    width: screen.width,
  },
  total: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  totalText: {
    color: colors.text,
    fontWeight: "bold",
    fontSize: 20,
  },
});
