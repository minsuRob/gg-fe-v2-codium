import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { BottomSheet } from "react-native-btr";
import { Image } from "react-native-svg";
import { colors } from "../constants/Colors";
import CenterModal from "./centerModal";
import { MonoText } from "./styledText";
import { SvgImg } from "./svgImg";
import { Link, router } from "expo-router";
const icon = require("../assets/icon/i_incognito.svg");
const letter = require("../assets/icon/i_letter.svg");
const iconGlassesQuestionMark = require("../assets/icon/i_history_edu_big.svg");

const BottomModal = ({ height, visible, onClose, id, callback }: any) => {
  const toggleBottomNavigationView = () => {
    onClose(); // 부모 컴포넌트에 닫기 이벤트를 전달
  };
  const [centerModalVisible, setCenterModalVisible] = useState(false);

  const closeCenterModal = () => {
    setCenterModalVisible(false);
  };

  const onClickModal = (text: string) => {
    switch (text) {
      case "답장하기":
        router.push("/answer");
        onClose();
        break;
      case "엿보기":
        setCenterModalVisible(true);
        break;
      default:
        return;
    }
  };

  return (
    <BottomSheet
      visible={visible}
      onBackButtonPress={toggleBottomNavigationView}
      onBackdropPress={toggleBottomNavigationView}
    >
      <View style={styles(height).bottomNavigationView}>
        <TouchableOpacity onPress={callback}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <SvgImg style={{ width: 24 }} url={icon} />
            <MonoText
              style={{
                color: colors.Whiteyello,
                fontSize: 16,
                marginLeft: 15,
              }}
            >
              내 빌리지에서 삭제
            </MonoText>
          </View>
        </TouchableOpacity>
        <Link href={`/letter/${id}`}>
          <TouchableOpacity onPress={onClose}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginTop: 8,
              }}
            >
              <SvgImg style={{ width: 27 }} url={letter} />
              <MonoText
                style={{
                  color: colors.Whiteyello,
                  fontSize: 16,
                  marginLeft: 15,
                }}
              >
                편지 쓰기
              </MonoText>
            </View>
          </TouchableOpacity>
        </Link>
      </View>

      <CenterModal
        height={350}
        visible={centerModalVisible}
        onClose={closeCenterModal}
        title="엿보기를 요청하시겠어요?"
        desc="요청이 수락되면 발신인의 정체를 알 수 있지만
        상대방이 요청을 거절하더라도 엿보기는 소모돼요"
        sub="남은 엿보기 : 3개"
        btn_text="요청하기"
        img={iconGlassesQuestionMark}
      />

      {/* <CenterModal
        height={200}
        visible={centerModalVisible}
        onClose={closeCenterModal}
        title="엿보기가 부족해요!"
        desc="상대방의 정체를 알기 위해선
        엿보기 충전이 필요해요"
        btn_text="요청하기"
      /> */}
    </BottomSheet>
  );
};

const styles = (height: number) =>
  StyleSheet.create({
    bottomNavigationView: {
      backgroundColor: colors.grey800,
      width: "100%",
      height,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      paddingTop: 40,
      paddingBottom: 15,
      paddingLeft: 23,
      alignItems: "flex-start",
    },
  });

export default BottomModal;
