import * as React from "react";
import { View, StyleSheet, TextInput, ScrollView } from "react-native";
import Buttons from "../components/buttons";
import CreateHeader from "../components/createHeader";
import { MonoText } from "../components/styledText";
import { colors } from "../constants/Colors";
import Input from "../components/input";
import { useState } from "react";
import CustomUserHotel from "../components/customUserHotel";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import Header from "../components/appHeader";
import { updateHotel } from "../api/hotelApi";
import { useMutation } from "react-query";
import { ErrorMessageConverter } from "../data/error-message-converter";
import ErrorModal from "../components/Modal/errorModal";

export default function UpdateHotelName() {
  const props = useLocalSearchParams();
  const [newNickname, setNickname] = useState(props.nickname);
  const [newDescription, setDescription] = useState(props.description);
  const params = useLocalSearchParams();
  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const mutation = useMutation(
    // 이 함수가 서버로 데이터를 전송하는 역할을 합니다.
    updateHotel,
    {
      onSuccess: (data) => {
        window.location.href = `/hotel/${data.hotelId}`;
        // 성공한 경우에 response 데이터를 사용할 수 있습니다.
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );

  const [ErrorModalVisible, setErrorModalVisible] = useState<boolean>(false);
  const [errorTitle, setErrorTitle] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorButtonMessage, setErrorButtonMessage] = useState<string>("");
  const closeErrorModal = () => {
    setErrorModalVisible(false);
  };

  const handleFormSubmit = async () => {
    try {
      // 뮤테이션 실행
      await mutation.mutateAsync({
        id: props?.id,
        nickname: newNickname,
        description: newDescription,
        structColor: props?.structColor,
        bodyColor: props?.bodyColor,
        windowDecorator: props?.windowDecorator,
        gardenDecorator: props?.gardenDecorator,
        buildingDecorator: props?.buildingDecorator,
        background: props?.background,
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
        setErrorButtonMessage("친구 호텔로 돌아가기");
        setErrorModalVisible(true);
      }
    }
  };

  return (
    <>
      <Header title="호텔 수정하기" />
      <CreateHeader isActiveNumber={3} />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.edit_wrapper}>
            <MonoText style={styles.title}>누구의 호텔인가요?</MonoText>
          </View>

          <View>
            <CustomUserHotel
              is_border={true}
              wallColor={params.bodyColor}
              structColor={params.structColor}
              gardenDecorator={params.gardenDecorator}
              windowDecorator={params.windowDecorator}
              buildingDecorator={params.buildingDecorator}
              background={params.background}
            />
          </View>

          <View
            style={{
              padding: 3,
              paddingTop: 10,
              justifyContent: "flex-start",
              width: "100%",
            }}
          >
            <Input
              value={newNickname}
              onChange={(text: string) => setNickname(text)}
              placeholder="내 닉네임 (최대 8글자)"
              maxLength={8}
            />
            <View style={{ marginTop: 8 }}></View>
            <Input
              value={newDescription}
              multiline={5}
              onChange={(text: string) => setDescription(text)}
              placeholder="내 호텔을 소개해주세요 (최대 25글자)"
              maxLength={25}
            />
          </View>
          <View style={styles.btn_wrapper}>
            <Buttons
              is_disable={!newNickname || !newDescription}
              title="수정하기"
              color="green"
              callback={handleFormSubmit}
            />
          </View>
          <MonoText style={styles.hotel_info}>
            ※ 호텔 이름은 나중에도 수정할 수 있어요!
          </MonoText>
        </View>

        <ErrorModal
          height={200}
          visible={ErrorModalVisible}
          onClose={closeErrorModal}
          name={errorTitle}
          desc={errorMessage}
          buttonMessage={errorButtonMessage}
        />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(30,31,35,1.00)",
    padding: 10,
    flex: 1,
    alignItems: "center",
  },
  img_wrapper: {
    borderWidth: 0.3,
    borderColor: colors.grey500,
    zIndex: 3,
    marginTop: 26,
    padding: 10,
    borderRadius: 12,
    marginBottom: 8,
  },
  edit_wrapper: {
    marginTop: 30,
    marginLeft: 7,
    justifyContent: "flex-start",
    width: "100%",
  },
  title: {
    textAlign: "left",
    fontSize: 20,
    color: colors.Whiteyello,
  },
  desc: {
    textAlign: "left",
    fontSize: 12,
    color: colors.grey500,
    marginTop: 8,
  },
  hotel_img: {
    width: 300,
    height: 400,
    marginTop: 20,
  },
  letter: {
    backgroundColor: "#c9c9c9",
    padding: 10,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#c9c9c9",
    padding: 10,
    marginTop: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  btn_wrapper: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    height: 70,
    width: "100%",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
  },
  hotel_info: {
    color: colors.grey500,
    fontSize: 10,
    marginBottom: 20,
  },
});
