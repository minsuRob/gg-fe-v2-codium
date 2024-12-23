import React, { useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { colors } from "../constants/Colors";
import { structColors, wallColors } from "./customUserHotel";
import { MonoText } from "./styledText";
import { SvgImg } from "./svgImg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useRecoilState, useRecoilValue } from "recoil";
import { hotelIdState, windowDateState } from "../atom/letterAtom";
import { typography } from "../constants/Typo";
import { isEmpty } from "./Modal/\bloginModal";
const Hotel1 = require("../assets/images/Hotel1.svg");
const frontBg = require("../assets/images/front_bg.svg");
const building1 = require("../assets/decorations/buildingDeco01.svg");
const window_v1: any = require("../assets/images/window_v1.svg");
const window_v1_open: any = require("../assets/images/window_v1_open.svg");
const window_v1_rec: any = require("../assets/images/window_v1_rec.svg");
const window_v1_rec2: any = require("../assets/images/window_v1_rec2.svg");
const window_v1_rec_open: any = require("../assets/images/window_v1_rec1_open.svg");
const window_v1_rec2_open: any = require("../assets/images/window_v1_rec2_open.svg");
const window_v2: any = require("../assets/images/window_v2.svg");
const window_v2_rec: any = require("../assets/images/window_v2_rec.svg");
const window_v2_rec2: any = require("../assets/images/window_v2_rec2.svg");
const window_v2_rec_open: any = require("../assets/images/window_v2_rec1_open.svg");
const window_v2_rec2_open: any = require("../assets/images/window_v2_rec2_open.svg");
const window_v2_open: any = require("../assets/images/window_v2_open.svg");
const window_main: any = require("../assets/images/25.svg");
const window_main_open: any = require("../assets/images/window_main_open.svg");

const gardenDecoImg01 = require(`../assets/decorations/gardenDeco01.svg`);
const gardenDecoImg02 = require(`../assets/decorations/gardenDeco02.svg`);
const gardenDecoImg03 = require(`../assets/decorations/gardenDeco03.svg`);

const buildingDecoImg01 = require(`../assets/decorations/buildingDeco01.svg`);
const buildingDecoImg02 = require(`../assets/decorations/buildingDeco02.svg`);
const buildingDecoImg03 = require(`../assets/decorations/buildingDeco03.svg`);

const backgroundImg01 = require(`../assets/decorations/background01.svg`);
const backgroundImg02 = require(`../assets/decorations/background02.svg`);
const backgroundImg03 = require(`../assets/decorations/background03.svg`);
type Props = {
  onClose?: any;
  visible?: boolean;
  height?: number | any;
  desc: string;
};

export default function CustomCompleteUserHotel({
  wallColor,
  structColor,
  onPress,
  is_border,
  is_front_bg,
  onClose,
  isMy,
  window_v,
  window,
  gardenDecorator,
  buildingDecorator,
  background,
}: any) {
  const web = { top: 36, left: 50 };
  const app = { top: 38, left: 55 };
  const _web = { top: 36, left: 50 };
  const myHotelId = useRecoilValue(hotelIdState);
  const [isNotMineModal, setIsNotMineModal] = useState(false);
  const [letterCheck, setLetterCheck] = useRecoilState(windowDateState);
  
  const setModalVisible = () => {
    onClose();
  };
  const setCloseModal = () => {
    setIsNotMineModal(false);
  };
  const handleOwner = async (itemNo: number) => {
    const isLogin = await AsyncStorage.getItem("accessToken");
    if (isLogin) {

      if (isMy) {
        if (window[`2023-12-${itemNo.toString().padStart(2, '0')}`]?.isOpen) {
          setLetterCheck(itemNo);
          router.push(`/mailbox/${myHotelId}`);
        } else {

        }
      } else {
        setIsNotMineModal(true);
        // console.log(isNotMineModal);
      }
    } else {
      setIsNotMineModal(true);
    }
  };

  const windows = [
    {
      num: 1,
      date: "2023-12-01",
      width: 35,
      height: 45,
      top: 92,
      left: 83,
      font_top: 16,
      font_left: 14,
    },
    {
      num: 2,
      date: "2023-12-02",
      width: 35,
      height: 45,
      top: 92,
      left: 134,
      font_top: 16,
      font_left: 13,
    },
    {
      num: 3,
      date: "2023-12-03",
      width: 32,
      height: 44,
      top: 64,
      left: 214,
      font_top: 16,
      font_left: 12,
    },
    {
      num: 4,
      date: "2023-12-04",
      width: 35,
      height: 42,
      top: 92,
      left: 280,
      font_top: 16,
      font_left: 13,
    },
    {
      num: 5,
      date: "2023-12-05",
      width: 35,
      height: 42,
      top: 92,
      left: 330,
      font_top: 16,
      font_left: 13,
    },
    {
      num: 6,
      date: "2023-12-06",
      width: 38,
      height: 50,
      top: 161,
      left: 83,
      font_top: 18,
      font_left: 15,
    },
    {
      num: 7,
      date: "2023-12-07",
      width: 38,
      height: 50,
      top: 161,
      left: 134,
      font_top: 18,
      font_left: 16,
    },
    {
      num: 8,
      date: "2023-12-08",
      width: 35,
      height: 47,
      top: 156,
      left: 211,
      font_top: 17,
      font_left: 13,
    },
    {
      num: 9,
      date: "2023-12-09",
      width: 38,
      height: 50,
      top: 161,
      left: 285,
      font_top: 18,
      font_left: 15,
    },
    {
      num: 10,
      date: "2023-12-10",
      width: 38,
      height: 50,
      top: 161,
      left: 335,
      font_top: 18,
      font_left: 12,
    },
    {
      num: 11,
      date: "2023-12-11",
      width: 38,
      height: 50,
      top: 229,
      left: 83,
      font_top: 19,
      font_left: 13,
    },
    {
      num: 12,
      date: "2023-12-12",
      width: 38,
      height: 50,
      top: 229,
      left: 134,
      font_top: 19,
      font_left: 11,
    },
    {
      num: 13,
      date: "2023-12-13",
      width: 47,
      height: 45,
      top: 232,
      left: 206,
      font_top: 14,
      font_left: 16,
    },
    {
      num: 14,
      date: "2023-12-14",
      width: 38,
      height: 50,
      top: 229,
      left: 285,
      font_top: 19,
      font_left: 12,
    },
    {
      num: 15,
      date: "2023-12-15",
      width: 38,
      height: 50,
      top: 229,
      left: 335,
      font_top: 19,
      font_left: 12,
    },
    {
      num: 16,
      date: "2023-12-16",
      width: 38,
      height: 50,
      top: 296,
      left: 83,
      font_top: 19,
      font_left: 12,
    },
    {
      num: 17,
      date: "2023-12-17",
      width: 38,
      height: 50,
      top: 296,
      left: 134,
      font_top: 19,
      font_left: 12,
    },
    {
      num: 18,
      date: "2023-12-18",
      width: 47,
      height: 35,
      top: 282,
      left: 206,
      font_top: 11,
      font_left: 16,
    },
    {
      num: 19,
      date: "2023-12-19",
      width: 38,
      height: 50,
      top: 296,
      left: 285,
      font_top: 19,
      font_left: 12,
    },
    {
      num: 20,
      date: "2023-12-20",
      width: 38,
      height: 50,
      top: 296,
      left: 335,
      font_top: 19,
      font_left: 11,
    },
    {
      num: 21,
      date: "2023-12-21",
      width: 40,
      height: 53,
      top: 366,
      left: 83,
      font_top: 21,
      font_left: 13,
    },
    {
      num: 22,
      date: "2023-12-22",
      width: 40,
      height: 53,
      top: 366,
      left: 134,
      font_top: 21,
      font_left: 12,
    },
    {
      num: 23,
      date: "2023-12-23",
      width: 40,
      height: 53,
      top: 366,
      left: 285,
      font_top: 21,
      font_left: 12,
    },
    {
      num: 24,
      date: "2023-12-24",
      width: 40,
      height: 53,
      top: 366,
      left: 335,
      font_top: 21,
      font_left: 12,
    },
    {
      num: 25,
      date: "2023-12-25",
      top: 380,
      left: 218,
      font_top: 18,
      font_left: 12,
    },
  ];

  const window_design: any = {
    windowDeco01: {
      default: window_v1,
      open: window_v1_open,
      rec: window_v1_rec,
      rec_open: window_v1_rec_open,
      rec2: window_v1_rec2,
      rec2_open: window_v1_rec2_open,
      main: window_main,
      mainOpen: window_main_open,
    },
    windowDeco02: {
      default: window_v2,
      open: window_v2_open,
      rec: window_v2_rec,
      rec_open: window_v2_rec_open,
      rec2: window_v2_rec2,
      rec2_open: window_v2_rec2_open,
      main: window_main,
      mainOpen: window_main_open,
    },
  };
  const gardenDeco: any = {
    gardenDeco01: gardenDecoImg01,
    gardenDeco02: gardenDecoImg02,
    gardenDeco03: gardenDecoImg03,
  };

  const buildingDeco: any = {
    buildingDeco01: buildingDecoImg01,
    buildingDeco02: buildingDecoImg02,
    buildingDeco03: buildingDecoImg03,
  };

  const backgroundDeco: any = {
    background01: backgroundImg01,
    background02: backgroundImg02,
    background03: backgroundImg03,
  };

  return (
    <>
      <View
        style={[
          styles.img_wrapper,
          is_border && {
            borderWidth: 0.3,
            borderColor: colors.grey500,
          },
        ]}
      >
        <SvgImg
          url={Hotel1}
          width={375}
          height={400}
          style={{
            width: 435,
            height: 480,
            marginTop: 20,
            zIndex: 3,
          }}
        />
      </View>
      <View
        style={[
          {
            position: "absolute",
            zIndex: 1,
          },
          Platform.OS === "ios" || Platform.OS === "android" ? app : _web,
        ]}
      >
        <Svg width={407} height={547} viewBox="0 0 365 480" fill="none">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M309.7 101.8H321.7V93.2L284.8 39.9H250.2V7.7H255.5C256.1 7.7 256.5 7.3 256.5 6.7V1C256.5 0.4 256.1 0 255.5 0H225.6C225 0 224.6 0.4 224.6 1V6.7C224.6 7.3 225 7.7 225.6 7.7H230.9V39.9H185V24.3L160.9 0.3L136.8 24.3V39.8H37L0 93.2V101.8H13V152.7V154.6H5.6C4.5 154.6 3.6 155.5 3.6 156.6V160.6C3.6 161.7 4.5 162.6 5.6 162.6H13.1V215.6H5.6C4.5 215.6 3.6 216.5 3.6 217.6V221.6C3.6 222.7 4.5 223.6 5.6 223.6H13.1V275.6H5.6C4.5 275.6 3.6 276.5 3.6 277.6V281.6C3.6 282.7 4.5 283.6 5.6 283.6H13.1V364.8H160.9H308.6V283.6H317.3C318.4 283.6 319.3 282.7 319.3 281.6V277.6C319.3 276.5 318.4 275.6 317.3 275.6H308.6V223.6H317.3C318.4 223.6 319.3 222.7 319.3 221.6V217.6C319.3 216.5 318.4 215.6 317.3 215.6H308.6V162.6H317.3C318.4 162.6 319.3 161.7 319.3 160.6V156.6C319.3 155.5 318.4 154.6 317.3 154.6H308.6V152.7L309.7 101.8Z"
            // RGB2 Color
            fill={wallColors[wallColor].color1}
          />
          <Path
            d="M308.6 283.6H317.3C317.7 283.6 318.1 283.5 318.4 283.3L318.9 276.3C318.5 275.9 318 275.6 317.4 275.6H308.6V223.6H317.3C318.4 223.6 319.3 222.7 319.3 221.6V217.6C319.3 216.5 318.4 215.6 317.3 215.6H308.6V162.6H317.3C318.4 162.6 319.3 161.7 319.3 160.6V156.6C319.3 155.5 318.4 154.6 317.3 154.6H308.6V152.7L309.7 101.8H321.7V93.2L284.8 39.9H250.2V7.7H255.5C256.1 7.7 256.5 7.3 256.5 6.7V1C256.5 0.4 256.1 0 255.5 0H225.6C225 0 224.6 0.4 224.6 1V6.7C224.6 7.3 225 7.7 225.6 7.7H230.9V39.9H185H184V67.5C184 67.5 180.9 63.6 171.6 61.3C162.3 59 160.9 58.8 160.9 58.8C160.9 58.8 169.3 66.2 169.6 76C170 85.9 169.2 91.7 169.2 91.7L169.9 94.5L182.5 97.1V149L185.6 153.1V245H176.6V260.7L172 272.1V335.3H183.4V342.1H187.1V350.2H192.1V358.5H198.7V364.7H308.7V283.6H308.6Z"
            // RGB1 Color
            fill={wallColors[wallColor].color2}
          />
          <Path
            d="M0 93.2V101.8H13V152.7V154.6H5.6C4.5 154.6 3.6 155.5 3.6 156.6V160.6C3.6 161.7 4.5 162.6 5.6 162.6H13.1V215.6H5.6C4.5 215.6 3.6 216.5 3.6 217.6V221.6C3.6 222.7 4.5 223.6 5.6 223.6H13.1V275.6H5.6C4.5 275.6 3.6 276.5 3.6 277.6V281.6C3.6 282.7 4.5 283.6 5.6 283.6H13.1V364.8H120.6V359.9H127.6V350.3H133.8V342.9H138.4V335.2V282.2L148.7 271.9L141.5 259.3V244.5H134.9V146.6H138.6V97.1L136.7 91.4C136.7 91.4 135.5 77.6 142.2 69.2C145.3 65.3 148.7 62.8 151.6 61.2C145.2 63.7 136.3 67.1 136.3 67.1L136.1 39.9H37L0 93.2Z"
            // RGB3 Color
            fill={wallColors[wallColor].color3}
          />
        </Svg>
      </View>
      <View
        style={[
          { position: "absolute", zIndex: 2 },
          Platform.OS === "ios" || Platform.OS === "android" ? app : web,
        ]}
      >
        <Svg width={407} height={547} viewBox="0 0 365 480" fill="none">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M322 102.6V95.1L285.5 41.6H250V9H255.4C256 9 256.4 7.3 256.4 6.7V1C256.4 0.4 256 0 255.4 0H225C224.4 0 224 0.4 224 1V6.7C224 7.3 224.4 9.5 225 9.5H230.4V41.5H184.8V69C176.9 64.3 169.5 61.2 160.6 61V60.6C151.6 60.6 144 63.8 136 68.6V41.2H36.2002L0.000190735 94.7L0 103.3H12L12.0002 155.6H3.00019C1.90019 155.6 1.00019 156.5 1.00019 157.6V161.6C1.00019 162.7 1.90019 163.6 3.00019 163.6H12.0002V216.6H3.00019C1.90019 216.6 1.00019 217.5 1.00019 218.6V222.6C1.00019 223.7 1.90019 224.6 3.00019 224.6H12.0002V276.6H4.00019C2.90019 276.6 2.00019 277.5 2.00019 278.6V282.6C2.00019 283.7 2.90019 284.6 4.00019 284.6H12.0002V365.7H17.5002V365.2H122.9V347.7H127.9V332.7H137.9V336.7H159.8V337.1H182.6V333.1H192.7V348.1H198.1V365.2H301.8V366.1H309.2V284.2H317C318.1 284.2 319 283.3 319 282.2V278.2C319 277.1 318.1 276.2 317 276.2H309.2V224.2H317C318.1 224.2 319 223.3 319 222.2V218.2C319 217.1 318.1 216.2 317 216.2H309.2V163.2H317C318.1 163.2 319 162.3 319 161.2V157.2C319 156.1 318.1 155.2 317 155.2H309.2V102.6H322ZM140.1 170.2H160V170.6H180.8V209.1H140.1V170.2ZM121.4 341.2H17.6002V284.6H121.4V341.2ZM123 250.2H115L118 254.2H121.4V276.6H17.6002V224.6H123V250.2ZM123 216.6H17.6002V163.6H121.3L121.5 168.2L123 168.7V216.6ZM125 152.7L121 155.2V155.6H17.6002L17.6 103H125L125 152.7ZM135.3 331.2H128C127.5 331.2 127.1 330.8 127.1 330.3V324.1C127.1 323.6 127.5 323.2 128 323.2H135.3C135.8 323.2 136.2 323.6 136.2 324.1V330.3C136.2 330.8 135.8 331.2 135.3 331.2ZM135.3 322.2H128C127.5 322.2 127.1 321.8 127.1 321.3V315.1C127.1 314.6 127.5 314.2 128 314.2H135.3C135.8 314.2 136.2 314.6 136.2 315.1V321.3C136.2 321.8 135.8 322.2 135.3 322.2ZM135.3 313.2H128C127.5 313.2 127.1 312.8 127.1 312.3V306.1C127.1 305.6 127.5 305.2 128 305.2H135.3C135.8 305.2 136.2 305.6 136.2 306.1V312.3C136.2 312.8 135.8 313.2 135.3 313.2ZM135.3 304.2H128C127.5 304.2 127.1 303.8 127.1 303.3V297.1C127.1 296.6 127.5 296.2 128 296.2H135.3C135.8 296.2 136.2 296.6 136.2 297.1V303.3C136.2 303.8 135.8 304.2 135.3 304.2ZM135.3 295.2H128C127.5 295.2 127.1 294.8 127.1 294.3V290.1C127.1 289.6 127.5 289.2 128 289.2H135.3C135.8 289.2 136.2 289.6 136.2 290.1V294.3C136.2 294.8 135.8 295.2 135.3 295.2ZM137.6 281.6C136.6 283.2 136.4 284.8 136 286.1C135.9 286.5 136.2 288.1 135.7 288.1H127.7C127.1 288.1 127 286.8 127.1 286.3C127.2 282.9 127.5 281 128.7 278C128.9 277.4 129.5 276.9 130.1 277.2L138.8 280.7C139.2 280.8 137.9 281.1 137.6 281.6ZM143.9 274.6C142.2 275.9 141.4 276.8 140.2 278.3C139.9 278.7 140.3 279.3 139.9 279.1L130.5 274.5C130 274.2 130.5 273.2 130.7 272.7C131.8 270 135.6 267.6 136.9 266.8C137.4 266.5 140.1 264 140.4 264.5L145.8 273.3C146.1 273.7 144.4 274.3 143.9 274.6ZM159.1 269.2C159.1 269.8 158.7 270.2 158.1 270.2C154.5 270.3 151.4 271.3 148.7 272.6C148.2 272.9 148.5 272.2 148.3 271.7L144 264.6C143.7 264.1 143.3 262.8 143.8 262.5C148.5 259.6 152.4 257.5 158.3 257.4C158.9 257.4 159.1 259.4 159.1 258.6V269.2ZM140.1 250.2V214.6H180.8V250.6H160.7V250.2H140.1ZM171.7 271.9C169.2 270.6 166.2 269.2 162.9 269.1C162.3 269.1 161.8 269.7 161.8 269.1L162.3 258C162.3 257.4 162.2 257 162.7 257.1C168.3 257.3 174.4 259.6 178.8 262.5C179.2 262.8 178.7 263.4 178.8 263.3L172.8 273C172.7 273.4 172.2 272.2 171.7 271.9ZM179.1 277.4C178 276 176.6 275 175.1 273.8C174.7 273.5 174.2 273.7 174.5 273.2L180.4 265.1C180.7 264.6 181.7 265.1 182.1 265.5C185 268 187 269.2 188.8 272.7C189 273.2 188.9 273.7 188.4 274L180 278.8C179.5 279 179.4 277.8 179.1 277.4ZM182.3 279.8L189 275.9C189.5 275.6 190 276 190.4 276.4C191.9 278.1 193.6 281.5 193.7 284.8C193.7 285.4 193.4 288.3 192.9 288.3L185 288.2C184.6 288.2 184 288.7 183.9 288.3C183.4 287 183.3 282.9 182.4 281.2C182 280.7 181.8 280.1 182.3 279.8ZM192.1 331.2H184.5C184 331.2 183.6 330.8 183.6 330.3V324.2C183.6 323.7 184 323.3 184.5 323.3H192.1C192.6 323.3 193 323.7 193 324.2V330.3C193 330.8 192.6 331.2 192.1 331.2ZM192.1 322.2H184.5C184 322.2 183.6 321.8 183.6 321.3V315.2C183.6 314.7 184 314.3 184.5 314.3H192.1C192.6 314.3 193 314.7 193 315.2V321.3C193 321.8 192.6 322.2 192.1 322.2ZM192.1 313.2H184.5C184 313.2 183.6 312.8 183.6 312.3V306.2C183.6 305.7 184 305.3 184.5 305.3H192.1C192.6 305.3 193 305.7 193 306.2V312.3C193 312.8 192.6 313.2 192.1 313.2ZM192.1 304.2H184.5C184 304.2 183.6 303.8 183.6 303.3V297.2C183.6 296.7 184 296.3 184.5 296.3H192.1C192.6 296.3 193 296.7 193 297.2V303.3C193 303.8 192.6 304.2 192.1 304.2ZM193.6 294.2C193.6 294.8 193.2 295.2 192.6 295.2H183.6C183 295.2 182.6 294.8 183.3 294.2V290.2C182.6 289.6 183.1 289.2 183.6 289.2H192.6C193.2 289.2 193.6 289.6 193.6 290.2V294.2ZM302 341.2H198.5V284.2H302V341.2ZM302 276.2H198.5V254.6H203.1L206.1 250.6H198V224.2H302V276.2ZM302 216.2H198V169.1L199.5 168.6L199.7 163.2H302V216.2ZM302 155.2H199.4L196 153.1V102.6H302V155.2Z"
            fill={structColors[structColor].color2}
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M139.1 336.7V278.8L130.5 274.6C130 274.3 130.5 273.3 130.7 272.8C131.8 270.1 135.6 267.7 136.9 266.9C137.2 266.7 138.2 265.8 139.1 265.1V263.4L145.3 260.5V250.2H140.1V248.7H134.6V164.4H136.1V150.3H138.5L137.6 96L149.6 92.3C149.2 74.5 156.7 63 158.2 61C150.2 61.5 143.4 64.6 136.1 68.9V41.2H36.2L0 94.7V102.2H12V155.6H3C1.9 155.6 1 156.5 1 157.6V161.6C1 162.7 1.9 163.6 3 163.6H12V216.6H3C1.9 216.6 1 217.5 1 218.6V222.6C1 223.7 1.9 224.6 3 224.6H12V276.6H4C2.9 276.6 2 277.5 2 278.6V282.6C2 283.7 2.9 284.6 4 284.6H12V346.4H17.6H25.2V364.8H28.4V346.5H37.3V364.8H41.6V346.1H51V364.8H55.3V345.8H65.5V364.8H69.6V346.4H80V364.8H85V346H94.8V365.1H98.9V346H106.9V364.8H110.5V345.8H115.9V365.2H122.9V347.7H127.9V332.7H137.9V336.7H139.1ZM121.4 341.2H17.6V284.6H121.4V341.2ZM123 250.2H115L118 254.2H121.4V276.6H17.6V224.6H123V250.2ZM123 216.6H17.6V163.6H121.3L121.5 168.2L123 168.7V216.6ZM125 152.7L121 155.2V155.6H17.6V102.2H125V152.7ZM136.2 330.3C136.2 330.8 135.8 331.2 135.3 331.2H128C127.5 331.2 127.1 330.8 127.1 330.3V324.1C127.1 323.6 127.5 323.2 128 323.2H135.3C135.8 323.2 136.2 323.6 136.2 324.1V330.3ZM136.2 321.3C136.2 321.8 135.8 322.2 135.3 322.2H128C127.5 322.2 127.1 321.8 127.1 321.3V315.1C127.1 314.6 127.5 314.2 128 314.2H135.3C135.8 314.2 136.2 314.6 136.2 315.1V321.3ZM136.2 312.3C136.2 312.8 135.8 313.2 135.3 313.2H128C127.5 313.2 127.1 312.8 127.1 312.3V306.1C127.1 305.6 127.5 305.2 128 305.2H135.3C135.8 305.2 136.2 305.6 136.2 306.1V312.3ZM136.2 303.3C136.2 303.8 135.8 304.2 135.3 304.2H128C127.5 304.2 127.1 303.8 127.1 303.3V297.1C127.1 296.6 127.5 296.2 128 296.2H135.3C135.8 296.2 136.2 296.6 136.2 297.1V303.3ZM136.2 294.3C136.2 294.8 135.8 295.2 135.3 295.2H128C127.5 295.2 127.1 294.8 127.1 294.3V290.1C127.1 289.6 127.5 289.2 128 289.2H135.3C135.8 289.2 136.2 289.6 136.2 290.1V294.3ZM137.6 281.6C136.6 283.2 136.4 284.8 136 286.1C135.9 286.5 136.2 288.1 135.7 288.1H127.7C127.1 288.1 127 286.8 127.1 286.3C127.2 282.9 127.5 281 128.7 278C128.9 277.4 129.5 276.9 130.1 277.2L138.8 280.7C139.2 280.8 137.9 281.1 137.6 281.6Z"
            fill={structColors[structColor].color3}
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M250 41.6V8.90002H230.4V41.6H184.8V69.1C184.4 68.9 184.1 68.7 183.7 68.5V69.1L161.9 61.2C161.6 61.2 161.2 61.2 160.9 61.2C162.4 63.9 171.1 79.6 170.7 89.1L170.3 95.5L180.7 97.8V149H184.6V163.8L185.9 170.4V247.7H180.7V250.8H179V265.3C179 265.3 179.3 265.5 179.9 265.8L180.2 265.3C180.5 264.8 181.5 265.3 181.9 265.7C184.8 268.2 186.8 269.4 188.6 272.8C190.2 274.6 191.4 276.7 191.9 279C192.8 280.7 193.6 282.9 193.6 285C193.6 285.6 193.3 288.5 192.8 288.5H192.5C192.5 288.8 192.5 289.1 192.5 289.4C193.1 289.4 193.5 289.8 193.5 290.4V294.4C193.5 294.9 193.1 295.4 192.6 295.4C192.6 295.8 192.6 296.2 192.6 296.6C192.8 296.8 193 297 193 297.3V303.4C193 303.7 192.9 303.9 192.6 304.1C192.6 304.6 192.6 305 192.6 305.5C192.8 305.7 193 305.9 193 306.2V312.3C193 312.6 192.8 312.9 192.6 313.1C192.6 313.5 192.6 314 192.6 314.4C192.9 314.6 193 314.8 193 315.2V321.3C193 321.7 192.8 322 192.4 322.1C192.4 322.5 192.4 322.9 192.4 323.3C192.7 323.4 193 323.8 193 324.2V330.3C193 330.7 192.7 331.1 192.3 331.2C192.3 331.9 192.3 332.5 192.3 333.1H193V348.1H198.4V365.2H204V347.3H207.7V365.2H212.8V346H220.3V365.2H225.4V346.9H235V365.2H239.7C239.7 358.4 239.7 346.1 239.7 346.1H249.9V365.2H253.4V346.7H264.8V365.2H267.9V346.3H278.7C278.7 346.3 278.5 358 278.5 365.2H282.8V345.4H290.9V365.2H294.5V346.4H300.6V365.1H301.8V366H309.2V284.1H317C318.1 284.1 319 283.2 319 282.1V278.1C319 277 318.1 276.1 317 276.1H309.2V224.1H317C318.1 224.1 319 223.2 319 222.1V218.1C319 217 318.1 216.1 317 216.1H309.2V163.1H317C318.1 163.1 319 162.2 319 161.1V157.1C319 156 318.1 155.1 317 155.1H309.2V102.5H321.9V95L285.4 41.5H250V41.6ZM302 341.2H198.5V284.2H302V341.2ZM302 276.2H198.5V254.6H203.1L206.1 250.6H198V224.2H302V276.2ZM302 216.2H198V169.1L199.5 168.6L199.7 163.2H302V216.2ZM302 155.2H199.4L196 153.1V102.6H302V155.2Z"
            fill={structColors[structColor].color1}
          />
          <Path
            d="M132 30L160.5 2L188.5 30L185 32L160.5 6.5C152.5 14.8333 136.4 31.6 136 32C135.6 32.4 133.167 30.8333 132 30Z"
            fill={structColors[structColor].color2}
          />
        </Svg>
      </View>
      <View
        style={{
          zIndex: 5,
          position: "absolute",
        }}
      >
        <SvgImg
          url={buildingDeco[buildingDecorator]}
          style={{
            width: 103,
            height: 260,
            marginTop: 20,
            zIndex: 99,
            top: 84,
            left: 178,
            position: "absolute",
          }}
        />
      </View>
      <View
        style={{
          zIndex: 0,
          position: "absolute",
        }}
      >
        <SvgImg
          url={backgroundDeco[background]}
          style={{
            width: 643,
            height: 400,
            marginTop: 20,
            zIndex: 3,
            top: 0,
            left: -82,
            position: "absolute",
          }}
        />
      </View>
      <View
        style={{
          zIndex: 5,
          position: "absolute",
        }}
      >
        <SvgImg
          url={gardenDeco[gardenDecorator]}
          width={150}
          height={140}
          style={{
            width: 150,
            height: 140,
            marginTop: 20,
            zIndex: 5,
            top: 370,
            left: 24,
            position: "absolute",
          }}
        />
      </View>
      <View
        style={{
          zIndex: 3,
          position: "absolute",
        }}
      >
        <SvgImg
          url={frontBg}
          width={150}
          height={140}
          style={{
            width: 440,
            height: 150,
            marginTop: 20,
            zIndex: 5,
            top: 360,
            left: 10,
            position: "absolute",
          }}
        />
      </View>

      <View
        style={{
          zIndex: 5,
          position: "absolute",
        }}
      >
        {windows?.map((item) => (
          <TouchableOpacity
            key={item.num}
            onPress={() => {
              handleOwner(item.num);
            }}
          >
            <View
              key={item.num}
              style={{
                width: item.width,
                height: item.height,
                zIndex: 4,
                top: item.top,
                left: item.left,
                position: "absolute",
              }}
            >
              <SvgImg
                url={
                  item.num === 13
                    ? window[
                        `2023-12-${item.num < 10 ? "0" + item.num : item.num}`
                      ]?.isOpen
                      ? window_design[window_v].rec_open
                      : window_design[window_v].rec
                    : item.num === 18
                    ? window[
                        `2023-12-${item.num < 10 ? "0" + item.num : item.num}`
                      ]?.isOpen
                      ? window_design[window_v].rec2_open
                      : window_design[window_v].rec2
                    : item.num === 25
                    ? window[
                        `2023-12-${item.num < 10 ? "0" + item.num : item.num}`
                      ]?.isOpen
                      ? window_design[window_v].mainOpen
                      : window_design[window_v].main
                    : window[
                        `2023-12-${item.num < 10 ? "0" + item.num : item.num}`
                      ]?.isOpen
                    ? window_design[window_v].open
                    : window_design[window_v].default
                }
                style={{
                  width:
                    item.num === 25 &&
                    window[
                      `2023-12-${item.num < 10 ? "0" + item.num : item.num}`
                    ]?.isOpen
                      ? 50
                      : item.width,
                  height:
                    item.num === 25 &&
                    window[
                      `2023-12-${item.num < 10 ? "0" + item.num : item.num}`
                    ]?.isOpen
                      ? 72
                      : item.height,
                  top:
                    item.num === 25 &&
                    window[
                      `2023-12-${item.num < 10 ? "0" + item.num : item.num}`
                    ]?.isOpen
                      ? -32
                      : item.num === 25
                      ? 4
                      : 0,
                  left:
                    item.num === 25 &&
                    window[
                      `2023-12-${item.num < 10 ? "0" + item.num : item.num}`
                    ]?.isOpen
                      ? -14
                      : item.num === 25
                      ? 2
                      : 0,
                  zIndex: 4,
                  position: "absolute",
                }}
              />
              {!window[`2023-12-${item.num < 10 ? "0" + item.num : item.num}`]
                ?.isOpen &&
                item.num !== 25 && (
                  <MonoText
                    style={{
                      zIndex: 5,
                      top: item.font_top,
                      left: item.font_left,
                      textAlign: "center",
                      position: "absolute",
                      color: colors.Whiteyello,
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  >
                    {item.num}
                  </MonoText>
                )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
      {isNotMineModal && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={isNotMineModal}
          onRequestClose={() => {
            setModalVisible();
          }}
        >
          <Pressable
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              width: "100%",
              height: "100%",
            }}
            onPress={(e) => {
              e.stopPropagation();
              if (e.target === e.currentTarget) {
                setCloseModal();
              }
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <MonoText style={styles.modal_title}>
                  다른 사람의 호텔 창문은 볼 수 없어요
                </MonoText>
                <Text style={styles.modal_desc}>
                  {`내 호텔로 가려면\n‘내 호텔 가기’ 버튼을 눌러주세요!`}
                </Text>

                {/* {img && (
                  <Image source={img} style={{ width: 210, height: 230 }} />
                )} */}
                <View style={styles.button_wrapper}>
                  <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => {
                      setCloseModal();
                    }}
                  >
                    <MonoText style={styles.textStyle}>확인</MonoText>
                  </Pressable>
                </View>
              </View>
            </View>
          </Pressable>
        </Modal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  img_wrapper: {
    zIndex: 3,
    marginTop: 10,
    padding: 10,
    borderRadius: 12,
    marginLeft: 5,
    width: "98%",
    alignItems: "center",
    position: "relative",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: colors.grey900,
    borderRadius: 10,
    width: "84%",
    height: 206,
    paddingTop: 36,
    display: "flex",
    alignItems: "center",
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
  button: {
    marginTop: 24,
    borderRadius: 10,
    padding: 13,
    paddingLeft: 10,
    paddingRight: 10,
    elevation: 2,
    width: "100%",
  },
  buttonOpen: {
    backgroundColor: colors.green600,
    color: colors.Whiteyello,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  modal_title: {
    marginBottom: 16,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "700",
    fontFamily: "NanumSquare Neo OTF",
    color: colors.Whiteyello,
  },
  modal_desc: {
    marginTop: 10,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "400",
    fontFamily: "NanumSquare Neo OTF",
    color: colors.grey500,
  },
  button_wrapper: {
    width: 140,
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
  },
});
