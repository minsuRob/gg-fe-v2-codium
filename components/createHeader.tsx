import React from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../constants/Colors";
import { MonoText } from "./styledText";
let icon = require("../assets/icon/i_favorite.png");

const CreateHeader = ({ isActiveNumber = 1 }: any) => {
  let width = {};
  switch (isActiveNumber) {
    case 1:
      width = { width: "25%" };
      break;
    case 2:
      width = { width: "50%" };
      break;
    case 3:
      width = { width: "75%" };
      break;
    case 4:
      width = { width: "100%" };
      break;
    default:
      break;
  }

  return (
    <SafeAreaView style={{ backgroundColor: "white", width: "100%" }}>
      <View style={styles.wrapper}>
        <View style={[styles.progress, width]}></View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: 4,
    backgroundColor: colors.grey900,
  },
  progress: {
    height: 4,
    backgroundColor: colors.green300,
  },
});

export default CreateHeader;
