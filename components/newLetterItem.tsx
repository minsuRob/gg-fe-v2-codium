import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  FlatList,
} from "react-native";
import BottomModal from "./bottomModal";
import { MonoText } from "./styledText";
import {
  LetterInnerContainer,
  LetterInnerInfoView,
  LetterInnerSendText,
  LetterInnerTextBox,
  LetterInnerTitieTextView,
  LetterInnerTitieView,
  LetterInnerUserText,
  LetterOuterContainer
} from "../style/letterItemStyled";
import { SvgImg } from "./svgImg";
import BottemSheet from "./bottemSheet";
import { LetterArrayProps } from "../api/interface";
import { useRecoilState, useSetRecoilState } from "recoil";
import { letterTypeState, replyNameState } from "../atom/letterAtom";
const iconMore = require("../assets/icon/i_more_vert.svg");
const iconGlassesQuestionMark = require("../assets/icon/i_glasses_question_mark.svg");
const i_block = require("../assets/icon/i_block.svg");
type Props = {
  from: string; contents: string;
  is_active: boolean;
};

export const NewLetterItem = ({ letters }: any) => {
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [letterId, setLetterId] = useState(0);
  const [blocked, setBlocked] = useState(false);
  const setSenderNickname = useSetRecoilState(replyNameState);
  const setLetterType = useSetRecoilState(letterTypeState);
  const toggleModal = (props: LetterArrayProps) => {
    setLetterType(true);
    setBottomSheetVisible(true);
    setLetterId(props.id);
    setBlocked(props.isBlocked);
    setSenderNickname(props.senderNickname);
  };

  const closeModal = () => {
    setBottomSheetVisible(false);
  };
  return (
    <>
      <FlatList
        data={letters}
        renderItem={({ item }) =>
          <LetterOuterContainer b_color="#FFFDF0">
            <LetterInnerContainer b_color="#FFFDF0">
              <LetterInnerInfoView>
                <LetterInnerTitieView border_color="#4A4A4E">
                  {/* <TouchableOpacity onPress={() => toggleModal(item.id)}>
                    <SvgImg url={iconGlassesQuestionMark} width={30} height={30} />
                  </TouchableOpacity> */} {/*엿보기 기능이 추가되면 다시 활성화*/}
                  <View />
                  <LetterInnerTitieTextView>
                    <LetterInnerSendText f_color="#4A4A4E">보내는 이</LetterInnerSendText>
                    <LetterInnerUserText f_color="#25796B">{item.senderNickname}</LetterInnerUserText>
                  </LetterInnerTitieTextView>
                  <View style={{ position: 'absolute', left: '98%' }}>
                    <SvgImg
                      url={iconMore}
                      width={30}
                      height={30}
                      onPress={() => toggleModal(item)}
                    />
                  </View>
                  {item.isBlocked ? (
                    <SvgImg
                      url={i_block}
                      width={30}
                      height={30}
                    // onPress={() => toggleModal(item.id)}
                    />
                  ) : (<View />)}
                </LetterInnerTitieView>
              </LetterInnerInfoView>
              <LetterInnerTextBox f_color="#36363B">
                {item.content}
              </LetterInnerTextBox>
            </LetterInnerContainer>
          </LetterOuterContainer>
        }
        keyExtractor={item => item.id.toString()} />
      <BottemSheet isVisible={bottomSheetVisible} onClose={closeModal} letterId={letterId} blocked={blocked} ></BottemSheet>
    </>
  );
};

export default NewLetterItem;