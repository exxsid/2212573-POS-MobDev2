import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Text, Dimensions } from "react-native";
import { TextField, Button, Colors } from "react-native-ui-lib";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

import CartProductCard from "./card/CartProductCard";
import colors from "../constants/colors";

const screen = Dimensions.get("window");

export default ({ info, handleCancelPress, handleAddToCartPress }) => {
  const { imageSource, name, unit, quantity, price } = info;
  const [inputValue, setInputValue] = useState("1");
  const [totalPrice, setTotalPrice] = useState(price);

  const handleInput = (text) => {
    setInputValue(text);
  };

  const handlePlusButton = () => {
    const newQuantity = parseInt(inputValue) + 1;
    const maxInputValue = quantity; // maximum input value
    if (newQuantity > maxInputValue) {
      setInputValue("1");
      alert("Input must not be greater than the stock");
    } else {
      setInputValue(newQuantity.toString());
    }
    setTotalPrice(newQuantity * price);
  };

  const handleMinusButton = () => {
    const newQuantity = parseInt(inputValue) - 1;
    if (newQuantity <= 0) {
      alert("Quantity can never be zero or less");
      setInputValue("1");
    } else {
      setInputValue(newQuantity.toString());
    }
    setTotalPrice(newQuantity * price);
  };

  const validateInput = () => {
    const maxInputValue = quantity; // maximum input value
    const parsedValue = parseFloat(inputValue);
    if (parsedValue > maxInputValue) {
      setInputValue("");
      alert("Input must not be greater than the stock");
    }
  };

  return (
    <ScrollView>
      <View style={{ padding: 10 }}>
        <CartProductCard info={info} />
        <View style={{ flexDirection: "row" }}>
          <TextField
            placeholder={"Quantity"}
            floatingPlaceholder
            onChangeText={handleInput}
            keyboardType="numeric"
            value={inputValue}
            onBlur={validateInput}
            style={styles.input}
          />
          <TouchableOpacity style={styles.button} onPress={handleMinusButton}>
            <Entypo name="minus" size={30} color={colors.backgroundSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handlePlusButton}>
            <Entypo name="plus" size={30} color={colors.backgroundSecondary} />
          </TouchableOpacity>
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontWeight: "bold" }}>Total Price</Text>
          <Text>Php {totalPrice}</Text>
        </View>
        {/* buttons */}
        <View style={styles.addCancelContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancelPress}
          >
            <Text>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() =>
              handleAddToCartPress(parseInt(inputValue), info.id - 1)
            }
          >
            <Text style={{ color: colors.text }}>Add to cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
    width: screen.width * 0.6,
    fontSize: 20,
  },
  button: {
    backgroundColor: "white",
    padding: 2,
    paddingHorizontal: 5,
    margin: 3,
    borderRadius: 2,
    borderColor: colors.backgroundSecondary,
    borderWidth: 1,
  },
  addCancelContainer: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
    marginTop: 10,
  },
  cancelButton: {
    padding: 10,
    fontWeight: "bold",
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 10,
    marginRight: 10,
  },
  addButton: {
    padding: 10,
    fontWeight: "bold",
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
});
