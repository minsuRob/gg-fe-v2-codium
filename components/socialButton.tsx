import React from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";

type TSocialButtonProps = {
  name: keyof typeof imagePath;
};

const imagePath = {
  apple: require("../assets/logos/apple_white.png"),
  google: require("../assets/logos/google.png"),
  kakao: require("../assets/logos/kakao.png"),
  naver: require("../assets/logos/naver.png"),
};

const SocialButton = ({ name }: TSocialButtonProps) => {
  const btnBackground =
    name === "apple"
      ? "black"
      : name === "google"
      ? "white"
      : name === "kakao"
      ? "#FDDC3F"
      : "#f2f2f2";

  return (
    <TouchableOpacity
      style={[
        styles.social_btn,
        { backgroundColor: btnBackground },
        // 구글 버튼에만 회색 보더 적용
        name === "google" ? styles.google_border_style : null,
      ]}
    >
      <Image
        source={imagePath[name]}
        style={[styles[name]]}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  social_btn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  apple: {
    width: 30,
    height: 30,
  },
  google: {
    width: 40,
    height: 40,
  },

  kakao: {
    width: 50,
    height: 50,
  },
  naver: {
    width: 40,
    height: 40,
  },
  google_border_style: {
    borderColor: "#eee",
    borderWidth: 1,
  },
});

export default SocialButton;
