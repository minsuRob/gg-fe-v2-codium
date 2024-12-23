import { useState } from "react";
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
import { WithLocalSvg } from "react-native-svg";
import Buttons from "../buttons";
import Toast from "react-native-toast-message";

const closeIcon = require("../../assets/icon/i_close_line.svg");
const keySvg = require("../../assets/icon/i_key.svg");
const copyIcon = require("../../assets/icon/i_copy.svg");
const icon: any = require("../../assets/icon/i_check_green.svg");

type TProps = {
  onClose?: any;
  visible?: boolean;
  code?: string;
};

const KeyModal = ({ onClose, visible, code }: TProps) => {
  const close = () => {
    onClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.close_btn}>
            <Pressable onPress={close}>
              {Platform.OS === "ios" || Platform.OS === "android" ? (
                <WithLocalSvg asset={closeIcon} />
              ) : (
                <Image source={closeIcon} />
              )}
            </Pressable>
          </View>
          <View style={styles.contentWrapper}>
            <Text style={styles.subtitle}>친구 초대할 때마다</Text>
            <Text style={styles.title}>친구도 나도 열쇠 GET!</Text>
            {Platform.OS === "ios" || Platform.OS === "android" ? (
              <WithLocalSvg asset={keySvg} width={170} height={170} />
            ) : (
              <Image source={keySvg} style={{ width: 170, height: 170 }} />
            )}
            <View style={styles.textWrapper}>
              <Text style={styles.contentTitle}>Q. 열쇠는 어디에 쓰나요?</Text>
              <Text style={styles.contentText}>
                오늘의 편지 기준을 채우지 못해도
              </Text>
              <Text style={styles.contentText}>
                창문을 열고 싶을 때 사용할 수 있어요.
              </Text>
            </View>
            <View style={styles.textWrapper}>
              <Text style={styles.contentTitle}>Q. 열쇠는 어떻게 얻나요?</Text>
              <Text style={styles.contentText}>
                친구가 나의 초대 코드로 가입하면
              </Text>
              <Text style={styles.contentText}>
                친구와 나 모두 열쇠를 1개씩 받을 수 있어요.
              </Text>
            </View>
          </View>
          <View style={styles.codeWrapper}>
            <Text style={styles.codeDesc}>
              초대코드 : <Text style={styles.codeAccent}>{code}</Text>
            </Text>
          </View>
          <View style={styles.btnWrapper}>
            <Buttons
              title={"초대코드 복사하기"}
              color="green"
              icon={copyIcon}
              callback={() => {
                navigator.clipboard.writeText(code as string);
                close();
                {
                  Toast.show({
                    type: "iconToast",
                    text1: "초대코드가 복사되었습니다!",
                    position: "bottom",
                    props: { icon },
                  });
                }
              }}
            />
          </View>
          <Text style={styles.captionText}>
            ※단, 지난 날짜 창문에는 열쇠를 사용할 수 없어요.
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    height: 650,
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
  close_btn: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  contentWrapper: {
    marginTop: 20,
    width: "100%",
    height: 400,
    alignItems: "center",
    gap: 6,
  },
  subtitle: {
    color: colors.Whiteyello,
    fontWeight: "600",
    fontFamily: "NanumSquareNeo-Variable",
  },
  title: {
    fontFamily: "SOYOMaple-Regular",
    color: colors.Whiteyello,
    fontSize: 28,
    fontWeight: "600",
  },
  textWrapper: {
    height: 68,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 10,
  },

  contentTitle: {
    fontWeight: "600",
    color: colors.Whiteyello,
    fontFamily: "NanumSquareNeo-Variable",
    fontSize: 16,
  },
  contentText: {
    color: colors.grey500,
    fontSize: 12,
    fontFamily: "NanumSquareNeo-Variable",
  },
  codeWrapper: {
    marginVertical: 20,
  },
  codeDesc: {
    fontFamily: "NanumSquareNeo-Variable",
    color: colors.grey400,
  },
  codeAccent: {
    fontFamily: "NanumSquareNeo-Variable",
    color: colors.green300,
    fontWeight: "600",
  },
  btnWrapper: {
    width: 247,
    height: 60,
    marginTop: 20,
  },
  captionText: {
    fontFamily: "NanumSquareNeo-Variable",
    color: colors.grey500,
    fontSize: 10,
    marginTop: 10,
  },
});

export default KeyModal;
