import React from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MonoText } from "./styledText";
import { WithLocalSvg } from "react-native-svg";
import { SvgImg } from "./svgImg";
import { colors } from "../constants/Colors";

import { router } from "expo-router";
import SnowfallContainer from "./snow/snowfallContainer";
import Snowfall from "react-snowfall";

let icon = require("../assets/icon/ic_alert_no.svg");
let i_info = require("../assets/icon/help_FILL0_wght400_GRAD0_opsz241.svg");
let i_key = require("../assets/icon/i_key.svg");
let i_glasses = require("../assets/icon/i_glasses.svg");
let i_plus = require("../assets/icon/i_plus.svg");
let feek_blur = require("../assets/images/feekBlur.svg");
const Header = ({ isOwner, keyCount, feekCount }: any) => {
  return (
    <SafeAreaView style={{ backgroundColor: "transparent" }}>
      <View style={{ backgroundColor: "transparent" }}>
        <View style={styles.wrapper}>
          <View style={styles.item}>
            {isOwner ? (
              <>
                <View style={styles.container_1}>
                  <SvgImg width={40} height={40} url={i_key} />
                  <Text style={styles.text}>{keyCount}</Text>
                </View>

                {/* 엿보기 개수 주석 처리 : 엿보기 기능 구현 전
                <View style={styles.container_2}>
                  <SvgImg width={40} height={40} url={i_glasses} />
                  <Text style={styles.text}>{feekCount}</Text>
                  <TouchableOpacity>
                    <SvgImg url={i_plus} />
                  </TouchableOpacity>
                </View>
                 */}
              </>
            ) : (
              <></>
            )}
          </View>
          <View style={styles.item2}>
            <SvgImg
              width={30}
              height={30}
              onPress={() => router.push("/guidePage")}
              url={i_info}
            />
            {/* 알림 아이콘 주석 처리 : 알림 기능 구현 전
            <SvgImg
              width={30}
              height={30}
              onPress={() => router.push("/push")}
              url={icon}
            />
            */}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container_1: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.grey700,
    borderRadius: 25,
    paddingRight: 30,
    height: 28,
    width: 70,
  },
  container_2: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.grey700,
    borderRadius: 25,
    paddingRight: 25,
    gap: 10,
    height: 28,
    width: 100,
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    width: "100%",
    backgroundColor: "transparent",
    marginLeft: 20,
    paddingRight: 40,
    zIndex: -100,
  },
  item: {
    fontFamily: "Pretendard-Regular",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  item2: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
  },
  text: {
    fontSize: 15,
    color: colors.Whiteyello,
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default Header;
