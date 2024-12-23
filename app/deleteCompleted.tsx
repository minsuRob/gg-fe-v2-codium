import React, { useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";
import Buttons from "../components/buttons";
import { MonoText } from "../components/styledText";
import { colors } from "../constants/Colors";
import { useNavigation } from "expo-router";

const deleteImage = require("../assets/images/deleteAccount.svg");

export default function DeleteCompleted() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.mailbox_items}>
        <MonoText style={styles.title}>탈퇴가 완료되었습니다.</MonoText>
        <MonoText style={styles.text}>
          진저호텔이 그리워지면 다시 찾아주세요!
        </MonoText>

        <View style={styles.temp}>
          <Image source={deleteImage} />
        </View>
      </View>

      <View style={styles.footer}>
        <Buttons url={"/"} title="홈으로" is_width={true} color="green" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: colors.greyblack,
    justifyContent: "space-between",
  },
  mailbox_items: {
    backgroundColor: colors.greyblack,
    padding: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    flex: 1,
  },
  footer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: 52,
    width: "100%",
    marginBottom: 30,
  },

  title: {
    fontSize: 20,
    color: colors.Whiteyello,
    marginBottom: 8,
  },
  text: {
    fontSize: 12,
    color: colors.grey500,
    marginTop: 8,
  },
  temp: {
    width: 300,
    height: 400,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
