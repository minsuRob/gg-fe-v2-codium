import axios from "axios";
import { User, UserApiResponse } from "./interface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MEMBER_URL } from "./url";

export const myDate = async () => {
  const accessToken = await AsyncStorage.getItem("accessToken");

  return await axios
    .get<UserApiResponse>(`${MEMBER_URL}/my`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const deleteUser = async () => {
  const accessToken = await AsyncStorage.getItem("accessToken");

  return await axios
    .delete<UserApiResponse>(`${MEMBER_URL}/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const updateUser = async (update: any) => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    const response = await axios.patch(`${MEMBER_URL}/me`, update);
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

