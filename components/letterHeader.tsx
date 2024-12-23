import React from "react";
import { View, SafeAreaView, TouchableOpacity } from "react-native";
import { MonoText } from "./styledText";
import { SvgImg } from "./svgImg";
import {
  MailBoxView,
  MailChoseContainer,
  MailChoseText,
  MailChoseView,
  MailInfoView,
  MailNumberText,
  MailTitleText,
  MailTitleView,
} from "../style/mailBoxStyled";
import { useRecoilState, useSetRecoilState } from "recoil";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";

const arrow = require("../assets/icon/i_left_arrow.svg");
const iconGlassesQuestionMark = require("../assets/icon/i_glasses_question_mark.svg");

const LetterHeader = ({ marginTop, isTitle = true }: any) => {
  const { t, i18n } = useTranslation();

  const replyGoBackHandler = () => {
    router.back();
  };
  return (
    <SafeAreaView style={{ width: "100%" }}>
      <MailBoxView>
        <SvgImg
          width={30}
          height={30}
          url={arrow}
          onPress={() => replyGoBackHandler()}
        ></SvgImg>
        <MailTitleView>
          <MailTitleText>{t("letter.편지 보내기")}</MailTitleText>
        </MailTitleView>
        {/* <TouchableOpacity>
            <SvgImg width={30} height={30} url={iconGlassesQuestionMark} />
          </TouchableOpacity> */}
        <View />
      </MailBoxView>
    </SafeAreaView>
  );
};

export default LetterHeader;
