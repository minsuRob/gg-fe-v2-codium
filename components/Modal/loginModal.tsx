import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Pressable,
  Text,
  Image,
  Platform,
} from "react-native";
import { colors } from "../../constants/Colors";
import { MonoText } from "../styledText";
import { router, useLocalSearchParams } from "expo-router";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SocialButton from "../socialButton";
import axios from "axios";
import { useMutation } from "react-query";
import { authGoogle } from "../../api/authApi";
import { UserApiResponse } from "../../api/interface";
import { MEMBER_URL } from "../../api/url";

import { useRoute } from "@react-navigation/native";
import { signInWithKakao, RestApiKey, redirectUrl } from "../../api/kakaoApi";
import { WithLocalSvg } from "react-native-svg";

const kakaoLogo = require("../../assets/logos/kakao.png");
const googleLogo = require("../../assets/logos/google.png");
const closeIcon = require("../../assets/icon/i_close_line.svg");

// console.log(RestApiKey);
const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${RestApiKey}&redirect_uri=${redirectUrl}&response_type=code`;

WebBrowser.maybeCompleteAuthSession();


export function isEmpty(str: string) {
  if (
    typeof str == "undefined" ||
    str == null ||
    str == "" ||
    str == "undefined"
  )
    return true;
  else return false;
}

type Props = {
  onClose?: any;
  visible?: boolean;
  height?: number | any;
  name: string;
  desc: string;
  closeDisable : boolean;
};

const LoginModal = ({ height, visible, onClose, name, desc , closeDisable}: Props) => {
  const { id } = useLocalSearchParams();

  const [userInfo, setUserInfo] = React.useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId:
      "251638133705-q41nmhb0a21vrbj2vp5rmnn8n1bv2tjh.apps.googleusercontent.com",
    iosClientId:
      "251638133705-sp0utm65q7m50m68g788ftj9rpaa08fr.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    handleEffect();
  }, [response]);

  const route: any = useRoute();

  async function handleEffect() {
    const user = false;
    //const user = await getLocalUser();
    if (!user) {
      if (response?.type === "success") {
        googleAuth(response.authentication?.accessToken as string);
      }
    } else {
      setUserInfo(user);
    }
  }

  const mutation = useMutation(authGoogle, {
    onSuccess: (res : any) => {
      AsyncStorage.setItem("accessToken", res.data.accessToken);

      if (res.status == 200) {
        router.push("/create");
      } else if (res.status == 201) {
        if (!isEmpty(id as string)) {
          router.push(`/hotel/${id}`);
          location.reload();
        } else {
          // Todo : Need a Funcional code
          axios
            .get<UserApiResponse>(`${MEMBER_URL}/my`, {
              headers: {
                Authorization: `Bearer ${res.data.accessToken}`,
              },
            })
            .then((response) => {
              const { hotel } = response.data;
              router.push(`/hotel/${hotel.id}`);
              location.reload();
            });
        }
      }
    },
    onError: (data) => {
      console.log(data);
    },
  });

  const googleAuth = async (token: string) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      await mutation.mutateAsync({
        email: user.email,
        sub: user.id,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const setModalVisible = () => {
    promptAsync();
    onClose(); // 부모 컴포넌트에 닫기 이벤트를 전달
  };
  const close = () => {
    onClose();
  };

  useEffect(() => {
    if (route.params && route.params.code) {
      signInWithKakao(
        // id as string,
        route.params.code,
        (successData: any) => {
          // console.log(successData);
          // router.push("/create");
          //location.reload();
          // router.push(`/hotel/${id}`);
        },
        (error: any) => {
          // 처리 실패 시 로직
          console.error(error);
        }
      );
    }
  }, [route.params]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setModalVisible();
      }}
    >
      <View style={styles(height).centeredView}>
        <View style={styles(height).modalView}>
          <View style={styles(height).close_btn}>
          {closeDisable ? <></> : 
            <Pressable onPress={close}>
              {Platform.OS === "ios" || Platform.OS === "android" ? (
                <WithLocalSvg asset={closeIcon} />
              ) : (
                <Image source={closeIcon} />
              )}
            </Pressable>
          }
          </View>
          <Text style={[styles(height).modal_title]}>{name}</Text>
          <Text style={[styles(height).modal_desc]}>
            간편하게 가입하고 진저호텔을 시작하세요!
          </Text>
          <Text style={[styles(height).modal_desc]}>
            삼성/크롬 외부 브라우저 접속을 권장합니다.
          </Text>

          <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: colors.grey700,
              marginVertical: 15,
            }}
          ></View>
          <View style={[styles(height).kakao]}>
            <a
              href={kakaoUrl}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
                width: "100%",
              }}
              onClick={() => AsyncStorage.setItem("kakaoUserId", String(id))}
            >
              {Platform.OS === "ios" || Platform.OS === "android" ? (
                <WithLocalSvg asset={kakaoLogo} />
              ) : (
                <Image source={kakaoLogo} style={{ width: 35, height: 35 }} />
              )}
              <MonoText style={styles(height).kakao_text}>
                카카오 계정으로 로그인
              </MonoText>
            </a>
          </View>
          <View>
            <Pressable
              style={[styles(height).button, styles(height).google]}
              onPress={() => setModalVisible()}
            >
              {Platform.OS === "ios" || Platform.OS === "android" ? (
                <WithLocalSvg asset={googleLogo} />
              ) : (
                <Image source={googleLogo} style={{ width: 30, height: 30 }} />
              )}
              <MonoText
                style={[
                  styles(height).textStyle,
                  styles(height).textStyle_google,
                ]}
              >
                구글 계정으로 로그인
              </MonoText>
            </Pressable>
          </View>

        </View>
      </View>
    </Modal>
  );
};

const styles = (height: number) =>
  StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#0e0e0eb1",
    },
    modalView: {
      position: "relative",
      margin: 20,
      backgroundColor: colors.grey900,
      borderRadius: 10,
      width: 360,
      padding: 28,
      height,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
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
      borderRadius: 7,
      padding: 13,
      paddingLeft: 10,
      paddingRight: 10,
      elevation: 2,
      width: 300,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    google: {
      backgroundColor: "white",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      flex: 1,
    },
    textStyle_google: {
      color: colors.greyblack,
    },
    kakao_text: {
      color: colors.greyblack,
      fontWeight: "600",
      flex: 1,
      textAlign: "center",
    },
    modal_title: {
      fontSize: 16,
      textAlign: "center",
      color: colors.Whiteyello,
      fontWeight: "600",
    },
    modal_desc: {
      fontSize: 12,
      color: colors.grey500,
      textAlign: "center",
    },
    kakao: {
      backgroundColor: "#FDDC3F",
      borderRadius: 7,
      padding: 13,
      paddingLeft: 10,
      paddingRight: 10,
      elevation: 2,
      width: 300,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    close_btn: {
      position: "absolute",
      top: 10,
      right: 10,
    },
  });

export default LoginModal;
