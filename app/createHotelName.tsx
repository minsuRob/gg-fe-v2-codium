import * as React from "react";
import { View, StyleSheet, TextInput, ScrollView } from "react-native";
import Buttons from "../components/buttons";
import CreateHeader from "../components/createHeader";
import { MonoText } from "../components/styledText";
import { colors } from "../constants/Colors";
import Input from "../components/input";
import { useState } from "react";
import CustomUserHotel from "../components/customUserHotel";
import { useLocalSearchParams, useNavigation } from "expo-router";
import Header from "../components/appHeader";

export default function CreateHotelName() {
  const [nickname, setNickname] = useState("");
  const [description, setDescription] = useState("");
  const params = useLocalSearchParams();
  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <>
      <Header title="호텔 만들기" />
      <CreateHeader isActiveNumber={2} />
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
              onChange={(text: string) => setNickname(text)}
              placeholder="내 닉네임 (최대 8글자)"
              maxLength={8}
            />
            <View style={{ marginTop: 8 }}></View>
            <Input
              multiline={5}
              onChange={(text: string) => setDescription(text)}
              placeholder="내 호텔을 소개해주세요 (최대 25글자)"
              maxLength={25}
            />
          </View>
          <View style={styles.btn_wrapper}>
            <Buttons
              is_disable={!nickname || !description}
              url={"createHotelSelect"}
              props={{ ...params, nickname, description }}
              title="다음으로"
              color="green"
            />

            <MonoText style={styles.hotel_info}>
              ※ 호텔 색상은 나중에도 수정할 수 있어요!
            </MonoText>
          </View>
        </View>
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
    height: 90,
    width: "100%",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
    marginBottom: 28,
  },
  hotel_info: {
    color: colors.grey500,
    fontSize: 10,
  },
});
