import React from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../constants/Colors";
import * as Progress from "react-native-progress";
import { Text } from "react-native-svg";
import { Bar, BarView, BarViewText } from "../style/progressBarStyled";
import { MonoText } from "./styledText";

function ProgressBar({ todayLetterCnt, goalCnt }: any) {
  return (
    <BarView>
      <BarViewText style={styles.BarViewText}>
        <MonoText style={styles.text}>
          {todayLetterCnt} / {goalCnt}
        </MonoText>
      </BarViewText>
      <Bar>
        <Progress.Bar
          style={styles.BarView}
          progress={todayLetterCnt / 5}
          width={null}
          height={20}
          color={"#FFB199"}
          borderRadius={10}
          borderColor="#1E1F23"
        />
      </Bar>
    </BarView>
  );
}

export default ProgressBar;

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontWeight: "600",
    fontFamily: "Quicksand-Variable",
    color: colors.Whiteyello,
    textShadowColor: colors.grey900,
    textShadowOffset: { width: 1, height: 1 },
  },
  BarView: {
    flexDirection: "column",
    justifyContent: "center",
  },
  BarViewText: {
    position: "absolute",
    zIndex: 1,
  },
});
