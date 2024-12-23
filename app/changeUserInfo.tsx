import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import Chip from "../components/chip";
import Input from "../components/input";
import { MonoText } from "../components/styledText";
import { colors } from "../constants/Colors";
import { useEffect, useState } from "react";
import Buttons from "../components/buttons";
import CenterModal from "../components/centerModal";
import { router, useNavigation } from "expo-router";
import Header from "../components/appHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "react-query";
import { myDate, updateUser } from "../api/myApi";
import DatePicker from "react-datepicker";
import { ko, enUS } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";
import Toast from "react-native-toast-message";
import ErrorModal from "../components/Modal/errorModal";
import { ErrorMessageConverter } from "../data/error-message-converter";
const icon: any = require("../assets/icon/i_check_green.svg");
const ChangeUserInfo = () => {
  const sex_english: any = { 선택안함: "", 남성: "MAN", 여성: "WOMAN" };
  const sex_chip = ["선택안함", "여성", "남성"];

  const { data, status, error } = useQuery(
    "myDate",
    async () => await myDate(),
    {
      refetchOnWindowFocus: false,
      onError: (e) => {
        console.log(`useQuery error : ${e}`);
      },
    }
  );

  const [user, setUser] = useState({
    email: data?.user?.email,
    gender: data?.user?.gender === "MAN" ? "남성" : "여성",
    birthDate: data?.user?.birthDate,
  });
  const [activeChip, setChip] = useState(user?.gender);

  const [logoutModalVisible, setLogoutModalVisible] = useState<boolean>(false);

  const openLogoutModal = () => {
    setLogoutModalVisible(true);
  };
  const closeLogoutModal = () => {
    setLogoutModalVisible(false);
  };

  const Logout = () => {
    setLogoutModalVisible(false);
    // refactor
    AsyncStorage.removeItem("accessToken");
    router.push("/");
  };

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const [birthday, setBirthday] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date(
      String(data?.user?.birthDate ? data?.user?.birthDate : "2000-01-01")
    )
  );
  const handleDateChange = (date: any) => {
    setSelectedDate(date);
    // 생년월일을 원하는 형식으로 표시
    const formattedDate = date.toISOString().split("T")[0];
    setBirthday(formattedDate);
  };

  const [ErrorModalVisible, setErrorModalVisible] = useState<boolean>(false);
  const [errorTitle, setErrorTitle] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorButtonMessage, setErrorButtonMessage] = useState<string>("");
  const closeErrorModal = () => {
    setErrorModalVisible(false);
  };

  const handelUpdate = async () => {
    try {
      const update = {
        gender: sex_english[activeChip],
        birthDate: birthday,
      };
      const res = await updateUser(update);
      if (res.success) {
        Toast.show({
          type: "iconToast",
          text1: "계정 정보가 수정되었습니다.",
          position: "bottom",
          props: { icon },
        });
        router.back();
      }
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
      <View style={styles.container}>
        <View>
          <Header title="내 계정" />
          <CenterModal
            height={180}
            visible={logoutModalVisible}
            onClose={closeLogoutModal}
            title="로그아웃 하시겠어요?"
            desc="다음 로그인 때 동일한 계정으로 소셜로그인을 해야 호텔을 그대로 볼 수 있어요."
            btn_text="로그아웃"
            callback={Logout}
          />

          <View style={styles.edit_wrapper}>
            <MonoText style={styles.title}>내 계정 정보</MonoText>
            <View style={styles.email_wrapper}>
              <MonoText style={styles.email_text}>{user?.email}</MonoText>
              <TouchableOpacity
                onPress={() => {
                  openLogoutModal();
                }}
              >
                <MonoText style={styles.logout_text}>로그아웃</MonoText>
              </TouchableOpacity>
            </View>
            <View style={styles.separator_horizontal}></View>
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

            <View style={styles.input_wrapper}>
              <DatePicker
                locale={ko}
                portalId="root-portal"
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                placeholderText="YYYY-MM-DD"
                showYearDropdown
                popperPlacement="bottom"
              />
            </View>

            <TouchableOpacity
              accessible={true}
              accessibilityLabel="회원탈퇴 버튼"
              onPress={() => {
                router.push("/deleteAccountTwo");
              }}
            >
              <MonoText style={styles.input_title}>회원탈퇴</MonoText>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.btn_wrapper}>
          <Buttons title="수정하기" color="green" callback={handelUpdate} />
        </View>
        <ErrorModal
          height={200}
          visible={ErrorModalVisible}
          onClose={closeErrorModal}
          name={errorTitle}
          desc={errorMessage}
          buttonMessage={errorButtonMessage}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.greyblack,
    height: "100%",
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "space-between",
  },
  edit_wrapper: {
    marginTop: 40,
  },
  title: {
    textAlign: "left",
    fontSize: 20,
    color: colors.Whiteyello,
  },
  email_wrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  email_text: {
    color: colors.grey400,
  },
  logout_text: {
    color: colors.green500,
    fontWeight: "600",
  },
  separator_horizontal: {
    width: "100%",
    backgroundColor: colors.grey900,
    height: 1,
    marginTop: 10,
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
    height: 52,
    width: "100%",
    marginBottom: 30,
  },
  chip_wrapper: {
    display: "flex",
    flexDirection: "row",
  },
  input_wrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ChangeUserInfo;

