import { StyleSheet, TouchableOpacity } from "react-native";
import { View } from "./themed";
import { colors } from "../constants/Colors";
import { SvgImg } from "./svgImg";

const windowDeco01 = require(`../assets/decorations/windowDeco01.svg`);
const windowDeco02 = require(`../assets/decorations/windowDeco02.svg`);

const createHotelDecoV2 = ({ url, active }: any) => {
  const windowDeco: any = {
    windowDeco01: windowDeco01,
    windowDeco02: windowDeco02,
  };

  return (
    <View style={[styles.color, active === url && styles.active]}>
      <SvgImg
        url={windowDeco[url]}
        width={50}
        height={70}
        style={{
          width: 50,
          height: 70,
          zIndex: 4,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  color: {
    width: 151,
    height: 88,
    borderRadius: 12,
    backgroundColor: colors.grey900,
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    borderWidth: 2,
    borderColor: colors.green400,
  },
});

export default createHotelDecoV2;
