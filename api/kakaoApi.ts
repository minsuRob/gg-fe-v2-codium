import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { authKakao } from "./authApi";
import { UserApiResponse } from "./interface";
import { MEMBER_URL } from "./url";
import { isEmpty } from "../components/Modal/\bloginModal";

export const RestApiKey = process.env.EXPO_PUBLIC_KAKAO_WEB_API_KEY;
export const redirectUrl = process.env.EXPO_PUBLIC_KAKAO_OAUTH_REDIRECT_URL;

export const signInWithKakao = async (
  codeWeb: string,
  onSuccess: Function,
  onError: Function
) => {
  try {
    const { access_token } = await login({
      restApiKeyWeb: RestApiKey,
      redirectUrlWeb: redirectUrl,
      codeWeb,
    });

    const kakao_data: any = await getProfile(access_token);

    const _data = {
      id: kakao_data.id,
      name: kakao_data.properties.nickname,
      ci: access_token,
    };

    try {
      const response = await authKakao(_data);
      const { status, data }: any = response;
      AsyncStorage.setItem("accessToken", data?.accessToken);

      if (status === 200) {
        router.push("/create");
        onSuccess(data);
      } else if (status === 201) {
        const id: any = await AsyncStorage.getItem("kakaoUserId");

        if (!isEmpty(id as string)) {
          window.location.href = `/hotel/${id}`;
          AsyncStorage.removeItem("kakaoUserId");
        } else {
          axios
            .get<UserApiResponse>(`${MEMBER_URL}/my`, {
              headers: {
                Authorization: `Bearer ${data.accessToken}`,
              },
            })
            .then((response) => {
              const { hotel } = response.data;
              window.location.href = `/hotel/${hotel.id}`;
            });
        }
      }
    } catch (error) {
      onError(error);
    }
  } catch (error) {
    console.log(error, "error");
  }
};

export const signOutWithKakao = async (tokenWeb: string): Promise<any> => {
  if (!tokenWeb) {
    console.log("로그인할 수 없는 상태");
    return;
  }
  try {
    const message = await logout(tokenWeb);
    return message;
  } catch (err) {
    console.error("signOut error", err);
  }
};

function login(props?: any) {
  if (!props) {
    throw new Error("Web parameters are not provided");
  }

  const { restApiKeyWeb, redirectUrlWeb, codeWeb } = props;

  if (!restApiKeyWeb || !redirectUrlWeb || !codeWeb) {
    throw new Error("Web parameters are not provided");
  }

  const data: any = {
    grant_type: "authorization_code",
    client_id: restApiKeyWeb,
    redirect_uri: redirectUrlWeb,
    code: codeWeb,
  };

  const queryString = Object.keys(data)
    .map((k: any) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
    .join("&");

  return fetch("https://kauth.kakao.com/oauth/token", {
    method: "post",
    body: queryString,
    headers: {
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  }).then((res) => res.json());
}

function logout(tokenWeb?: string) {
  return fetch("https://kapi.kakao.com/v1/user/logout", {
    method: "post",
    headers: { Authorization: `Bearer ${tokenWeb}` },
  }).then((res) => res.json());
}

function getProfile(tokenWeb?: string) {
  return fetch("https://kapi.kakao.com/v2/user/me", {
    method: "get",
    headers: {
      Authorization: `Bearer ${tokenWeb}`,
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  }).then((res) => res.json());
}
