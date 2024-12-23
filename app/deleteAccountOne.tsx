import { View, StyleSheet } from "react-native";
import { colors } from "../constants/Colors";
import CheckBox from "../components/chekbox";
import { useState, useEffect } from "react";
import Input from "../components/input";
import Buttons from "../components/buttons";
import { router, useNavigation } from "expo-router";
import Header from "../components/appHeader";
import { MonoText } from "../components/styledText";

const DeleteAccountOne = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigation = useNavigation();

  const [checked, setChecked] = useState({
    checkedOne: false,
    checkedTwo: false,
    checkedThree: false,
    checkedFour: false,
    checkedFive: false,
    checkedSix: false,
  });

  useEffect(() => {
    const anyChecked = Object.values(checked).some((value) => value === true);
    setIsButtonDisabled(!anyChecked);
  }, [checked]);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const [reason, setReason] = useState("");

  return (
    <View style={styles.container}>
      <View>
        <Header title="탈퇴하기" />
        <View style={styles.text_box}>
          <MonoText
            style={{
              color: colors.Whiteyello,
              fontSize: 23,
              marginBottom: 10,
            }}
          >
            탈퇴하시겠습니까?
          </MonoText>
          <MonoText style={styles.subtitle}>
            진저호텔을 떠나는 이유를 알려주세요!
          </MonoText>
        </View>
        <View style={styles.checkbox_wrapper}>
          <CheckBox
            bg
            text={"재미가 없어서"}
            checked={checked.checkedOne}
            onPress={() => {
              setChecked({ ...checked, checkedOne: !checked.checkedOne });
            }}
          />
          <CheckBox
            bg
            text={"편지를 주고 받는 일이 적어서"}
            checked={checked.checkedTwo}
            onPress={() => {
              setChecked({ ...checked, checkedTwo: !checked.checkedTwo });
            }}
          />
          <CheckBox
            bg
            text={"앱 사용이 어려워서"}
            checked={checked.checkedThree}
            onPress={() => {
              setChecked({ ...checked, checkedThree: !checked.checkedThree });
            }}
          />
          <CheckBox
            bg
            text={"사용하는 친구들이 주변에 없어서"}
            checked={checked.checkedFour}
            onPress={() => {
              setChecked({ ...checked, checkedFour: !checked.checkedFour });
            }}
          />
          <CheckBox
            bg
            text={"너무 늦게 가입해서"}
            checked={checked.checkedFive}
            onPress={() => {
              setChecked({ ...checked, checkedFive: !checked.checkedFive });
            }}
          />
          <CheckBox
            bg
            text={"기타"}
            checked={checked.checkedSix}
            onPress={() => {
              setChecked({ ...checked, checkedSix: !checked.checkedSix });
            }}
          />
        </View>
        {checked.checkedSix ? (
          <View style={styles.delete_reason_input_wrapper}>
            <Input
              placeholder="탈퇴 사유를 적어주세요!"
              width={"100%"}
              onChange={(text: string) => setReason(text)}
              multiline={10}
            />
          </View>
        ) : (
          <></>
        )}
      </View>
      <View style={styles.btn_wrapper}>
        <Buttons
          title="다음"
          color="green"
          is_disable={isButtonDisabled}
          callback={() => {
            router.push("/deleteAccountTwo");
          }}
        />
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
  },
  checkbox_wrapper: {
    gap: 15,
    marginTop: 30,
  },
  delete_reason_input_wrapper: {
    marginTop: 30,
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

export default DeleteAccountOne;
