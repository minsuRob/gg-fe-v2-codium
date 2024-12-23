import React, { useState } from "react";
import { View, StyleSheet, Modal, Pressable, Text, Image } from "react-native";
import { colors } from "../constants/Colors";
import { typography } from "../constants/Typo";
import { MonoText } from "./styledText";
import { router } from "expo-router";
import { useRecoilValue } from "recoil";
import { hotelIdState } from "../atom/letterAtom";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

type Props = {
  onClose?: any;
  visible?: boolean;
  height?: number | any;
  name: string;
  desc: string;
  img: string | any;
  callback?: any;
  btnText?: any;
  check?: boolean;
};

const GingerModal = ({
  height,
  visible,
  onClose,
  name,
  img,
  desc,
  callback,
  btnText,
}: Props) => {
  const setModalVisible = () => {
    onClose(); // 부모 컴포넌트에 닫기 이벤트를 전달
  };
  const setCloseModal = () => {
    onClose(); // 부모 컴포넌트에 닫기 이벤트를 전달
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
      <Pressable
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          width: "100%",
          height: "100%",
        }}
        onPress={(e) => {
          e.stopPropagation();
          if (e.target === e.currentTarget) {
            setCloseModal();
          }
        }}
      >
        <View style={styles(height).centeredView}>
          <View style={styles(height).modalView}>
            <MonoText style={styles(height).modal_title}>
              오늘의 진저 투숙객
            </MonoText>
            <Text
              style={[styles(height).modal_desc, typography.display1_basic]}
            >
              {name}
            </Text>

            {img && <Image source={img} style={{ width: 210, height: 230 }} />}

            <View
              style={{
                height: 1,
                width: "100%",
                backgroundColor: colors.grey700,
                marginTop: 16,
              }}
            ></View>
            <MonoText
              style={{
                fontSize: 12,
                color: colors.grey500,
                lineHeight: 20,
                textAlign: "center",

                // paddingRight: 30,
                marginTop: 14,
                marginBottom: 26,
              }}
            >
              {desc}
            </MonoText>

            <View style={styles(height).button_wrapper}>
              <Pressable
                style={[styles(height).button, styles(height).buttonOpen]}
                onPress={callback ? callback : setCloseModal}
              >
                <MonoText style={styles(height).textStyle}>
                  {btnText ? btnText : "확인"}
                </MonoText>
              </Pressable>
            </View>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = (height: number) =>
  StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: colors.grey900,
      borderRadius: 10,
      width: "80%",
      padding: 28,
      height,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
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
      borderRadius: 10,
      padding: 13,
      paddingLeft: 10,
      paddingRight: 10,
      elevation: 2,
      width: "100%",
    },
    buttonOpen: {
      backgroundColor: colors.green600,
      color: colors.Whiteyello,
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      flex: 1,
    },
    modal_title: {
      marginBottom: 6,
      fontSize: 16,
      textAlign: "center",
      color: colors.Whiteyello,
    },
    modal_desc: {
      fontSize: 12,
      marginBottom: 10,
      color: colors.Whiteyello,
      textAlign: "center",
      lineHeight: 21,
      fontWeight: "700",
    },
    button_wrapper: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      flexDirection: "row",
    },
  });

export default GingerModal;
