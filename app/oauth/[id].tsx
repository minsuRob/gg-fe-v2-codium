import { useEffect } from "react";
import { signInWithKakao } from "../../api/kakaoApi";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Image, View } from "react-native";
import { MonoText } from "../../components/styledText";
import { typography } from "../../constants/Typo";
const bellboy = require("../../assets/gingerman/Modal_Ginger/g_bellboy.png");

export default function OAuth() {
  const navigation = useNavigation();
  const route: any = useRoute();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    const code = route.path.split("/")[2];

    if (code && code.indexOf("?") === -1) {
      signInWithKakao(
        code,
        (successData: any) => {
          // 처리 성공
        },
        (error: any) => {
          alert(error?.response?.data?.errorMessage);
          // 처리 실패
          location.href = "/hotel/1";
        }
      );
    } else if (route.params && route.params.code) {
      signInWithKakao(
        route.params.code,
        (successData: any) => {
          // 처리 성공
        },
        (error: any) => {
          alert(error?.response?.data?.errorMessage);
          // 처리 실패
          location.href = "/hotel/1";
        }
      );
    }
  }, [route.params]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <MonoText
        style={{
          fontFamily: typography.display1_basic.fontFamily,
        }}
      >
        이동 중 입니다 . . .
      </MonoText>
      <Image style={{ width: 300, height: 400 }} source={bellboy} />
    </View>
  );
}
