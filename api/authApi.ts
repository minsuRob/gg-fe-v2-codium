import axios from "axios";
import { AUTH_URL} from "./url";
import { Auth, KakaoAuth } from "./interface";
import { axiosConfig } from "./commonApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

axiosConfig();
export const authGoogle = async (props: Auth) => {
  try {
    const response = await axios.post(`${AUTH_URL}/google`, props);
    return response;
  } catch (e: any) {
    alert(e?.response?.data?.errorMessage);
  }
};

export const authKakao = async (props: KakaoAuth) => {
  try {
    const response = await axios.post(`${AUTH_URL}/kakao`, props);
    return response;
  } catch (e: any) {
    console.error(e);
    alert(e?.response?.data?.errorMessage);
  }
};

export const checkMemberCode = async (code: string) => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    const response = await axios.get(`${AUTH_URL}/member`, {
      params: {
        code,
      },
    });
    return response.data;
  } catch (err: any) {
    alert(err?.response?.data?.errorMessage);
  }
};
export const checkAuth = async () => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    const response = await axios.get(`${AUTH_URL}`);
    return response.data;
  } catch (err: any) {
    // alert(err?.response?.data?.errorMessage);
    console.log(err?.response?.data?.errorMessage);
  }
};
