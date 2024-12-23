import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Platform,
  Pressable,
} from "react-native";
import { colors } from "../constants/Colors";
import { MonoText } from "./styledText";
import { FontAwesome } from "@expo/vector-icons";
import { WithLocalSvg } from "react-native-svg";
import Toast from "react-native-toast-message";
import { useState } from "react";
import GingerModal from "./gingerModal";

const icon: any = require("../assets/icon/i_no_check.svg");
const frameImage = require("../assets/images/ginger_card_frame.svg");
const defaultGingerman = require("../assets/gingerman/Modal_Ginger/g_bellboy.png");
type TGingermanCard = {
  isOpened?: boolean;
  pngImage?: { uri: string };
  pngImage2?: { uri: string };
  name?: string;
  date?: string;
  desc: string;
  onPress?: () => void;
};

const GingermanCard = ({
  name,
  pngImage = { uri: "" },
  pngImage2 = { uri: "" },
  date,
  isOpened,
  desc,
  onPress,
}: TGingermanCard) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const closeModal = () => {
    setModalVisible(false);
  };

  const showToast = () => {
    if (!isOpened) {
      Toast.show({
        type: "iconToast",
        text1: "당일 창문을 열어야 볼 수 있어요!",
        visibilityTime: 3000, // 토스트 메시지가 보이는 시간 (밀리초)
        autoHide: true,
        props: { icon },
        position: "bottom",
      });
    } else {
      setModalVisible(true);
    }
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  return (
    <TouchableOpacity
      onPress={() => {
        onPress && onPress();
        showToast();
      }}
    >
      <View style={styles.card_wrapper}>
        {isOpened ? (
          <>
            <View style={styles.frame_wrapper}>
              {Platform.OS === "ios" || Platform.OS === "android" ? (
                <WithLocalSvg asset={frameImage} />
              ) : (
                <Image source={frameImage} />
              )}
              <Image source={pngImage} style={styles.image} />
            </View>
            <MonoText style={styles.name}>{name}</MonoText>
            <MonoText style={styles.date}>{date}</MonoText>
          </>
        ) : (
          <>
            <View style={styles.frame_wrapper}>
              {Platform.OS === "ios" || Platform.OS === "android" ? (
                <WithLocalSvg asset={frameImage} />
              ) : (
                <Image source={frameImage} />
              )}
              <FontAwesome name="question" style={styles.question_mark} />
            </View>
            <MonoText style={styles.name}>{"??? 진저맨"}</MonoText>
            <MonoText style={styles.date}>{date}</MonoText>
          </>
        )}
        <GingerModal
          height={530}
          visible={isModalVisible}
          onClose={closeModal}
          name={String(name)}
          desc={desc}
          img={pngImage2}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card_wrapper: {
    width: 114,
    height: 176,
    backgroundColor: colors.grey900,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.grey700,
    alignItems: "flex-start",
    padding: 10,
    gap: 5,
    marginBottom: 10,
  },
  frame_wrapper: {
    position: "relative",
    alignSelf: "center",
  },

  image: {
    position: "absolute",
    top: 10,
    left: 10,
    width: 72,
    height: 95,
  },
  question_mark: {
    position: "absolute",
    fontSize: 100,
    top: 5,
    left: 12,
    color: colors.grey700,
  },

  name: {
    fontSize: 12,
    marginTop: 5,
    color: colors.Whiteyello,
  },
  date: {
    color: colors.green500,
    fontSize: 12,
  },
});

export default GingermanCard;
