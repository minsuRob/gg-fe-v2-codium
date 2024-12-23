import axios from "axios";
import { LETTERS_HOTEL_URL, LETTERS_URL } from "./url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCurrentDate } from "../data/data";
import { NewLetter } from "./interface";
import { axiosConfig } from "./commonApi";


export const newLetterData = async (id: any, day: string) => {
  try {
    const response = await axios.get(`${LETTERS_HOTEL_URL}/${id}?date=2023-12-${day.padStart(2, '0')}`);
    return response.data;
  } catch (e) {
    console.error(e);
    //throw e;
    return true; // Todo: Need to validate
  }
};

export const newLetter = async (props: NewLetter) => {
  try {
    const response = await axios.post(`${LETTERS_HOTEL_URL}/${props.hotelId}`, props);
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
export const letterDelete = async (letterId: number) => {
  try {
    const response = await axios.delete(`${LETTERS_URL}/${letterId}`);
    console.error(response)
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
export const letterBlock = async (letterId: number) => {
  try {
    const response = await axios.post(`${LETTERS_URL}/${letterId}/block`);
    console.error(response)
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
export const letterUnBlock = async (letterId: number) => {
  try {
    const response = await axios.post(`${LETTERS_URL}/${letterId}/unblock`);
    console.error(response)
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export const repliesLetterData = async (letterId: string | string[] | undefined) => {
  console.error(letterId)
  try {
    const response = await axios.get(`${LETTERS_URL}/${letterId}/replies?sort=ASC`);
    // console.log(response.data)
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
