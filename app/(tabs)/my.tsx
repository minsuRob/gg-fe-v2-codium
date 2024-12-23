import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Platform,
  Image,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../../constants/Colors";
import { WithLocalSvg } from "react-native-svg";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRecoilState, useSetRecoilState } from "recoil";
import { hotelIdState, userCodeState } from "../../atom/letterAtom";
import { router, useSegments } from "expo-router";
import LoginModal from "../../components/Modal/\bloginModal";
import KakaoAdFit_relative from "../../advertisement/KakaoAdFit_relative";
import KeyModal from "../../components/Modal/keyModal";
import PeekModal from "../../components/Modal/peekModal";
import { SvgImg } from "../../components/svgImg";
import { useQuery } from "react-query";
import { checkAuth } from "../../api/authApi";
import { AUTH_URL } from "../../api/url";
import Toast from "react-native-toast-message";
import KakaoAdFit from "../../advertisement/KakaoAdFit";
import { ErrorMessageConverter } from "../../data/error-message-converter";
import ErrorModal from "../../components/Modal/errorModal";

// Translations
import { useTranslation } from "react-i18next";
import "../../translation/i18n";

const keySvg = require("../../assets/icon/i_key.svg");
const glassesSvg = require("../../assets/icon/i_glasses_question_mark.svg");
const pencilSvg = require("../../assets/icon/i_pencil.svg");
const gearSvg = require("../../assets/icon/gear.svg");
const questionCircleSvg = require("../../assets/icon/i_question_circle.svg");
const copySvg = require("../../assets/icon/i_copy.svg");
const hotelModifySvg = require("../../assets/icon/i_hotel_modify.svg");
const mycardSvg = require("../../assets/icon/i_mycard.svg");
const feek_blur = require("../../assets/images/feekBlurMy.svg");
const feek_blur_text = require("../../assets/images/feekBlurMyText.svg");
const icon: any = require("../../assets/icon/i_check_green.svg");
interface User {
  nickname: string;
  code: string;
  membership: string;
  gender: "MAN" | "WOMAN" | null;
  birthDate: string | null;
  keyCount: number;
  feekCount: number;
}
interface Hotel {
  id: number;
  nickname: string;
  description: string;
  structColor: string;
  bodyColot: string; // 오타 수정: bodyColor로 변경
}

interface UserApiResponse {
  success: boolean;
  user: User;
  hotel: Hotel;
}
const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
export default function TabThreeScreen() {
  const segments = useSegments();
  useEffect(() => {
    const isPath = segments[1] === "my";
    if (isPath) {
      checkLogin();
    }
  }, [segments]);

  const { t, i18n } = useTranslation();

  // 영어 혹은 한글로 바꾸기 위한 함수
  const setLocale = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const [loginModalVisible, setLoginModalVisible] = useState<boolean>(false);

  const [keyModalVisible, setKeyModalVisible] = useState<boolean>(false);
  const [peekModalVisible, setPeekModalVisible] = useState<boolean>(false);

  const openKeyModal = () => {
    setKeyModalVisible(true);
  };
  const closeKeyModal = () => {
    setKeyModalVisible(false);
  };
  const openPeekModal = () => {
    setPeekModalVisible(true);
  };
  const closePeekModal = () => {
    setPeekModalVisible(false);
  };
  const closeLoginModal = () => {
    setLoginModalVisible(false);
  };

  const checkLogin = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      const response = await axios.get(`${AUTH_URL}`);
      return response.data;
    } catch (err: any) {
      // console.log(err?.response?.data?.errorMessage);
      setLoginModalVisible(true);
    }
  };

  const [userInfo, setUserInfo] = useRecoilState(userCodeState);
  const [ErrorModalVisible, setErrorModalVisible] = useState<boolean>(false);
  const [errorTitle, setErrorTitle] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorButtonMessage, setErrorButtonMessage] = useState<string>("");
  const closeErrorModal = () => {
    setErrorModalVisible(false);
  };

  const [hotel, setHotelinfo] = useState<any>(0);
  const setHotelId = useSetRecoilState(hotelIdState);
  useEffect(() => {
    checkLogin();
    const handleUserData = async () => {
      const accessToken = await AsyncStorage.getItem("accessToken");
      axios
        .get<UserApiResponse>(`${BASE_URL}/members/my`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          const { user, hotel } = response.data;
          setUserInfo({
            nickname: user.nickname,
            code: user.code,
            membership: user.membership,
            gender: user.gender,
            birthDate: user.birthDate,
            keyCount: user.keyCount,
            feekCount: user.feekCount,
          });

          setHotelinfo(hotel.id);
        })
        .catch((error: any) => {
          if (
            error.response.status === 400 ||
            error.response.status === 401 ||
            error.response.status === 403
          ) {
            const obj = ErrorMessageConverter.convert(
              error.response.data.errorCode
            );
            setErrorTitle(obj[0]);
            setErrorMessage(obj[1]);
            setErrorButtonMessage("닫기");
            setErrorModalVisible(true);
          }
        });
    };
    handleUserData();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.greyblack }]}>
      <View style={styles.header}>
        <Text style={styles.header_text}>{t("mypage.마이페이지")}</Text>
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.user_info_box}>
          <View style={styles.name_box}>
            <View style={styles.name_bow_wrapper}>
              <Text style={[styles.name, { color: colors.Whiteyello }]}>
                {userInfo.nickname}
              </Text>
              {Platform.OS === "ios" || Platform.OS === "android" ? (
                <TouchableOpacity
                  onPress={() => {
                    router.push("/changeUserInfo");
                  }}
                >
                  <WithLocalSvg asset={pencilSvg} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    router.push("/changeUserInfo");
                  }}
                >
                  <Image source={gearSvg} style={{ marginTop: 5 }} />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={styles.user_info}>
            <TouchableOpacity
              onPress={() => {
                navigator.clipboard.writeText(userInfo.code);
                Toast.show({
                  type: "iconToast",
                  text1: "초대코드가 복사되었습니다!",
                  position: "bottom",
                  props: { icon },
                });
              }}
            >
              <View>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    marginBottom: 2,
                  }}
                >
                  <Text
                    style={{
                      color: colors.grey100,
                      fontWeight: "400",
                      fontFamily: "NanumSquareNeo-Variable",
                      height: 20,
                    }}
                  >
                    {t("mypage.초대코드")}{" "}
                  </Text>
                  {Platform.OS === "ios" || Platform.OS === "android" ? (
                    <WithLocalSvg
                      asset={copySvg}
                      width={15}
                      height={15}
                      style={{ marginBottom: 5 }}
                    />
                  ) : (
                    <Image source={copySvg} style={{ marginBottom: 5 }} />
                  )}
                </View>
                <Text
                  style={{
                    color: colors.green600,
                    fontWeight: "700",
                    fontFamily: "NanumSquareNeo-Variable",
                  }}
                >
                  {userInfo.code}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.key_peek_container}>
          <TouchableOpacity
            style={[styles.key_peek_box, { backgroundColor: colors.grey900 }]}
            onPress={openKeyModal}
          >
            <View>
              <Text
                style={{
                  color: colors.Whiteyello,
                  fontWeight: "700",
                  marginBottom: 5,
                  fontFamily: "NanumSquareNeo-Variable",
                }}
              >
                {t("mypage.내 열쇠")} <FontAwesome name={"chevron-right"} />
              </Text>
              <Text
                style={{
                  color: colors.Whiteyello,
                  fontWeight: "400",
                  fontFamily: "NanumSquareNeo-Variable",
                }}
              >
                {userInfo.keyCount}
                {t("mypage.개")}
              </Text>
            </View>
            {Platform.OS === "ios" || Platform.OS === "android" ? (
              <WithLocalSvg asset={keySvg} width={70} height={70} />
            ) : (
              <Image source={keySvg} style={{ height: 70, width: 70 }} />
            )}
          </TouchableOpacity>

          {/* 엿보기 블러 버전 시작 */}
          <View
            style={[styles.key_peek_box, { backgroundColor: colors.grey900 }]}
          >
            <View>
              <Text
                style={{
                  color: colors.Whiteyello,
                  fontWeight: "700",
                  marginBottom: 5,
                  fontFamily: "NanumSquareNeo-Variable",
                }}
              >
                {t("mypage.내 엿보기")} <FontAwesome name={"chevron-right"} />
              </Text>
              <Text
                style={{
                  color: colors.Whiteyello,
                  fontWeight: "400",
                  fontFamily: "NanumSquareNeo-Variable",
                }}
              >
                0{t("mypage.개")}
              </Text>
            </View>
            {Platform.OS === "ios" || Platform.OS === "android" ? (
              <WithLocalSvg asset={glassesSvg} width={50} height={50} />
            ) : (
              <Image source={glassesSvg} style={styles.icon_style} />
            )}
            <SvgImg style={styles.key_peek_box_blur} url={feek_blur} />

            <SvgImg
              style={styles.key_peek_box_blur_text}
              url={feek_blur_text}
            />
          </View>
          {/* 엿보기 블러 버전 끝 */}
        </View>
        <View style={[styles.btn_group, { backgroundColor: colors.grey900 }]}>
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 60,
            }}
            onPress={() => {
              router.push(`/updateHotel/${hotel}`);
            }}
          >
            {Platform.OS === "ios" || Platform.OS === "android" ? (
              <WithLocalSvg asset={hotelModifySvg} />
            ) : (
              <Image source={hotelModifySvg} />
            )}
            <Text
              style={{
                color: colors.Whiteyello,
                fontWeight: "400",
                fontFamily: "NanumSquareNeo-Variable",
                marginTop: 10,
                fontSize: 12,
              }}
            >
              {t("mypage.호텔수정")}
            </Text>
          </TouchableOpacity>
          <View
            style={[
              styles.separtator_vertical_for_btn,
              { backgroundColor: colors.grey800 },
            ]}
          ></View>
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 60,
            }}
            onPress={() => {
              router.push(`/instaShared/${hotel}`);
            }}
          >
            {Platform.OS === "ios" || Platform.OS === "android" ? (
              <WithLocalSvg asset={mycardSvg} />
            ) : (
              <Image source={mycardSvg} />
            )}
            <Text
              style={{
                color: colors.Whiteyello,
                fontWeight: "400",
                marginTop: 10,
                fontSize: 12,
                fontFamily: "NanumSquareNeo-Variable",
              }}
            >
              {t("mypage.내 카드")}
            </Text>
          </TouchableOpacity>
          <View
            style={[
              styles.separtator_vertical_for_btn,
              { backgroundColor: colors.grey800 },
            ]}
          ></View>
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 60,
            }}
            onPress={() => {
              window.open(
                "https://probable-failing-2db.notion.site/FAQ-dcce714d115340728f740a8bd0591485?pvs=4"
              );
            }}
          >
            {Platform.OS === "ios" || Platform.OS === "android" ? (
              <WithLocalSvg asset={questionCircleSvg} />
            ) : (
              <Image source={questionCircleSvg} />
            )}
            <Text
              style={{
                color: colors.Whiteyello,
                fontWeight: "400",
                marginTop: 10,
                fontSize: 12,
                fontFamily: "NanumSquareNeo-Variable",
              }}
            >
              FAQ
            </Text>
          </TouchableOpacity>
        </View>
        {/* <KakaoAdFit_relative/> */}
      </View>
      <View style={styles.linksContainer}>
        <View>
          <TouchableOpacity
            onPress={() => {
              window.open(
                "https://probable-failing-2db.notion.site/4bcd9a04d98443489412e52fa6bf5b68?pvs=4"
              );
            }}
          >
            <Text style={[styles.links_text, { color: colors.grey300 }]}>
              {t("mypage.이용약관")}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              window.open(
                "https://probable-failing-2db.notion.site/72817f9a68c24c87ba4a42a16499d933?pvs=4"
              );
            }}
          >
            <Text style={[styles.links_text, { color: colors.grey300 }]}>
              {t("mypage.개인정보 처리방침")}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              router.push("/csCenter");
            }}
          >
            <Text style={[styles.links_text, { color: colors.grey300 }]}>
              {t("mypage.고객센터")}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              window.open("https://www.instagram.com/gingerhotel_official");
            }}
          >
            <Text style={[styles.links_text, { color: colors.grey300 }]}>
              <FontAwesome name="instagram" size={16} /> {t("mypage.진저호텔")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footer}>
        <View
          style={[
            styles.separator_horizontal,
            { backgroundColor: colors.grey900 },
          ]}
        ></View>
        <Text
          style={[styles.footer_text, { color: colors.grey500, marginTop: 8 }]}
        >
          {t("mypage.사업자등록번호")} : 202-58-00723 {t("mypage.대표")}
        </Text>
        <Text style={[styles.footer_text, { color: colors.grey500 }]}>
          {t("mypage.주소")} : {t("mypage.주소값")}
        </Text>
        <Text style={[styles.footer_text, { color: colors.grey500 }]}>
          {t("mypage.이메일")} : teamgingerkr@gmail.com
        </Text>
      </View>
      <LoginModal
        height={300}
        visible={loginModalVisible}
        onClose={closeLoginModal}
        name="로그인"
        desc=""
        closeDisable={true}
      />
      <KeyModal
        visible={keyModalVisible}
        onClose={closeKeyModal}
        code={userInfo?.code}
      />
      <ErrorModal
        height={200}
        visible={ErrorModalVisible}
        onClose={closeErrorModal}
        name={errorTitle}
        desc={errorMessage}
        buttonMessage={errorButtonMessage}
      />
      <PeekModal visible={peekModalVisible} onClose={closePeekModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 5,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    height: 44,
    paddingTop: 30,
  },
  header_text: {
    fontFamily: "SOYOMaple-Regular",
    fontSize: 18,
    color: colors.Whiteyello,
    width: 86,
  },

  profileContainer: {
    marginTop: 38,
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "column",
    gap: 12,
    justifyContent: "space-around",
  },

  user_info_box: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 34,
  },
  user_info: {
    width: "50%",
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row",
    paddingTop: 5,
  },
  name_box: {
    width: "50%",
  },
  name_bow_wrapper: {
    marginLeft: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  name: {
    fontSize: 28,
    fontWeight: "700",
    marginRight: 4,
    fontFamily: "SOYOMaple-Regular",
  },
  separator_vertical: {
    height: "100%",
    width: 2,
    marginHorizontal: 10,
  },
  separtator_vertical_for_btn: {
    height: "100%",
    width: 2,
  },

  key_peek_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 75,
  },
  key_peek_box: {
    width: "48%",
    borderRadius: 12,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  // 엿보기 버튼 블러 시작
  key_peek_box_blur: {
    width: "100%",
    position: "absolute",
  },
  key_peek_box_blur_text: {
    position: "absolute",
    alignItems: "center",
  },
  // 엿보기 버튼 블러 끝
  icon_style: {
    width: 50,
    height: 50,
  },

  btn_group: {
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 15,
    width: "100%",
  },

  ad_banner: {
    backgroundColor: "#D9D9D9",
    width: "100%",
    borderRadius: 12,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  linksContainer: {
    marginTop: 40,
    marginBottom: 100,
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "column",
    gap: 32,
    justifyContent: "space-around",
  },
  links_text: {
    fontSize: 14,
    fontFamily: "NanumSquareNeo-Variable",
  },

  footer: {
    flex: 1,
    backgroundColor: "transparent",
    marginBottom: 12,
  },
  separator_horizontal: {
    height: 1,
    width: "100%",
    marginVertical: 5,
  },
  footer_text: {
    marginBottom: 8,
    fontSize: 10,
    fontFamily: "NanumSquareNeo-Variable",
  },
});
