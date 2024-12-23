import React from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../constants/Colors";
import { MonoText } from "./styledText";
const check = require("../assets/icon/i_check.png");
const check_green = require("../assets/icon/i_check_green.png");

export default function CheckBox({
  text,
  checked,
  bg,
  onPress = () => {},
}: any) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.checkbox]}>
        <View style={bg && styles.bg}>
          {checked ? (
            <Image style={styles.check} source={check_green} />
          ) : (
            <Image style={styles.check} source={check} />
          )}
        </View>
        <MonoText style={styles.text}>{text}</MonoText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  check: {
    width: 30,
    height: 30,
  },
  active: {},
  text: {
    color: colors.Whiteyello,
    marginLeft: 11,
  },
  bg: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: colors.Whiteyello,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
