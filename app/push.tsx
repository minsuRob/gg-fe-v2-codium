import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Buttons from "../components/buttons";
import { MonoText } from "../components/styledText";
import { FontAwesome } from "@expo/vector-icons";
import { View } from "../components/themed";
import { useThemeColor } from "../components/themed";
import NoticeItem from "../components/noticeItem";
import { router, useNavigation } from "expo-router";
import CenterModal from "../components/centerModal";

import * as Updates from "expo-updates";

export default function Push() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const [pushDeleteMode, setPushDeleteMode] = useState(false);
  const [deleteChecked, setDeleteChecked] = useState([
    { id: 1, checked: false },
    { id: 2, checked: false },
    { id: 3, checked: false },
    { id: 4, checked: false },
    { id: 5, checked: false },
    { id: 6, checked: false },
  ]);

  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      // You can also add an alert() to see the error message in case of an error when fetching updates.
      //alert(`Error fetching latest Expo update: ${error}`);
    }
  }

  const updatedDeleteChecked = (id: number, checked: boolean) => {
    const updatedDeleteChecked = deleteChecked.map((item) => {
      if (item.id === id) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    setDeleteChecked(updatedDeleteChecked);
  };

  const resetDeleteChecked = () => {
    const resetDeleteCheckedList = deleteChecked.map((item) => {
      return { id: item.id, checked: false };
    });
    setDeleteChecked(resetDeleteCheckedList);
  };

  const deleteModeChange = () => {
    setPushDeleteMode((prevDeleteMode) => !prevDeleteMode);
    resetDeleteChecked();
  };

  // CenterModal
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  // 뒤로가기
  const handleGoBack = () => {
    router.back();
  };

  //DarkMode, LightMode Color 설정
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");

  return (
    <View style={styles.container}>
      <CenterModal
        height={180}
        visible={modalVisible}
        onClose={closeModal}
        title="선택한 알림을 삭제할까요?"
        desc="한번 삭제한 알림은 복구할 수 없어요."
        btn_text="삭제하기"
      />
      <SafeAreaView style={[styles.header, { backgroundColor }]}>
        <View style={styles.header_left_child}>
          {pushDeleteMode ? null : (
            <TouchableOpacity onPress={handleGoBack}>
              <FontAwesome name="arrow-left" size={28} color={textColor} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.header_center_child}>
          <MonoText style={styles.title}>알림</MonoText>
        </View>
        <View style={styles.header_right_child}>
          {pushDeleteMode ? null : (
            <TouchableOpacity onPress={deleteModeChange}>
              <FontAwesome name="trash" size={28} color={textColor} />
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
      <ScrollView>
        <NoticeItem
          id={deleteChecked[0].id}
          iconName={"envelope"}
          content={"두근두근! 새 편지 도착!"}
          time={"오후 5시 20분 "}
          isRead={false}
          deleteMode={pushDeleteMode}
          deleteChecked={deleteChecked[0].checked}
          updatedDeleteChecked={() =>
            updatedDeleteChecked(1, deleteChecked[0].checked)
          }
        />
        <NoticeItem
          id={deleteChecked[1].id}
          iconName={"envelope"}
          content={"편지함에 답장이 도착했어요!"}
          time={"오후 5시 20분 "}
          isRead={false}
          actionButton={true}
          deleteMode={pushDeleteMode}
          deleteChecked={deleteChecked[1].checked}
          updatedDeleteChecked={() =>
            updatedDeleteChecked(2, deleteChecked[1].checked)
          }
        />
        <NoticeItem
          id={deleteChecked[2].id}
          iconName={"search"}
          content={"헤르미온느님께서 엿보기를 요청했어요!"}
          time={"오후 5시 20분 "}
          isRead={false}
          actionButton={true}
          deleteMode={pushDeleteMode}
          deleteChecked={deleteChecked[2].checked}
          updatedDeleteChecked={() =>
            updatedDeleteChecked(3, deleteChecked[2].checked)
          }
        />
        <NoticeItem
          id={deleteChecked[3].id}
          iconName={"user-check"}
          content={"000님께서 엿보기를 수락했어요!"}
          time={"오후 5시 20분 "}
          isRead={false}
          actionButton={true}
          deleteMode={pushDeleteMode}
          deleteChecked={deleteChecked[3].checked}
          updatedDeleteChecked={() =>
            updatedDeleteChecked(4, deleteChecked[3].checked)
          }
        />
        <NoticeItem
          id={deleteChecked[4].id}
          iconName={"user-times"}
          content={"000님께서 엿보기를 거절했어요!"}
          time={"오후 5시 20분 "}
          isRead={false}
          deleteMode={pushDeleteMode}
          deleteChecked={deleteChecked[4].checked}
          updatedDeleteChecked={() =>
            updatedDeleteChecked(5, deleteChecked[4].checked)
          }
        />
        <NoticeItem
          id={deleteChecked[5].id}
          iconName={"user-times"}
          content={"auto prod님께서 엿보기를 거절했어요!"}
          time={"오후 5시 20분 "}
          isRead={true}
          deleteMode={pushDeleteMode}
          deleteChecked={deleteChecked[5].checked}
          updatedDeleteChecked={() =>
            updatedDeleteChecked(6, deleteChecked[5].checked)
          }
        />
      </ScrollView>
      {pushDeleteMode ? (
        <SafeAreaView style={styles.bottom}>
          <View style={styles.cancel_button_wrapper}>
            <Buttons
              title="취소"
              color="darkgray"
              is_width
              callback={deleteModeChange}
            />
          </View>
          <View style={styles.delete_button_wrapper}>
            <Buttons
              title="선택 항목 삭제하기"
              color="green"
              is_width
              callback={onFetchUpdateAsync}
            />
          </View>
        </SafeAreaView>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 33,
    paddingLeft: 23,
    paddingRight: 23,
    paddingBottom: 23,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 33,
  },
  header_left_child: {
    height: 30,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  header_center_child: {
    height: 30,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  header_right_child: {
    height: 30,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 23,
    fontWeight: "600",
  },
  bottom: {
    flexDirection: "row",
    gap: 10,
    height: 70,
  },
  cancel_button_wrapper: {
    flex: 1,
  },
  delete_button_wrapper: {
    flex: 3,
  },
});
