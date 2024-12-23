import { StyleSheet } from "react-native";
import { View } from "./themed";
import { colors } from "../constants/Colors";
import { SvgImg } from "./svgImg";
import { useEffect, useState } from "react";
const buildingDeco01 = require(`../assets/images/buildingDeco01.svg`);
const buildingDeco02 = require(`../assets/images/buildingDeco02.svg`);
const buildingDeco03 = require(`../assets/images/buildingDeco03.svg`);

const gardenDeco01 = require(`../assets/decorations/gardenDeco01.svg`);
const gardenDeco02 = require(`../assets/decorations/gardenDeco02.svg`);
const gardenDeco03 = require(`../assets/decorations/gardenDeco03.svg`);

const background01 = require(`../assets/decorations/background01.svg`);
const background02 = require(`../assets/decorations/background02.svg`);
const background03 = require(`../assets/decorations/background03.svg`);

const CreateHotelDeco = ({ item, active, activeTitle }: any) => {
  const buildingDeco: any = {
    buildingDeco01: buildingDeco01,
    buildingDeco02: buildingDeco02,
    buildingDeco03: buildingDeco03,
  };

  const gardenDeco: any = {
    gardenDeco01: gardenDeco01,
    gardenDeco02: gardenDeco02,
    gardenDeco03: gardenDeco03,
  };

  const bg: any = {
    background01: background01,
    background02: background02,
    background03: background03,
  };

  const [status, setStatus] = useState("");

  useEffect(() => {
    switch (activeTitle) {
      case "건물장식":
        setStatus(buildingDeco[item]);
        break;
      case "마당장식":
        setStatus(gardenDeco[item]);
        break;
      case "뒷배경":
        setStatus(bg[item]);
      default:
        break;
    }
  }, [activeTitle, item]);

  return (
    <View style={[styles.color, active === item && styles.active]}>
      <SvgImg
        url={status}
        width={85}
        height={85}
        style={{
          width: 85,
          height: 85,
          zIndex: 4,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  color: {
    width: 100,
    height: 98,
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

export default CreateHotelDeco;
