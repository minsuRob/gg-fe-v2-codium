import axios from "axios";
import { AUTH_URL, HOTEL_URL } from "./url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NewHotel, NewLetter } from "./interface";
import { axiosConfig } from "./commonApi";

axiosConfig();

export const newHotel = async (props: NewHotel) => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    const response = await axios.post(`${AUTH_URL}/hotel`, props);
    return response.data;
  } catch (err: any) {
    alert(err?.response?.data?.errorMessage);
    window.location.href = `/hotel/1`;
  }
};

export const getHotel = async (id: string) => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    const response = await axios.get(`${HOTEL_URL}/${id}`);
    return response.data;
  } catch (err: any) {
    alert(err?.response?.data?.errorMessage);
    window.location.href = `/hotel/1`;
  }
};

export const updateHotel = async (props: any) => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    const response = await axios.patch(`${HOTEL_URL}/${props.id}`, {
      nickname: props?.nickname,
      description: props?.description,
      structColor: props?.structColor,
      bodyColor: props?.bodyColor,
      windowDecorator: props?.windowDecorator,
      gardenDecorator: props?.gardenDecorator,
      buildingDecorator: props?.buildingDecorator,
      background: props?.background,
    });
    return response.data;
  } catch (err: any) {
    alert(err?.response?.data?.errorMessage);
  }
};

export const openWindow = async (props: any) => {
  // console.log(props?.date);
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    const response = await axios.post(
      `${HOTEL_URL}/${props.id}/open/window?date=${props?.date}`
    );
    return response.data;
  } catch (err: any) {
    throw err;
  }
};




