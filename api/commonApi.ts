import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const axiosConfig = async () => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    // console.log(accessToken);
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
}