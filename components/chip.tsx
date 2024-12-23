import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { colors } from "../constants/Colors";
import { MonoText } from "./styledText";

export default function Chip({ text, active, width }: any) {
  return (
    <View
      style={[styles.chip, text === active && styles.active, { width: width }]}
    >
      <MonoText style={text !== active ? styles.active_text : styles.text}>
        {text}
      </MonoText>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 45,
    textAlign: "center",
    backgroundColor: colors.grey700,
    marginRight: 12,
  },
  active: {
    backgroundColor: colors.green600,
  },
  active_text: {
    textAlign: "center",
    color: colors.grey400,
  },
  text: {
    textAlign: "center",
    color: colors.Whiteyello,
  },
});
