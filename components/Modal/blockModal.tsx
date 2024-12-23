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
import { replyBlock } from '../../api/repliesApi';
const i_yes = require("../../assets/icon/i_block_yes.svg");
const i_no = require("../../assets/icon/i_no.svg");
const BlockModal = ({ isVisible, onClose, letterId, letterType, replyId }: BottomSheetProps) => {
    const [blockCheck, setBlockCheck] = useRecoilState(letterUpdateState);
    const onBlock = async () => {
        if (letterType) {

            await letterBlock(letterId);
        }
        else {
            await replyBlock(replyId);
        }
        setBlockCheck(!blockCheck);
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
                    <MonoText style={{ fontSize: 16, fontWeight: 'bold', color: '#FFFDF0' }}>사용자를 차단하시겠습니까?</MonoText>
                    <MonoText style={{ color: '#98989B' }}>차단한 사용자로부터는 편지를 받을 수 없어요.</MonoText>
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
                            title='차단하기'
                            width={141}
                            color='green'
                            callback={onBlock}
                            auth={true}
                        />
                    </DeleteModalButtonView>
                </DeleteModaContentlView>
            </DeleteModalView>
        </Modal>
    )
}

export default BlockModal