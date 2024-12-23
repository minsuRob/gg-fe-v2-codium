import {
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
  Image,
} from "react-native";
import { MonoText } from "./styledText";
import { colors } from "../constants/Colors";
import { WithLocalSvg } from "react-native-svg";

const glassesSvg = require("../assets/icon/i_glasses.svg");

type TFeekChargeItem = {
  isSelected: boolean;
  ea: number;
  price: string;
  onPress: () => void;
};

const FeekChargeItem = ({
  isSelected,
  ea,
  price,
  onPress,
}: TFeekChargeItem) => {
  return (
    <TouchableOpacity
      style={[
        styles.item_wrapper,
        isSelected ? styles.item_wrapper_is_selected : null,
      ]}
      onPress={onPress}
    >
      <View style={styles.left}>
        {Platform.OS === "ios" || Platform.OS === "android" ? (
          <WithLocalSvg asset={glassesSvg} />
        ) : (
          <Image source={glassesSvg} />
        )}
        <MonoText style={{ fontSize: 14 }}>{ea}개</MonoText>
      </View>
      <View style={styles.right}>
        <MonoText style={{ fontSize: 14 }}>{price}원</MonoText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item_wrapper: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: 50,
    marginBottom: 8,
    alignItems: "center",
    backgroundColor: colors.grey900,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: colors.grey600,
    justifyContent: "space-between",
  },
  item_wrapper_is_selected: {
    borderColor: colors.green400,
  },
  left: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  right: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    marginRight: 10,
  },
});

export default FeekChargeItem;
