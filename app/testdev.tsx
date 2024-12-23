import * as React from "react";
import { View, useWindowDimensions, StyleSheet, Text } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { getHotel } from "../api/hotelApi";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HOTEL_URL } from "../api/url";

export default function testDev() {
  
      const getHotel = async (id: string) => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      const response = await axios.get(`${HOTEL_URL}/${id}`);
      console.log(response.data);
      return response.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  React.useEffect(()=>{
    const data = getHotel("1");
  }, 
  [])

  return (
    <>
      <View>
        <Text>test dev page</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  info: {
    padding: 20,
    backgroundColor: "darkgray",
    textAlign: "center",
    alignItems: "center",
    marginTop: 30,
  },
});
