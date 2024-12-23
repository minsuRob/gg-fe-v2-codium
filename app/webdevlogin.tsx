import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, Image, View, Platform, Text, Button, Alert, TextInput } from "react-native";
// import { MonoText } from "../components/styledText";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { WithLocalSvg } from "react-native-svg";
import SocialButton from "../components/socialButton";

import axios from 'axios';

// import * as AppleAuthentication from "expo-apple-authentication";
import { ResponseType } from "expo-auth-session";
import { FieldValues, useForm } from "react-hook-form";
import { router } from "expo-router";
import LoginModal from "../components/Modal/\bloginModal";
import { MEMBER_URL } from "../api/url";
import { UserApiResponse } from "../api/interface";

//import { useRecoilValue, RecoilRoot, useSetRecoilState } from "recoil";
WebBrowser.maybeCompleteAuthSession();
const SVG = require("../assets/images/StartHotel.svg");
//const [userInfo, setUserInfo] = React.useState(null);

export default function Login({ navigation }: any) {
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: "251638133705-q41nmhb0a21vrbj2vp5rmnn8n1bv2tjh.apps.googleusercontent.com",
    iosClientId: "251638133705-sp0utm65q7m50m68g788ftj9rpaa08fr.apps.googleusercontent.com",
  });

  const [token, setToken] = React.useState("");
  const { setValue, register, control, handleSubmit } = useForm();

  React.useEffect(() => {
    register("socialId");
  }, [register]);

  const [oneBtnModalVisible, setOneBtnModalVisible] = React.useState<boolean>(false);
  const closeoneBtnModal = () => {
    setOneBtnModalVisible(false);
  };

  const handleLoginProd = async (data: FieldValues) => {
    //const url:string = isRelease ? "http://localhost:8080" : "https://gingerhotel-server.site"
    axios
      .post(`https://gingerhotel-server.site/auth/test`, {
        socialId: data.socialId,
        vendor: "NAVER",
      })
      .then((res) => {
        console.log(res);
        AsyncStorage.setItem('accessToken', res.data.accessToken);
        router.push('/hotelcreate')
      })
      .catch((err) => {
        console.log(err);
      });

  };

  const handleLoginTest = async (data: FieldValues) => {
    //const url:string = isRelease ? "http://localhost:8080" : "https://gingerhotel-server.site"
    axios
      .post(`http://localhost:8080/auth/test`, {
        socialId: data.socialId,
        vendor: "NAVER",
      })
      .then((res) => {
          //
          AsyncStorage.setItem("accessToken", res.data.accessToken);
          console.log(res.status);
          if (res.status == 200) {
            router.push("/create");
          } else if (res.status == 201) {
            // Todo : Need a Funcional code
            axios
              .get<UserApiResponse>(`${MEMBER_URL}/my`, {
                headers: {
                  Authorization: `Bearer ${res.data.accessToken}`,
                },
              })
              .then((response) => {
                const { hotel } = response.data;
                router.replace(`/`);
                router.replace(`/hotel/${hotel.id}`);
              });
          }
          //
      })
      .catch((err) => {
        console.log(err);
      });

  };


  React.useEffect(() => {
    handleEffect();
  }, [response, token]);

  async function handleEffect() {
    const user = false;
    //const user = await getLocalUser();
    console.log("user", user);
    if (!user) {
      if (response?.type === "success") {
        // setToken(response.authentication.accessToken);
        getUserInfo(response.authentication?.accessToken as string);
      }
    } else {
      //setUserInfo(user);
      console.log("loaded locally");
    }
  }

  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem("@user");
    if (!data) return null;
    return JSON.parse(data);
  };

  const getUserInfo = async (token:string) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      console.log(user);
      axios.post(`http://localhost:8080/auth/google`, {
        email: user.email,
        sub: user.id,
      })
      .then((res) => {
        console.log(res);
        AsyncStorage.setItem('accessToken', res.data.accessToken);
        console.log(res.data.accessToken);
        router.push('/create')
      })
      .catch((err) => {
        console.log(err);
      });
      
      //await AsyncStorage.setItem("@user", JSON.stringify(user));
      //setUserInfo(user);
    } catch (error) {
      // Add your own error handler here
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.desc}>진저호텔에서 보내는 25일간의 휴일</Text>
      <Text style={styles.title}>진저호텔</Text>
      {Platform.OS === "ios" || Platform.OS === "android" ? (
        <WithLocalSvg width={280} asset={SVG} />
      ) : (
        <Image source={SVG} style={styles.hotel_img} />
      )}

      <LoginModal
        height={300}
        visible={oneBtnModalVisible}
        onClose={closeoneBtnModal}
        name="로그인"
        desc=""
        closeDisable={false}
      />
      <View style={styles.social_btn_group}>
        <SocialButton name={"apple"} />
        <SocialButton name={"google"} />
        <SocialButton name={"kakao"} />
        <SocialButton name={"naver"} />
      </View>




        <Button
          title="Sign in with Google"
          disabled={!request}
          onPress={() => {
            setOneBtnModalVisible(true);
          }}
        />
        <View style={styles.card}>
          
          {/* <Text style={styles.text}>Email: {userInfo.email}</Text>
          <Text style={styles.text}>
            Verified: {userInfo.verified_email ? "yes" : "no"}
          </Text>
          <Text style={styles.text}>Name: {userInfo.name}</Text> */}
          {/* <Text style={styles.text}>{JSON.stringify(userInfo, null, 2)}</Text> */}
        </View>

      {/* <Button title="logout" onPress={() => handleLogout()} /> */}

      <TextInput
        placeholder="login test"
        onChangeText={(text) => setValue("socialId", text)}
      />
      <Button title="운영로그인 테스트" onPress={handleSubmit(handleLoginProd)} />
      <Button title="로컬로그인 테스트" onPress={handleSubmit(handleLoginTest)} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
    backgroundColor: "white",
    justifyContent: "center",
  },
  desc: { fontSize: 12, fontWeight: "400", color: "black" },
  title: { fontSize: 60, fontWeight: "500", color: "black" },
  hotel_img: {
    width: 300,
    height: 400,
    marginTop: 20,
  },
  social_btn_group: {
    flexDirection: "row",
    width: 300,
    justifyContent: "space-around",
  },
  social_btn: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  card: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 15,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
