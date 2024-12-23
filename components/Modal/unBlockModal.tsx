import React, { useState } from 'react'
import { DeleteModaContentlView, DeleteModalButtonView, DeleteModalView } from '../../style/deleteModalStyled'
import { Text, View } from '../themed'
import Modal from 'react-native-modal';
import { BottomSheetProps } from '../../api/interface';
import { MonoText } from '../styledText';
import { SvgImg } from '../svgImg';
import { letterUnBlock } from '../../api/letterApi';
import { useRecoilState } from 'recoil';
import { letterUpdateState } from '../../atom/letterAtom';
import Buttons from '../buttons';
import { replyUnBlock } from '../../api/repliesApi';
const i_yes = require("../../assets/icon/i_clear.svg");
const i_no = require("../../assets/icon/i_no.svg");
const UnBlockModal = ({ isVisible, onClose, letterId, letterType, replyId }: BottomSheetProps) => {
    const [unBlockCheck, setUnBlockCheck] = useRecoilState(letterUpdateState);
    const onUnBlock = async () => {
        if (letterType) {

            await letterUnBlock(letterId);
        }
        else {
            await replyUnBlock(replyId);
        }
        setUnBlockCheck(!unBlockCheck);
        onClose();
    }
    return (
        <Modal
            isVisible={isVisible}
            style={{ margin: 0, backgroundColor: 'transparent' }}
            backdropOpacity={0.2}
        >
            <DeleteModalView>
                <DeleteModaContentlView>
                    <MonoText style={{ fontSize: 16, fontWeight: 'bold', color: '#FFFDF0' }}>차단을 해제하시겠습니까?</MonoText>
                    <MonoText style={{ color: '#98989B' }}>차단을 해제하면 다시 편지를 주고 받을 수 있어요.</MonoText>
                    <DeleteModalButtonView>
                        <Buttons
                            title='취소하기'
                            width={141}
                            color='gray_700'
                            callback={onClose}
                            auth={true}
                        />
                        {/* <SvgImg url={i_yes} width={141} height={46} onPress={onReply} /> */}
                        <Buttons
                            title='해제하기'
                            width={141}
                            color='green'
                            callback={onUnBlock}
                            auth={true}
                        />
                    </DeleteModalButtonView>
                </DeleteModaContentlView>
            </DeleteModalView>
        </Modal>
    )
}

export default UnBlockModal