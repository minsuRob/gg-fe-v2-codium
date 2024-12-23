import * as React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  TextInput,
} from "react-native";
import Buttons from "../components/buttons";
import Chip from "../components/chip";
import CreateHeader from "../components/createHeader";
import Input from "../components/input";
import { MonoText } from "../components/styledText";
import { colors } from "../constants/Colors";
import { Image } from "react-native";
import { useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import Header from "../components/appHeader";
const icon = require("../assets/icon/i_check_user.png");

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css"; // 새로운 CSS 파일을 생성하여 스타일을 추가합니다.
import { checkMemberCode } from "../api/authApi";
import Toast from "react-native-toast-message";

export default function createHotelSelect() {
  const props = useLocalSearchParams();
  const sex_english: any = { 선택안함: "", 남성: "MAN", 여성: "WOMAN" };
  const sex_chip = ["선택안함", "여성", "남성"];
  const [activeChip, setChip] = React.useState("선택안함");
  const [activeBirth, setBirth] = React.useState("선택안함");
  const [code, setCode] = useState("");
  const [birthday, setBirthday] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date("2000-01-01"));

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
    // 생년월일을 원하는 형식으로 표시
    const formattedDate = date.toISOString().split("T")[0];
    setBirthday(formattedDate);
  };

  const handelCheckCode = async () => {
    const res = await checkMemberCode(code);
    if (res.success) {
      Toast.show({
        type: "iconToast",
        text1: "친구코드 인증이 완료되었습니다.",
        position: "bottom",
      });
    } else {
      setCode("");
    }
  };

  const navigation = useNavigation();
  React.useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const input_size = {
    web: 110,
    app: 100,
  };

  return (
    <>
      <Header title="호텔 만들기" />
      <CreateHeader isActiveNumber={3} />
      <ScrollView style={styles.container}>
        <View style={styles.edit_wrapper}>
          <MonoText style={styles.title}>선택 정보를 입력해주세요</MonoText>

          <MonoText style={styles.input_title}>성별</MonoText>
          <View style={styles.chip_wrapper}>
            {sex_chip?.map((text, index) => (
              <TouchableOpacity key={index} onPress={() => setChip(text)}>
                <Chip text={text} active={activeChip} width={80} />
              </TouchableOpacity>
            ))}
          </View>

          <MonoText style={styles.input_title}>생년월일</MonoText>
          <MonoText style={styles.input_label}>
            생년월일을 형식에 맞게 입력해주세요.
          </MonoText>

          {/* <Chip text={"선택안함"} active={activeBirth} /> */}
          <View style={styles.input_wrapper}>
            <DatePicker
              portalId="root-portal"
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              placeholderText="YYYY-MM-DD"
              showYearDropdown
              popperPlacement="bottom"
            />
          </View>

          <MonoText style={styles.input_title}>친구코드 입력</MonoText>
          <MonoText style={styles.input_label}>
            나를 초대해 준 친구가 있나요? {"\n"}
            {"\n"}
            친구 코드를 적으면 나와 친구 모두 창문 열쇠를 1개씩 받을 수 있어요!
          </MonoText>

          <View style={styles.input_wrapper_2}>
            <Input
              maxLength={7}
              onChange={(text: string) => setCode(text)}
              width={"90%"}
              placeholder="친구 코드 7자리를 입력해주세요 (ex. 14B78H1)"
            />
            <View style={styles.icon}>
              <TouchableOpacity onPress={handelCheckCode}>
                <Image style={{ width: 27, height: 27 }} source={icon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.btn_wrapper}>
          <Buttons
            url={"createHotelAgree"}
            title="다음으로"
            color="green"
            props={{
              ...props,
              gender: sex_english[activeChip],
              code,
              birthDate: birthday,
            }}
          />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(30,31,35,1.00)",
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  edit_wrapper: {
    marginTop: 40,
  },
  title: {
    textAlign: "left",
    fontSize: 20,
    color: colors.Whiteyello,
  },
  input_title: {
    marginTop: 40,
    marginBottom: 14,
    color: colors.Whiteyello,
    fontSize: 16,
  },
  input_label: {
    fontSize: 11,
    color: colors.grey600,
    marginBottom: 20,
  },
  btn_wrapper: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    height: 70,
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 30,
  },
  chip_wrapper: {
    display: "flex",
    flexDirection: "row",
  },
  input_wrapper: {
    width: "100%",
    // display: "flex",
    // flexDirection: "row",
    marginTop: 12,
    // alignItems: "center",
  },

  input_wrapper_2: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 12,
    alignItems: "center",
    paddingRight: 20,
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 6,
    backgroundColor: colors.green600,
    marginLeft: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
