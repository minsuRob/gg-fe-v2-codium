import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { MonoText } from "../components/styledText";
import { colors } from "../constants/Colors";
import Buttons from "../components/buttons";
import FeekChargeItem from "../components/feekChargeItem";
import CheckBox from "../components/chekbox";

const FeekCharge = () => {
  const [feekCount, setFeekCount] = useState(0);
  const [checked, setChecked] = useState(false);
  const [selected, setSelected] = useState({
    five: true,
    ten: false,
    fifteen: false,
    twenty: false,
  });
  const handleItemPress = (item: keyof typeof selected) => {
    const updatedSelect: { [key in keyof typeof selected]: boolean } = {
      five: false,
      ten: false,
      fifteen: false,
      twenty: false,
    };
    updatedSelect[item] = true;
    setSelected(updatedSelect);
  };

  return (
    <View style={styles.container}>
      <View style={styles.top_box}>
        <MonoText
          style={{
            color: colors.Whiteyello,
            fontWeight: "700",
            fontSize: 16,
            marginBottom: 20,
          }}
        >
          현재 보유한 엿보기{" "}
          <MonoText style={{ color: colors.green500 }}>{feekCount}개</MonoText>
        </MonoText>
        <View style={styles.feek_item_box}>
          <FeekChargeItem
            isSelected={selected.five}
            ea={5}
            price={"500"}
            onPress={() => {
              handleItemPress("five");
            }}
          />
          <FeekChargeItem
            isSelected={selected.ten}
            ea={10}
            price={"900"}
            onPress={() => {
              handleItemPress("ten");
            }}
          />
          <FeekChargeItem
            isSelected={selected.fifteen}
            ea={15}
            price={"1,300"}
            onPress={() => {
              handleItemPress("fifteen");
            }}
          />
          <FeekChargeItem
            isSelected={selected.twenty}
            ea={20}
            price={"1,700"}
            onPress={() => {
              handleItemPress("twenty");
            }}
          />
        </View>
        <View style={styles.info_box}>
          <View style={styles.info_text_box}>
            <MonoText style={styles.list_style}>⋅ </MonoText>
            <MonoText style={styles.info_text}>
              엿보기는{" "}
              <MonoText style={styles.info_tint}>
                나에게 편지를 보낸 사람의 정체
              </MonoText>
              를 상대방에게 물어볼 수 있는 기능이에요. 편지에서 엿보기 아이콘을
              눌러 답변 요청을 보낼 수 있어요.
            </MonoText>
          </View>
          <View style={styles.info_text_box}>
            <MonoText style={styles.list_style}>⋅ </MonoText>
            <MonoText style={styles.info_text}>
              <MonoText style={styles.info_tint}>
                편지 1개당 엿보기 1개를 1번
              </MonoText>{" "}
              사용할 수 있어요. (동일 편지에 여러 번 사용이 불가해요.)
            </MonoText>
          </View>
          <View style={styles.info_text_box}>
            <MonoText style={styles.list_style}>⋅ </MonoText>
            <MonoText style={styles.info_text}>
              엿보기를 사용하더라도 상대방은 엿보기 요청을 거절 할 수 있어요.
              "거절"을 받더라도 엿보기는 소모되니 유의해주세요.
            </MonoText>
          </View>
          <View style={styles.info_text_box}>
            <MonoText style={styles.list_style}>⋅ </MonoText>
            <MonoText style={styles.info_text}>
              한번 사용된 엿보기는 사라져버려요. 신중하게 사용해주세요!
            </MonoText>
          </View>
          <View style={styles.info_text_box}>
            <MonoText style={styles.list_style}>⋅ </MonoText>
            <MonoText style={styles.info_text}>
              충전한 엿보기는 PC, 모바일, 앱에서 모두 사용 가능해요.
            </MonoText>
          </View>
        </View>
      </View>

      <View style={styles.bottom_box}>
        <CheckBox
          text="(필수) 아래의 유의사항을 모두 확인했습니다."
          bg
          checked={checked}
          onPress={() => {
            setChecked((prevChecked) => !prevChecked);
          }}
        />

        <View style={styles.button_wrapper}>
          {checked ? (
            <Buttons color={"green"} title={"결제하기"} />
          ) : (
            <Buttons color={"grey"} title={"결제하기"} is_disable={true} />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: colors.greyblack,
    paddingTop: 33,
    paddingLeft: 23,
    paddingRight: 23,
    paddingBottom: 23,
    width: "100%",
    height: "100%",
  },
  top_box: {
    width: "100%",
    flex: 8.5,
  },

  feek_item_box: {
    gap: 10,
    marginBottom: 20,
  },

  info_box: {
    width: "100%",
  },
  info_text_box: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  list_style: { fontSize: 20, fontWeight: "700", marginRight: 5 },
  info_text: {
    color: colors.Whiteyello,
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 20,
  },
  info_tint: { color: colors.green500, fontWeight: "700", fontSize: 12 },

  bottom_box: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flex: 1.5,
  },
  button_wrapper: { height: 52, width: "100%" },
});

export default FeekCharge;
