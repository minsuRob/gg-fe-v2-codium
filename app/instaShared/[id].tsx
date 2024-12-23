import { View, StyleSheet, Text, Image, Platform } from "react-native";
import { useState, useEffect } from "react";
import { WithLocalSvg } from "react-native-svg";
import { colors } from "../../constants/Colors";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import Header from "../../components/appHeader";
import { useRecoilState } from "recoil";
import { hotelIdState, userCodeState } from "../../atom/letterAtom";
import { SvgImg } from "../../components/svgImg";
import { PngImg } from "../../components/pngImg";
import { useQuery } from "react-query";
import { myDate } from "../../api/myApi";
import { getHotel } from "../../api/hotelApi";
import CustomUserHotel from "../../components/customUserHotel";
import CustomSmallHotel from "../../components/customSmallHotel";
import CustomMediumHotel from "../../components/customMediumHotel";

const hotelFrame = require("../../assets/images/frame_insta_shared.png");
const sharedLogo = require("../../assets/images/logo_insta_shared.svg");

const InstaShared = () => {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  const [userInfo, setUserInfo] = useRecoilState(userCodeState);
  const { data, status, error, refetch } = useQuery(
    "loadHotel",
    async () => await getHotel(id as string),
    {
      refetchOnWindowFocus: false,
      onError: (e) => {
        console.log(`useQuery error : ${e}`);
      },
    }
  );
  // console.log(data?.hotel);

  const [codeArray, setCodeArray] = useState<string[]>([
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
  ]);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    setCodeArray(userInfo.code.split(""));
  }, [userInfo]);

  return (
    <>
      <Header title="내 카드" />
      <View style={styles.container}>
        <View style={styles.content_wrapper}>
          <SvgImg url={sharedLogo} width={30} height={30} />

          <View style={styles.title_wrapper}>
            <Text style={styles.name_text}>
              <Text style={styles.from}>From </Text>
              {userInfo.nickname}
            </Text>
            <Text style={styles.title_text}>내 진저호텔에 놀러오세요!</Text>
          </View>
          <View style={styles.hotel_wrapper}>
            <View style={styles.hotel_frame}>
              <PngImg
                style={{
                  zIndex: 999,
                  width: 293,
                  height: 370,
                  left: 5,
                  position: "absolute",
                }}
                url={hotelFrame}
              />
              {/* <SvgImg
                style={{
                  zIndex: 1,
                  width: 293,
                  height: 370,
                  left: 5,
                  position: "absolute",
                }}
                url={hotelImage}
                width={30}
                height={30}
              /> */}

              <View>
                <CustomMediumHotel
                  wallColor={data?.hotel.bodyColor}
                  structColor={data?.hotel.structColor}
                  gardenDecorator={data?.hotel.gardenDecorator}
                  windowDecorator={data?.hotel.windowDecorator}
                  buildingDecorator={data?.hotel.buildingDecorator}
                  background={data?.hotel?.background}
                />
              </View>
            </View>
          </View>
          <View style={styles.code_info_wrapper}>
            <Text style={styles.code_text}>친구코드</Text>
            <View style={styles.code_wrapper}>
              {codeArray.map((item) => {
                return (
                  <View style={styles.code_box}>
                    <Text style={styles.code}>{item}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.greyblack,
  },
  content_wrapper: {
    backgroundColor: colors.grey900,
    borderRadius: 20,
    width: 350,
    height: 670,
    paddingVertical: 32,
    paddingHorizontal: 25,
    alignItems: "center",
  },
  title_wrapper: {
    width: "100%",
    alignItems: "center",
    marginTop: 4,
  },
  name_text: {
    color: colors.green300,
    fontFamily: "SOYOMaple-Regular",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
  },
  from: {
    fontSize: 12,
    marginTop: 20,
  },
  title_text: {
    fontFamily: "NanumSquareNeo-Variable",
    fontSize: 20,
    fontWeight: "bold",
    color: colors.Whiteyello,
  },

  hotel_wrapper: {
    marginVertical: 24,
    position: "relative",
    width: 300,
    height: 380,
  },
  hotel_frame: {
    position: "relative",
    zIndex: 2,
    marginRight: 10,
  },

  hotel_image: {
    position: "absolute",
    zIndex: 1,
    left: -10,
    right: 0,
    width: "100%",
  },
  code_info_wrapper: {
    width: 262,
  },
  code_text: {
    fontFamily: "NanumSquareNeo-Variable",
    fontSize: 20,
    fontWeight: "bold",
    color: colors.Whiteyello,
    marginBottom: 8,
  },
  code_wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  code_box: {
    width: 34,
    height: 40,
    backgroundColor: colors.grey800,
    borderRadius: 8,
    justifyContent: "center",
    alignContent: "center",
  },
  code: {
    fontFamily: "NanumSquareNeo-Variable",
    fontSize: 20,
    fontWeight: "bold",
    color: colors.green300,
    marginLeft: 10,
  },
  bottom_logo: {
    marginTop: 30,
  },
});

export default InstaShared;
