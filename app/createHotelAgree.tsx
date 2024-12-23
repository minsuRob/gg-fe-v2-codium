import * as React from "react";
import { View, StyleSheet, Text, Linking } from "react-native";
import Buttons from "../components/buttons";
import CreateHeader from "../components/createHeader";
import { MonoText } from "../components/styledText";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../constants/Colors";
import { useState } from "react";
import CheckBox from "../components/chekbox";
import { useQueryClient, useMutation } from "react-query";
import { newHotel } from "../api/hotelApi";
import Header from "../components/appHeader";
import { useNavigation } from "expo-router/src/useNavigation";
import { router, useLocalSearchParams } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ErrorMessageConverter } from "../data/error-message-converter";

export default function createHotelAgree() {
  const props: any = useLocalSearchParams();
  const navigation = useNavigation();
  const [ErrorModalVisible, setErrorModalVisible] = useState<boolean>(false);
  const [errorTitle, setErrorTitle] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorButtonMessage, setErrorButtonMessage] = useState<string>("");

  React.useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const useAgree = () => {
    const url =
      "https://probable-failing-2db.notion.site/4bcd9a04d98443489412e52fa6bf5b68?pvs=4";
    Linking.openURL(url).catch((err) =>
      console.error("Error opening the website:", err)
    );
  };

  const personalAgree = () => {
    const url =
      "https://probable-failing-2db.notion.site/72817f9a68c24c87ba4a42a16499d933?pvs=4";
    Linking.openURL(url).catch((err) =>
      console.error("Error opening the website:", err)
    );
  };

  const [isChecked, setChecked] = useState<any>({
    all: false,
    age: false,
    use: false,
    personal: false,
  });
  const checkAgree = (type: string) => {
    if (type === "all") {
      for (let item in isChecked) {
        isChecked[item] = !isChecked[item];
      }
      setChecked({ ...isChecked });
      return;
    }
    isChecked[type] = !isChecked[type];
    setChecked({ ...isChecked });
  };

  const mutation = useMutation(
    // 이 함수가 서버로 데이터를 전송하는 역할을 합니다.
    newHotel,
    {
      onSuccess: (data) => {
        window.location.href = `/hotel/${data.hotelId}`;
      },
      onError: (error: any) => {},
    }
  );

  const handleFormSubmit = async () => {
    try {
      // 뮤테이션 실행
      await mutation.mutateAsync({
        ...props,
      });
    } catch (error: any) {
      if (
        error.response.status === 400 ||
        error.response.status === 401 ||
        error.response.status === 403
      ) {
        const obj = ErrorMessageConverter.convert(
          error.response.data.errorCode
        );
        setErrorTitle(obj[0]);
        setErrorMessage(obj[1]);
        setErrorButtonMessage("닫기");
        setErrorModalVisible(true);
      }
    }
  };

  return (
    <>
      <Header title="호텔 만들기" />
      <CreateHeader isActiveNumber={4} />
      <View style={styles.container}>
        <View style={styles.edit_wrapper}>
          <MonoText style={styles.title}>이용약관에 동의해주세요</MonoText>
          <CheckBox
            checked={isChecked.all}
            bg={true}
            text="서비스 이용약관에 모두 동의합니다."
            onPress={() => checkAgree("all")}
          />
          <View style={styles.hr}></View>
          <CheckBox
            checked={isChecked.age}
            bg={false}
            text="[필수] 만 14세 이상입니다"
            onPress={() => checkAgree("age")}
          />
          <View style={styles.flexStyle}>
            <CheckBox
              checked={isChecked.use}
              onPress={() => checkAgree("use")}
              bg={false}
              text="[필수] 이용약관 동의"
            />
            <TouchableOpacity onPress={useAgree}>
              <Text style={{ color: colors.Whiteyello }}>보기</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.flexStyle}>
            <CheckBox
              checked={isChecked.personal}
              onPress={() => checkAgree("personal")}
              bg={false}
              text="[필수] 개인정보 처리방침 동의"
            />
            <TouchableOpacity onPress={personalAgree}>
              <Text style={{ color: colors.Whiteyello }}>보기</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.btn_wrapper}>
          <Buttons
            is_disable={!isChecked.personal || !isChecked.age || !isChecked.use}
            // url={"/hotel/15"}
            title="완료"
            color="green"
            callback={handleFormSubmit}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(30,31,35,1.00)",
    flex: 1,
    justifyContent: "flex-start",
    paddingLeft: 20,
  },
  edit_wrapper: {
    marginTop: 40,
  },
  title: {
    textAlign: "left",
    fontSize: 20,
    color: colors.Whiteyello,
    marginBottom: 50,
  },
  btn_wrapper: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    height: 70,
    width: "100%",
    padding: 10,
    paddingLeft: 10,
    paddingRight: 20,
    marginTop: 20,
    marginBottom: 28,
  },
  hr: {
    height: 1,
    backgroundColor: colors.grey900,
    marginTop: 22,
    marginBottom: 22,
  },
  flexStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 20,
    alignItems: "center",
  },
});
