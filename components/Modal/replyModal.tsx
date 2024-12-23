import React, { useState } from 'react'
import { DeleteModaContentlView, DeleteModalButtonView, DeleteModalView } from '../../style/deleteModalStyled'
import { Text, View } from '../themed'
import Modal from 'react-native-modal';
import { BottomSheetProps } from '../../api/interface';
import { MonoText } from '../styledText';
import { SvgImg } from '../svgImg';
import { letterBlock, letterDelete } from '../../api/letterApi';
import { useMutation, useQueryClient } from 'react-query';
import { useRecoilState } from 'recoil';
import { letterUpdateState } from '../../atom/letterAtom';
import Buttons from '../buttons';
import { colors } from "../../constants/Colors";
const ReplyModal = ({ isVisible, onClose, letterId, letterType }: BottomSheetProps) => {
  // const [replyCheck, setReplykCheck] = useRecoilState(letterUpdateState);
  const onReply = () => {
    // await letterBlock(letterId);
    // setReplykCheck(!replyCheck);
    onClose();
  };
  return (
    <Modal
      isVisible={isVisible}
      style={{ margin: 0, backgroundColor: "transparent", height: 500 }}
      backdropOpacity={0.2}
    >
      <DeleteModalView>
        <DeleteModaContentlView>
          <MonoText
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: '#FFFDF0'
            }}
          >
            답장을 보낼까요?
          </MonoText>
          <MonoText style={{ color: colors.grey400 }}>
            답장은 친구의 오늘자 편지함에 전달돼요!
          </MonoText>
          <DeleteModalButtonView>
            {/* <SvgImg url={i_no} width={141} height={46} onPress={onClose} /> */}
            <Buttons
              title="취소하기"
              width={141}
              color="gray_700"
              callback={onClose}
              auth={true}
            />
            {/* <SvgImg url={i_yes} width={141} height={46} onPress={onReply} /> */}
            <Buttons
              title="답장쓰기"
              url={`reply/${letterId}`}
              width={141}
              color="green"
              callback={onReply}
              props={letterId}
              auth={true}
            />
          </DeleteModalButtonView>
        </DeleteModaContentlView>
      </DeleteModalView>
    </Modal>
  );
};

export default ReplyModal