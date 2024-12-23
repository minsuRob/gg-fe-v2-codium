import React, { useEffect, useState } from "react";

import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import CreateHeader from "../components/createHeader";
import { buttons_text, colors } from "../constants/Colors";
import { MonoText } from "../components/styledText";
import CreateHotelColorItem from "../components/createHotelColor";
import Buttons from "../components/buttons";
import CustomUserHotel from "../components/customUserHotel";
import CreateHotelDeco from "../components/createHotelDeco";
import CreateHotelDecoV2 from "../components/createHotelDecoV2";
import { useNavigation } from "expo-router";
import Header from "../components/appHeader";

export default function CreateHotel() {
  const [structColor, setStructColor] = useState("#CF332C");
  const [wallColor, setWallColor] = useState("#CF332C");
  const [buildingDecorator, setBuildingDecorator] = useState("buildingDeco01");
  const [gardenDecorator, setGardenDeco] = useState("gardenDeco01");
  const [windowDecorator, setWindowDeco] = useState("windowDeco01");
  const [background, setBackground] = useState("background01");
  const [activeTitle, setTitle] = useState("벽면");
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  // 변경할 수 있는 컬러 리스트
  const selectColors = [
    "#CF332C",
    "#FD883F",
    "#FFB950",
    "#C7DA82",
    "#82DAB9",
    "#FFA6BB",
    "#143561",
    "#8A61AC",
    "#FBDFC0",
    "#343434",
  ];

  const titleList = ["벽면", "뼈대", "건물장식", "마당장식", "창문", "뒷배경"];
  const buildingList = ["buildingDeco01", "buildingDeco02", "buildingDeco03"];
  const windowList = ["windowDeco01", "windowDeco02"];
  const gardenList = ["gardenDeco01", "gardenDeco02", "gardenDeco03"];
  const backgroundList = ["background01", "background02", "background03"];

  return (
    <>
      <Header disabledIcon={true} title="호텔 만들기" />
      <CreateHeader isActiveNumber={1} />
      <ScrollView>
        <View style={styles.container}>
          <View>
            <CustomUserHotel
              is_border={true}
              wallColor={wallColor}
              structColor={structColor}
              gardenDecorator={gardenDecorator}
              windowDecorator={windowDecorator}
              buildingDecorator={buildingDecorator}
              background={background}
            />
          </View>
          <View style={styles.deco_wrapper}>
            <View style={styles.title_wrapper}>
              {titleList?.map((title) => (
                <TouchableOpacity key={title} onPress={() => setTitle(title)}>
                  <MonoText
                    style={[
                      styles.title,
                      title === activeTitle && styles.title_active,
                    ]}
                  >
                    {title}
                  </MonoText>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.color_wrapper}>
              {(activeTitle === "벽면" || activeTitle === "뼈대") &&
                selectColors?.map((color, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() =>
                      activeTitle === "벽면"
                        ? setWallColor(color)
                        : setStructColor(color)
                    }
                  >
                    <CreateHotelColorItem
                      key={index}
                      color={color}
                      index={index}
                      active={activeTitle === "벽면" ? wallColor : structColor}
                    ></CreateHotelColorItem>
                  </TouchableOpacity>
                ))}
            </View>
            <View style={styles.building_wrapper}>
              {activeTitle === "건물장식" &&
                buildingList?.map((url, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setBuildingDecorator(url)}
                  >
                    <CreateHotelDeco
                      activeTitle={activeTitle}
                      key={index}
                      item={url}
                      index={index}
                      active={buildingDecorator}
                    ></CreateHotelDeco>
                  </TouchableOpacity>
                ))}
            </View>

            <View style={styles.building_wrapper}>
              {activeTitle === "마당장식" &&
                gardenList?.map((url, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setGardenDeco(url)}
                  >
                    <CreateHotelDeco
                      activeTitle={activeTitle}
                      key={index}
                      item={url}
                      index={index}
                      active={gardenDecorator}
                    ></CreateHotelDeco>
                  </TouchableOpacity>
                ))}
            </View>
            <View style={styles.building_wrapper}>
              {activeTitle === "뒷배경" &&
                backgroundList?.map((url, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setBackground(url)}
                  >
                    <CreateHotelDeco
                      activeTitle={activeTitle}
                      key={index}
                      item={url}
                      index={index}
                      active={background}
                    ></CreateHotelDeco>
                  </TouchableOpacity>
                ))}
            </View>

            <View style={styles.building_wrapper}>
              {activeTitle === "창문" &&
                windowList?.map((name, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setWindowDeco(name)}
                  >
                    <CreateHotelDecoV2
                      key={index}
                      url={name}
                      index={index}
                      active={windowDecorator}
                    ></CreateHotelDecoV2>
                  </TouchableOpacity>
                ))}
            </View>
          </View>

          <View style={styles.btn_wrapper}>
            <Buttons
              url="createHotelName"
              props={{
                structColor,
                bodyColor: wallColor,
                windowDecorator,
                gardenDecorator,
                buildingDecorator,
                background,
              }}
              title="다음으로"
              color="green"
            />
            <MonoText style={styles.hotel_info}>
              ※호텔 색상은 나중에도 수정할 수 있어요!
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
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  img_wrapper: {
    borderWidth: 0.3,
    borderColor: colors.grey500,
    zIndex: 3,
    marginTop: 10,
    padding: 10,
    borderRadius: 12,
    marginLeft: 5,
    width: "98%",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    color: buttons_text.gray,
  },
  title_active: {
    color: buttons_text.green,
    borderBottomColor: buttons_text.green,
    borderBottomWidth: 1,
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
  deco_wrapper: {
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 30,
  },
  title_wrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  color_wrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: 20,
    gap: 10,
  },
  building_wrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 0,
    gap: 3,
  },
  hotel_info: {
    color: colors.grey500,
    fontSize: 10,
  },
});
