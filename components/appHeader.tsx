import { router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { colors } from "../constants/Colors";
import { typography } from "../constants/Typo";
import { SvgImg } from "./svgImg";
const arrow = require("../assets/icon/i_arrow_back.svg");

export default function Header({ title, disabledIcon }: any) {
  return (
    <SafeAreaView style={{ backgroundColor: colors.greyblack }}>
      <View style={styles.container}>
        {!disabledIcon ? (
          <SvgImg
            onPress={() => router.back()}
            //a_width={30}
            //a_height={30}
            url={arrow}
            width={30}
            height={30}
          />
        ) : (
          <View style={{ width: 30, height: 30, marginLeft: -5 }}></View>
        )}

        <Text style={[styles.title, typography.soyo]}>{title}</Text>
        <View style={styles.empty}></View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingLeft: 15,
    paddingTop: 11,
    paddingBottom: 11,
    backgroundColor: colors.greyblack,
    borderBottomColor: colors.greyblack,
    justifyContent: "space-between",
  },
  titleContainer: {
    flex: 1,
    alignItems: "center", // 수평 가운데 정렬
  },
  title: {
    fontSize: 18,
    color: colors.Whiteyello,
  },
  empty: {
    width: 30,
    height: 30,
  },
});
