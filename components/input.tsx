import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { colors } from "../constants/Colors";

export default function Input({
  value,
  placeholder,
  onChange,
  maxLength = 1000,
  multiline = 0,
  width = 0,
}: any) {
  return (
    <TextInput
      style={[styles.input, { width: width ? width : null }]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChange}
      maxLength={maxLength}
      placeholderTextColor={colors.grey600}
      multiline={multiline != 0 ? true : false}
      numberOfLines={multiline}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.grey800,
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 16,
    paddingRight: 16,
    textAlign: "left",
    borderWidth: 1,
    borderColor: colors.grey600,
    borderRadius: 12,
    color: colors.Whiteyello,
    outlineStyle: "none",
    fontFamily: "NanumSquareNeo-Variable",
    lineHeight: 18,
  },
});
