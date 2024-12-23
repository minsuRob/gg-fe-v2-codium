import { View, Text, StyleSheet } from "react-native";
import { colors } from "../constants/Colors";
import CheckBox from "../components/chekbox";
import { useEffect, useState } from "react";
import Buttons from "../components/buttons";
import { router, useNavigation } from "expo-router";
import { useMutation, useQuery } from "react-query";
import { deleteUser } from "../api/myApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../components/appHeader";
import { MonoText } from "../components/styledText";

const DeleteAccountTwo = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const [checked, setChecked] = useState(false);

  const mutation = useMutation(
    deleteUser, // 이 함수가 서버로 데이터를 전송하는 역할을 합니다.
    {
      onSuccess: (data) => {
        AsyncStorage.removeItem("accessToken");
        router.push("/deleteCompleted"); // 성공한 경우에 response 데이터를 사용할 수 있습니다.
      },
    }
  );

  const userDelSubmit = async () => {
    try {
      await mutation.mutateAsync();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Header title="탈퇴하기" />
        <View style={styles.text_box}>
          <MonoText style={styles.title}>
            진저호텔을 이용해주셔서 감사합니다.
          </MonoText>
          <MonoText style={styles.subtitle}>
            진저호텔을 떠나시더라도 {`\n`}
            행복한 크리스마스 연말 보내시길 바랍니다. :)
          </MonoText>
        </View>
        <View style={styles.info_box}>
          <MonoText style={styles.info_title}>탈퇴 안내</MonoText>
          <MonoText style={styles.info_item}>
            ⋅ 현재 계정 ID가 영구 삭제됩니다.
          </MonoText>
          <MonoText style={styles.info_item}>
            ⋅ 현재 계정으로 받은 편지와 답장이 모두 삭제됩니다.
          </MonoText>
          <MonoText style={styles.info_item}>
            ⋅ 탈퇴 후 계정 복구가 불가합니다.
          </MonoText>
          <MonoText style={styles.info_item}>
            ⋅ 탈퇴 후 동일 계정으로 재가입이 불가합니다.
          </MonoText>
        </View>
      </View>
      <View>
        <View style={styles.checkbox_wrapper}>
          <CheckBox
            bg
            text={"(필수) 모든 유의사항을 확인했으며 이에 동의합니다."}
            checked={checked}
            onPress={() => {
              setChecked((prevState) => !prevState);
            }}
          />
        </View>
        <View style={styles.btn_wrapper}>
          <Buttons
            title="탈퇴하기"
            color="green"
            is_disable={!checked}
            callback={() => {
              userDelSubmit();
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: colors.greyblack,
    justifyContent: "space-between",
  },
  text_box: {
    marginTop: 50,
  },
  title: {
    color: colors.Whiteyello,
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  subtitle: {
    color: colors.grey500,
    marginBottom: 15,
  },
  info_box: {
    width: "100%",
    backgroundColor: colors.grey900,
    borderWidth: 1,
    borderColor: colors.grey600,
    padding: 10,
    borderRadius: 12,
  },
  info_title: {
    color: colors.Whiteyello,
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 10,
  },
  info_item: {
    color: colors.grey500,
    marginBottom: 10,
  },
  checkbox_wrapper: {
    marginBottom: 15,
  },
  btn_wrapper: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: 52,
    width: "100%",
    marginBottom: 30,
  },
});

export default DeleteAccountTwo;
