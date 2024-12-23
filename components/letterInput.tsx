import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { colors } from "../constants/Colors";

export default function LetterInput({ value, onChange }: any) {
  return (
    <TextInput
      style={styles.letter}
      multiline={true}
      numberOfLines={20}
      placeholder="전하고 싶은 말을 적어주세요!"
      value={value}
      onChangeText={onChange}
    />
  );
}

const styles = StyleSheet.create({
  letter: {
    width: 300,
    backgroundColor: colors.grey900,
    paddingTop: 22,
    paddingBottom: 22,
    paddingLeft: 18,
    paddingRight: 18,
    textAlign: "left",
    border: "4px solid #719898",
    borderRadius: 12,
    color: colors.grey500,
    outlineStyle: "none",
    fontFamily: "NanumSquareNeo-Variable",
    lineHeight: 18,
  },
});
