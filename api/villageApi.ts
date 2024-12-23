import axios from "axios";
import { LETTERS_HOTEL_URL, LETTERS_URL, VILLAGE_URL } from "./url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCurrentDate } from "../data/data";
import { NewLetter } from "./interface";

export const addVillage = async (hotelId: string) => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    const response = await axios.post(`${VILLAGE_URL}/hotel/${hotelId}`);
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const myVillage = async () => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    const response = await axios.get(`${VILLAGE_URL}/my`);
    return response.data;
  } catch (err: any) {
    alert(err?.response?.data?.errorMessage);
  }
};

export const deleteVillage = async (hotelId: string) => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    const response = await axios.delete(`${VILLAGE_URL}/hotel/${hotelId}`);
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

