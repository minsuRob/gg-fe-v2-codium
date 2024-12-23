import * as React from "react";
import {
  View,
  useWindowDimensions,
  StyleSheet,
  Image,
  Touchable,
  Text,
  TouchableOpacity,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Header from "../../components/appHeader";
import { MonoText } from "../../components/styledText";
import VillageHeader from "../../components/villageHeader";
import LoginModal from "../../components/Modal/loginModal";
import { useEffect, useState } from "react";
import { Link, router, useNavigation, useSegments } from "expo-router";
import { useQuery } from "react-query";
import { deleteVillage, myVillage } from "../../api/villageApi";
import CustomSmallHotel from "../../components/customSmallHotel";
import { colors } from "../../constants/Colors";
import { typography } from "../../constants/Typo";
import { SvgImg } from "../../components/svgImg";
import BottomModal from "../../components/bottomModal";
import Toast from "react-native-toast-message";
import CenterModal from "../../components/centerModal";
import { ScrollView } from "react-native-gesture-handler";
import { PngImg } from "../../components/pngImg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { AUTH_URL } from "../../api/url";
import ErrorModal from "../../components/Modal/errorModal";
import { ErrorMessageConverter } from "../../data/error-message-converter";
const more = require("../../assets/icon/i_delete_2.svg");
const bellboy = require("../../assets/gingerman/Modal_Ginger/g_bellboy.png");
const building = require("../../assets/images/building.png");

export default function Village() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const { data, status, error, refetch } = useQuery(
    "myVillage",
    async () => await myVillage(),
    {
      refetchOnWindowFocus: false,
      onError: (e) => {
        console.log(`useQuery error : ${e}`);
      },
    }
  );
  const [deleteModal, setDeleteModal] = useState(false);
  const [selected, setSelected] = useState("");
  const handelModal = (id: string) => {
    setDeleteModal(true);
    setSelected(id);
  };

  const [ErrorModalVisible, setErrorModalVisible] = useState<boolean>(false);
  const [errorTitle, setErrorTitle] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorButtonMessage, setErrorButtonMessage] = useState<string>("");
  const closeErrorModal = () => {
    setErrorModalVisible(false);
  };

  const [loginModalVisible, setLoginModalVisible] = useState<boolean>(false);
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

  const segments = useSegments();
  useEffect(() => {
    const isPath = segments[1] === "village";
    if (isPath) {
      checkLogin();
    }
  }, [segments]);

  const handelDeleteVillage = async () => {
    try {
      const res = await deleteVillage(String(selected));
      if (res?.success) {
        Toast.show({
          type: "iconToast",
          text1: "내 빌리지에서 삭제되었습니다.",
          position: "bottom",
        });
        setDeleteModal(false);
        refetch();
      }
    } catch (error: any) {
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
    }
  };

  return (
    <>
      <Header title="진저빌리지" disabledIcon={true} />

      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          padding: 5,
          backgroundColor: colors.greyblack,
          height: "100%",
        }}
      >
        <ScrollView style={{ paddingBottom: 70 }}>
          <View
            style={{
              borderRadius: 12,
              backgroundColor: colors.green50,
              padding: 16,
              paddingLeft: 12,
              paddingRight: 12,
              position: "relative",
              margin: 10,
            }}
          >
            <Text
              style={[
                typography.soyo,
                {
                  fontSize: 16,
                  color: colors.greyblack,
                  fontWeight: "bold",
                },
              ]}
            >
              빌리지에 넣고 빠르게 방문하세요
            </Text>
            <MonoText
              style={{ fontSize: 12, color: colors.grey500, marginTop: 7 }}
            >
              내 빌리지는 나만 볼 수 있어요!
            </MonoText>

            <PngImg
              url={building}
              style={{
                width: 100,
                height: 62,
                position: "absolute",
                right: 10,
                bottom: 0,
              }}
            />
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                marginTop: 15,
                marginLeft: 5,
              }}
            >
              {data?.villages?.map((village: any) => (
                <View style={{ marginBottom: 10 }} key={village.id}>
                  <TouchableOpacity
                    onPress={() =>
                      (window.location.href = `/hotel/${village.hotelId}`)
                    }
                  >
                    <CustomSmallHotel
                      wallColor={village.bodyColor}
                      structColor={village.structColor}
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      backgroundColor: colors.grey900,
                      borderWidth: 1,
                      borderColor: colors.grey700,
                      padding: 10,
                      borderBottomLeftRadius: 12,
                      borderBottomRightRadius: 12,
                      borderTopWidth: 0,
                    }}
                  >
                    <Text
                      style={[
                        typography.soyo,
                        {
                          color: colors.green500,
                          textAlign: "center",
                          marginLeft: 8,
                          fontWeight: "bold",
                          maxWidth: 120,
                        },
                      ]}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {village?.nickname}
                    </Text>
                    <SvgImg
                      url={more}
                      style={{ width: 24, height: 24 }}
                      onPress={() => handelModal(village?.hotelId)}
                    />
                  </View>
                </View>
              ))}

              {!data ||
                (data?.villages?.length < 1 && (
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      // padding: 50,
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Image
                      style={{ width: 200, height: 300 }}
                      source={bellboy}
                    />

                    <MonoText style={styles.text}>
                      내 빌리지에 친구를 추가해보세요!
                    </MonoText>
                  </View>
                ))}
            </View>
          </View>
        </ScrollView>
        <CenterModal
          onClose={() => setDeleteModal(false)}
          height={180}
          visible={deleteModal}
          title="내 빌리지에서 삭제할까요?"
          desc="상대방은 삭제된 사실을 알 수 없어요!"
          btn_text="삭제하기"
          callback={handelDeleteVillage}
        />
        <LoginModal
          height={300}
          visible={loginModalVisible}
          onClose={closeLoginModal}
          name="로그인"
          desc=""
          closeDisable={true}
        />

        <ErrorModal
          height={200}
          visible={ErrorModalVisible}
          onClose={closeErrorModal}
          name={errorTitle}
          desc={errorMessage}
          buttonMessage={errorButtonMessage}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  info: {
    padding: 20,
    backgroundColor: colors.green50,
    textAlign: "center",
    alignItems: "center",
    marginTop: 30,
    borderRadius: 10,
    lineHeight: 23,
  },
  title: {
    fontSize: 18,
    backgroundColor: colors.greyblack,
    padding: 4,
  },

  text: {
    color: colors.Whiteyello,
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});
