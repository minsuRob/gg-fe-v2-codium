import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import NewLetterItem from "../../components/newLetterItem";
import MailHeader from "../../components/mailHeader";
import ReplyLetterItem from "../../components/replyLetterItem";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  hotelIdState,
  letterSwitchState,
  letterUpdateState,
  windowDateState,
} from "../../atom/letterAtom";
import ReplyBoxHeader from "../../components/replyBoxHeader";
import { useQuery } from "react-query";
import { newLetterData } from "../../api/letterApi";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { colors } from "../../constants/Colors";
import { MonoText } from "../../components/styledText";
import { typography } from "../../constants/Typo";
import { SvgImg } from "../../components/svgImg";

const letter = require("../../assets/images/letter.svg");

export default function MailBox() {
  const letterRender = useRecoilValue(letterSwitchState);
  const { id } = useLocalSearchParams();
  const deleteCheck = useRecoilValue(letterUpdateState);
  const [letterCheck, setLetterCheck] = useRecoilState(windowDateState);
  const { data, isLoading, refetch } = useQuery(
    "newLetters",
    async () => await newLetterData(id, letterCheck.toString())
  );
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  useEffect(() => {
    refetch();
  }, [deleteCheck, letterCheck]);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  if (isLoading) {
    return <Text>로딩...</Text>;
  }
  else if (!isFetched) {
    setIsFetched(true)
    refetch();
  }
  return (
    <View style={styles.container}>
      <MailHeader marginTop={50} />
      <ScrollView>
        <View style={styles.mailbox_items}>
          <View
            style={{
              borderRadius: 12,
              backgroundColor: colors.green50,
              padding: 16,
              paddingLeft: 12,
              paddingRight: 12,
              width: "100%",
              minWidth: 340,
              position: "relative",
            }}
          >
            <Text
              style={[
                typography.soyo,
                {
                  fontSize: 16,
                  color: colors.greyblack,
                  fontWeight: "bold",
                },
              ]}
            >
              오늘의 편지함을 열었어요
            </Text>
            <MonoText
              style={{ fontSize: 12, color: colors.grey500, marginTop: 7 }}
            >
              하루에 최대 편지 20개를 받을 수 있어요!
            </MonoText>

            <SvgImg
              url={letter}
              style={{
                width: 88,
                height: 55,
                position: "absolute",
                right: 0,
                bottom: 10,
              }}
            />
          </View>

          {letterRender.new ? (
            <>
              <NewLetterItem letters={data?.letters} />
            </>
          ) : (
            <ReplyLetterItem replies={data?.replies} />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    backgroundColor: "#000",
  },
  mailbox_items: {
    padding: 15,
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
    height: "100%",
    gap: 20,
  },
  title: {
    fontSize: 25,
    marginTop: 20,
  },
  letter_img: {
    width: 150,
    height: 40,
  },
  btn_wrapper: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
});
