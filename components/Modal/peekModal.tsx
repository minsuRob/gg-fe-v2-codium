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

const closeIcon = require("../../assets/icon/i_close_line.svg");
const glassesSvg = require("../../assets/icon/i_glasses_question_mark.svg");

type TProps = {
  onClose?: any;
  visible?: boolean;
};

const PeekModal = ({ onClose, visible }: TProps) => {
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
            <Text style={styles.subtitle}>매일 창문 하나씩 열 때마다</Text>
            <Text style={styles.title}>엿보기 5개 GET!</Text>
            {Platform.OS === "ios" || Platform.OS === "android" ? (
              <WithLocalSvg asset={glassesSvg} width={150} height={150} />
            ) : (
              <Image source={glassesSvg} style={{ width: 130, height: 130 }} />
            )}
            <View style={styles.textWrapper}>
              <Text style={styles.contentTitle}>
                Q. 엿보기는 어디에 쓰나요?
              </Text>
              <Text style={styles.contentText}>상대방의 정체가 궁금할 때</Text>
              <Text style={styles.contentText}>
                편지당 1번씩 엿보기 요청을 보낼 수 있어요.
              </Text>
            </View>
            <View style={styles.textWrapper}>
              <Text style={styles.contentTitle}>
                Q. 엿보기는 어떻게 얻나요?
              </Text>
              <Text style={styles.contentText}>오늘 날짜 창문을 열면</Text>
              <Text style={styles.contentText}>
                엿보기 5개를 무료로 받을 수 있어요!
              </Text>
            </View>
          </View>
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
    height: 500,
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
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    height: "100%",
    marginTop: 30,
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
});

export default PeekModal;
