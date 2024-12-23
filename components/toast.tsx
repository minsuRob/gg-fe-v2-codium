import React from "react";
import { View, Text } from "react-native";
import { BaseToast } from "react-native-toast-message";
import { colors } from "../constants/Colors";
import { Icon } from "./Icon";
import { MonoText } from "./styledText";

export const toastConfig = {
  basicToast: (props: any) => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: "#5A66FF",
        borderLeftColor: "#5A66FF",
        textAlign: "center",
        padding: 2,
        height: 40,
        zIndex: 1000,
      }}
      text1Style={{
        fontSize: 15,
        fontWeight: "400",
        color: "white",
        textAlign: "center",
      }}
    />
  ),
  iconToast: ({ text1, props }: any) => (
    <View
      style={{
        height: 40,
        width: "70%",
        borderRadius: 65,
        backgroundColor: colors.grey200,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <Icon url={props.icon} width={24} />
      <MonoText style={{ color: colors.grey800, marginLeft: 8 }}>
        {text1}
      </MonoText>
    </View>
  ),
};
