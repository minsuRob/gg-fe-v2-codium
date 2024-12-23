import { StyleSheet, TouchableOpacity } from "react-native";
import { View } from "./themed";
import { useThemeColor } from "./themed";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { MonoText } from "./styledText";
import { colors } from "../constants/Colors";

const CreateHotelColorItem = ({ color, active }: any) => {
  return (
    <View
      style={[cstyles(color).color, active === color && cstyles(color).active]}
    ></View>
  );
};

const cstyles = (color: string) =>
  StyleSheet.create({
    color: {
      width: 55,
      height: 55,
      borderRadius: 12,
      borderStyle: "solid",
      borderColor: "#C6C6C7",
      borderWidth: 1.53509,
      backgroundColor: color,
      marginTop: 16,
    },
    active: {
      borderWidth: 4,
      borderColor: colors.grey100,
    },
  });

export default CreateHotelColorItem;
