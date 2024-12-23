import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, View, TextInput } from "react-native";
import Buttons from "../../components/buttons";
import { MonoText } from "../../components/styledText";
import { colors } from "../../constants/Colors";
import { useMutation } from "react-query";

import styled from "styled-components/native";
import { router, useLocalSearchParams } from "expo-router";
import ErrorModal from "../../components/Modal/errorModal";
import { ErrorMessageConverter } from "../../data/error-message-converter";
import { useNavigation } from "expo-router";
import { useRecoilValue } from "recoil";
import { replyNameState } from "../../atom/letterAtom";
import ReplyHeader from "../../components/replyHeader";
import { newReply } from "../../api/repliesApi";
import WithdrawalModal from "../../components/Modal/withdrawalModal";

import { useTranslation } from "react-i18next";

export default function Reply() {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  const { id } = useLocalSearchParams();
  const { register, handleSubmit, setValue } = useForm();
  const [isNotEmptyLetters, setIsNotEmptyLetters] = useState<boolean>(false);
  const [isNotEmptyNickname, setIsNotEmptyNickname] = useState<boolean>(false);

  const senderNickname = useRecoilValue(replyNameState);
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
    newReply, // 이 함수가 서버로 데이터를 전송하는 역할을 합니다.
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
        image: "",
        letterId: id.toString(),
      };
      // 뮤테이션 실행
      await mutation.mutateAsync(letterData);
    } catch (error: any) {
      if (
        error.response.status === 400 ||
        error.response.status === 401 ||
        error.response.status === 403
      ) {
        // const obj = ErrorMessageConverter.convert(error.response.data.errorCode);
        // console.log(obj);
        // setErrorTitle(obj[0]);
        // setErrorMessage(obj[1]);
        // setErrorButtonMessage('친구 호텔로 돌아가기');

        setErrorModalVisible(true);
      }
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.greyblack }}>
      <View style={styles.container}>
        <ReplyHeader />
        <View style={styles.mailbox_items}>
          <MonoText style={{ color: colors.Whiteyello, marginBottom: 12 }}>
            {t("reply.따뜻한 편지를 보내 준 친구에게 마음을 전해요")}
          </MonoText>

          <TextInput
            style={styles.letter}
            multiline={true}
            numberOfLines={20}
            placeholder={t("reply.전하고 싶은 말을 적어주세요!")}
            onChangeText={(text) => {
              setIsNotEmptyLetters(text.length > 0);
              setValue("letters", text);
            }}
            maxLength={300}
            placeholderTextColor={colors.grey500}
          />
          <View style={styles.nickname_input}>
            <MonoText style={styles.input_text}>{t("reply.받는 이")}</MonoText>
            <MonoText style={{ color: colors.Whiteyello }}>
              {senderNickname}
            </MonoText>
            <View />
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
            title={t("reply.보내기")}
            is_width={true}
            color="green"
            callback={handleSubmit(letterSubmit)}
            is_disable={!isNotEmptyLetters}
            width={330}
          />
        </View>
        {/* <ErrorModal
          height={300}
          visible={ErrorModalVisible}
          onClose={closeErrorModal}
          name={errorTitle}
          desc={errorMessage}
          buttonMessage={errorButtonMessage}
          url={`hotel/${id}`}
        /> */}
        <WithdrawalModal
          isVisible={ErrorModalVisible}
          onClose={closeErrorModal}
          letterId={0}
          letterType={false}
          replyId={0}
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
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    borderRadius: 6,
    marginTop: 20,
    textAlign: "left",
    marginBottom: 20,
    gap: 20,
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
    fontSize: 16,
    color: colors.grey200,
    outlineStyle: "none",
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.greyblack,
  },
  letter: {
    width: 287,
    height: 326,
    backgroundColor: colors.grey900,
    paddingTop: 22,
    paddingBottom: 22,
    paddingLeft: 18,
    paddingRight: 18,
    textAlign: "left",
    border: "5px dashed #005142",
    borderRadius: 12,
    color: "#FFFDF0",
    outlineStyle: "none",
    fontFamily: "NanumSquareNeo-Variable",
    lineHeight: 18,
  },
  letter_box: {
    backgroundColor: colors.grey900,
    padding: 7,
    border: "3px solid  #005142",
    borderRadius: 18,
    lineHeight: 18,
  },
});
