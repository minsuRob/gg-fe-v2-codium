import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Pressable,
  Text,
  Image,
  Platform,
} from "react-native";
import { colors } from "../../constants/Colors";


import { useRoute } from "@react-navigation/native";
import { WithLocalSvg } from "react-native-svg";
import { MonoText } from "../styledText";

const closeIcon = require("../../assets/icon/i_close_line.svg");

type Props = {
  onClose?: any;
  visible?: boolean;
  height?: number | any;
  name: string;
  desc: string;
};

const OneBtnModal = ({ height, visible, onClose, name, desc }: Props) => {
  const setModalVisible = () => {
    onClose(); // 부모 컴포넌트에 닫기 이벤트를 전달
  };
  const close = () => {
    onClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setModalVisible();
      }}
    >
      <View style={styles(height).centeredView}>
        <View style={styles(height).modalView}>
          <View style={styles(height).close_btn}>
            <Pressable onPress={close}>
              {Platform.OS === "ios" || Platform.OS === "android" ? (
                <WithLocalSvg asset={closeIcon} />
              ) : (
                <Image source={closeIcon} />
              )}
            </Pressable>
          </View>
          <Text style={[styles(height).modal_title]}>{name}</Text>
          <Text style={[styles(height).modal_desc]}>
            로그인이 필요한 기능입니다.
          </Text>
          <Text style={[styles(height).modal_desc]}>
            간편하게 가입하고 진저호텔을 시작하세요!
          </Text>

          <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: colors.grey700,
              marginVertical: 15,
            }}
          ></View>
          <View style={styles(height).button_wrapper}>
            <Pressable
              style={[styles(height).button, styles(height).buttonOpen]}
              onPress={() => setModalVisible()}
            >
              <MonoText style={styles(height).textStyle}>
                오늘의 편지 보러가기
              </MonoText>
            </Pressable>
          </View>

        </View>
      </View>
    </Modal>
  );
};

const styles = (height: number) =>
  StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#0e0e0eb1",
    },
    modalView: {
      position: "relative",
      margin: 20,
      backgroundColor: colors.grey900,
      borderRadius: 10,
      width: 360,
      padding: 28,
      height,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      borderWidth: 1,
      borderColor: colors.grey900,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 7,
      padding: 13,
      paddingLeft: 10,
      paddingRight: 10,
      elevation: 2,
      width: 300,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    google: {
      backgroundColor: "white",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      flex: 1,
    },
    textStyle_google: {
      color: colors.greyblack,
    },
    kakao_text: {
      color: colors.greyblack,
      fontWeight: "600",
      flex: 1,
      textAlign: "center",
    },
    modal_title: {
      fontSize: 16,
      textAlign: "center",
      color: colors.Whiteyello,
      fontWeight: "600",
    },
    modal_desc: {
      fontSize: 12,
      color: colors.grey500,
      textAlign: "center",
    },
    kakao: {
      backgroundColor: "#FDDC3F",
      borderRadius: 7,
      padding: 13,
      paddingLeft: 10,
      paddingRight: 10,
      elevation: 2,
      width: 300,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    close_btn: {
      position: "absolute",
      top: 10,
      right: 10,
    },
    button_wrapper: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      flexDirection: "row",
    },
    buttonOpen: {
      backgroundColor: colors.green600,
      color: colors.Whiteyello,
    },
  });

export default OneBtnModal;
