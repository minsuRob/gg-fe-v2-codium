import {
  View,
  SafeAreaView,
  Text,
  Platform,
  Image,
  ScrollView,
} from "react-native";
import { WithLocalSvg } from "react-native-svg";
import { StyleSheet } from "react-native";
import { colors } from "../constants/Colors";
import { SvgImg } from "../components/svgImg";
import { router, useNavigation } from "expo-router";
import { useEffect } from "react";

const closeIcon = require("../assets/icon/i_close_line.svg");
const bottomLogo = require("../assets/images/logo_info.svg");

const GuidePage = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <SafeAreaView style={styles.header}>
          <SvgImg
            width={30}
            height={30}
            url={closeIcon}
            onPress={() => {
              router.back();
            }}
          />
        </SafeAreaView>
        <View style={styles.title_box}>
          <Text style={styles.title_text}>
            진저호텔 <Text style={styles.accent_text}>이용가이드</Text>
          </Text>
          <Text style={styles.subtitle_text}>
            더 다양한 기능으로
            <Text style={styles.accent_text}> 새롭게 돌아온</Text> 진저호텔!
          </Text>
        </View>
        <View style={styles.seperator}></View>

        <View style={styles.content_box}>
          <Text style={styles.content_title}>
            <Text style={styles.text_tint_color}>어드벤트 캘린더</Text>란?
          </Text>
          <Text style={styles.content_text}>
            어드벤트 캘린더는 12월 1일부터 25일까지 크리스마스를 기다리며 하나씩
            선물을 열어보는 달력을 말해요! 영미권 문화에서 크리스마스와 연말에
            많이 사용해요. 진저호텔은 어드벤트 캘린더 컨셉을 가지고 있어요.
          </Text>
        </View>
        <View style={styles.content_box}>
          <Text style={styles.content_title}>
            진저호텔 <Text style={styles.text_tint_color}>이용방법</Text>
          </Text>
          <Text style={styles.content_text}>
            1. 내 호텔을 만들고 sns에 내 호텔 링크를 공유해요.{`\n`}
            2. 매일 정해진 개수(5개)의 편지를 받으면 창문을 열 수 있어요.{`\n`}
            3. 창문 안에는 친구들이 보내준 편지가 들어 있어요.
          </Text>
        </View>
        <View style={styles.content_box}>
          <Text style={styles.content_title}>유의사항</Text>
          <Text style={styles.content_text}>
            <Text style={styles.text_tint_color}>
              하루에 하나, 오늘 날짜가 적힌 창문
            </Text>
            만 열 수 있어요!
            <br />
            걱정마세요! 오늘 창문을 못 열었더라도 편지는 창문 안에 안전하게
            보관되어 크리스마스 당일이 되면 읽을 수 있으니까요.
          </Text>
        </View>
        <View style={styles.content_box}>
          <Text style={styles.content_title}>진저맨 앨범</Text>
          <Text style={styles.content_text}>
            진저호텔에 머물고 있는 25종 진저맨 카드를 모두 모아보세요!
            <br />
            창문을 열면 진저맨 카드가 자동으로 수집돼요.
          </Text>
        </View>
        <View style={styles.content_box}>
          <Text style={styles.content_title}>새로운 기능</Text>
          <Text style={styles.content_text}>
            • <Text style={styles.text_tint_color}>답장하기</Text>: 나에게
            편지를 써준 친구에게 답장을 보낼 수 있어요.{`\n`}•{" "}
            <Text style={styles.text_tint_color}>빌리지</Text>: 친구호텔을
            추가해놓으면 링크 없이도 언제든지 방문 가능해요.{`\n`}
            {/* TODO: 업데이트 준비중 주석처리
            2. <Text style={styles.text_tint_color}>엿보기</Text>: 나에게 편지를
            써준 친구가 누군지 물어볼 수 있어요.
            {`\n`}
            3. <Text style={styles.text_tint_color}>사진 첨부</Text>: 편지에
            사진을 넣어 함께 보낼 수 있어요.
            */}
          </Text>
        </View>
        <View style={styles.content_box}>
          <Text style={styles.content_title}>진저호텔을 만든 사람들</Text>
          <Text style={styles.content_text}>
            진저호텔은 기획자 1명, 디자이너 1명, 개발자 5명이 함께 만든
            크리스마스 시즌 서비스에요. 진저호텔 팀은 2022 멋쟁이사자처럼
            대학연합 해커톤 ‘단풍톤’에서 대상을 받았어요.
          </Text>
        </View>
        <View
          style={[styles.seperator, { marginTop: 33, marginBottom: 33 }]}
        ></View>
        {Platform.OS === "ios" || Platform.OS === "android" ? (
          <WithLocalSvg asset={bottomLogo} style={{ marginBottom: 33 }} />
        ) : (
          <Image source={bottomLogo} style={{ marginBottom: 33 }} />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 33,
    paddingLeft: 23,
    paddingRight: 23,
    paddingBottom: 23,
    backgroundColor: colors.greyblack,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 33,
  },
  title_box: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title_text: {
    fontFamily: "SOYOMaple-Regular",
    fontSize: 28,
    color: colors.Whiteyello,
    marginBottom: 10,
  },
  accent_text: {
    fontWeight: "600",
  },
  subtitle_text: {
    fontFamily: "NanumSquareNeo-Variable",
    color: colors.Whiteyello,
    fontSize: 14,
  },
  seperator: {
    width: "100%",
    height: 1,
    backgroundColor: colors.grey900,
    marginVertical: 40,
  },

  content_box: {
    marginBottom: 33,
  },

  content_title: {
    fontFamily: "SOYOMaple-Regular",
    fontSize: 22,
    fontWeight: "600",
    color: colors.Whiteyello,
    marginBottom: 10,
  },
  content_text: {
    color: colors.Whiteyello,
    fontFamily: "NanumSquareNeo-Variable",
    lineHeight: 23,
    fontSize: 12,
  },
  text_tint_color: {
    color: colors.green400,
  },
});

export default GuidePage;
