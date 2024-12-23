import { View, StyleSheet, ScrollView } from "react-native";
import { colors } from "../constants/Colors";


const testcodepage = () => {
  return (
    <View style={styles.containter}>
      
    </View>
  );
};

const styles = StyleSheet.create({
  containter: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.green100,
    paddingVertical: 33,
    flex: 1,
  },

});

export default testcodepage;
