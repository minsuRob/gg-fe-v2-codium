import React from "react";
import { Image, StyleSheet } from "react-native";
import { Link, Stack } from "expo-router";
import { Text, View } from "../components/themed";
import { colors } from "../constants/Colors";
import { MonoText } from "../components/styledText";
import { typography } from "../constants/Typo";
import Buttons from "../components/buttons";

interface NotFoundScreenProps {
  pngImage?: { uri: string };
}

const NotFoundScreen: React.FC<NotFoundScreenProps> = () => {
  const missingImg = require("../assets/images/404.png");
  return (
    <>
      <Stack.Screen options={{ title: "404", headerShown: false }} />
      <View style={styles.container}>
        <Image source={missingImg} style={styles.image} />
        <Text style={styles.TextStyle}>지금은 호텔을 정비 중이야!</Text>
        <MonoText style={styles.SubTextStyle}>잠시만 기다려줘~</MonoText>
        <Link href="/" style={styles.link}>
          <Buttons title="홈으로 가기" url="/" color="green" width={180} />
        </Link>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: colors.greyblack,
  },
  image: {
    width: 282,
    height: 288,
    resizeMode: "contain",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
  TextStyle: {
    fontSize: 16,
    color: colors.green500,
    fontWeight: "700",
    fontFamily: "SOYOMaple-Regular",
    marginBottom: 12,
  },
  SubTextStyle: {
    fontSize: 14,
    color: "white",
    fontWeight: "400",
    fontFamily: "SOYOMaple-Regular",
    marginBottom: 20,
  },
});

export default NotFoundScreen;
