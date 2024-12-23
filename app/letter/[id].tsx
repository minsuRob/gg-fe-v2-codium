import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, View, TextInput, ScrollView } from "react-native";
import Buttons from "../../components/buttons";
import { MonoText } from "../../components/styledText";
import { colors } from "../../constants/Colors";
import { useMutation } from "react-query";
import { newLetter } from "../../api/letterApi";

import styled from "styled-components/native";
import { router, useLocalSearchParams } from "expo-router";
import ErrorModal from "../../components/Modal/errorModal";
import { ErrorMessageConverter } from "../../data/error-message-converter";
import { useNavigation } from "expo-router";
import LetterHeader from "../../components/letterHeader";

import { useTranslation } from "react-i18next";

export default function Letter() {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const { id } = useLocalSearchParams();

  const { register, handleSubmit, setValue } = useForm();
  const [isNotEmptyLetters, setIsNotEmptyLetters] = useState<boolean>(false);
  const [isNotEmptyNickname, setIsNotEmptyNickname] = useState<boolean>(false);
  useEffect(() => {
    register("letters");
    register("nickname");
  }, [register]);

  const [ErrorModalVisible, setErrorModalVisible] = useState<boolean>(false);
  const [errorTitle, setErrorTitle] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorButtonMessage, setErrorButtonMessage] = useState<string>("");
  const closeErrorModal = () => {
    setErrorModalVisible(false);
  };

  const mutation = useMutation(
    newLetter, // 이 함수가 서버로 데이터를 전송하는 역할을 합니다.
    {
      onSuccess: (data) => {
        router.push("/letterCompleted"); // 성공한 경우에 response 데이터를 사용할 수 있습니다.
      },
    }
  );

  const letterSubmit = async (data: any) => {
    try {
      const letterData = {
        content: data.letters,
        senderNickname: data.nickname,
        image: "",
        hotelId: id.toString(),
      };
      // 뮤테이션 실행
      await mutation.mutateAsync(letterData);
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
    <View style={{ flex: 1, backgroundColor: colors.greyblack }}>
      <View style={styles.container}>
        <LetterHeader />
        <View style={styles.mailbox_items}>
          <View style={{ justifyContent: "flex-start", width: 348 }}>
            <MonoText
              style={{
                color: colors.Whiteyello,
                marginBottom: 30,
                fontSize: 20,
              }}
            >
              {t("letter.친구의 호텔에 편지를 보내주세요!")}
            </MonoText>
          </View>
          <View style={styles.letter_box}>
            <TextInput
              style={styles.letter}
              multiline={true}
              numberOfLines={20}
              placeholder={t("letter.전하고 싶은 말을 적어주세요!")}
              placeholderTextColor={colors.grey500}
              onChangeText={(text) => {
                setIsNotEmptyLetters(text.length > 0);
                setValue("letters", text);
              }}
              maxLength={300}
            />
          </View>
          <View style={styles.nickname_input}>
            <TextInput
              blurOnSubmit={true}
              style={styles.input}
              placeholder={t("letter.나의 닉네임을 입력하세요! (15자 이하)")}
              placeholderTextColor={colors.grey500}
              onChangeText={(text) => {
                setIsNotEmptyNickname(text.length > 0);
                setValue("nickname", text);
              }}
              maxLength={15}
            />
          </View>
        </View>
        <View style={styles.footer}>
          {/* 이미지 첨부 버튼 주석
        <Buttons
          is_width={true}
          url={"gingercard"}
          title="이미지 첨부"
          color="darkgray"
        />
        */}
          <Buttons
            url={"letterCompleted"}
            title={t("letter.보내기")}
            is_width={true}
            color="green"
            width={330}
            callback={handleSubmit(letterSubmit)}
            is_disable={!isNotEmptyLetters || !isNotEmptyNickname}
          />
        </View>
        <ErrorModal
          height={200}
          visible={ErrorModalVisible}
          onClose={closeErrorModal}
          name={errorTitle}
          desc={errorMessage}
          buttonMessage={errorButtonMessage}
          url={`hotel/${id}`}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    gap: 50,
    backgroundColor: colors.greyblack,
    paddingBottom: 60,
  },

  mailbox_items: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  nickname_input: {
    flexDirection: "row",
    alignItems: "center",
    width: 300,
    backgroundColor: colors.grey900,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 20,
    borderRadius: 6,
    marginTop: 20,
    textAlign: "left",
    marginBottom: 20,
  },
  input_text: {
    fontSize: 12,
    color: colors.grey500,
  },
  input: {
    flex: 1,
    width: "100%",
    height: 30,
    backgroundColor: colors.grey900,
    paddingLeft: 16,
    borderRadius: 6,
    textAlign: "left",
    fontSize: 14,
    color: colors.grey200,
    outlineStyle: "none",
    fontFamily: "NanumSquareNeo-Variable",
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.greyblack,
  },
  letter_box: {
    backgroundColor: colors.Whiteyello,
    padding: 7,
    border: "3px solid  #005142",
    borderRadius: 18,
    lineHeight: 18,
  },
  letter: {
    width: 320,
    height: 278,
    backgroundColor: colors.Whiteyello,
    paddingTop: 22,
    paddingBottom: 22,
    paddingLeft: 18,
    paddingRight: 18,
    textAlign: "left",
    border: "4px dashed #005142",
    borderRadius: 12,
    color: colors.grey900,
    fontFamily: "NanumSquareNeo-Variable",
    lineHeight: 18,
  },
});
