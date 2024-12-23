
import { atom } from "recoil";
import { User } from "../api/interface";
import { recoilPersist } from 'recoil-persist';
interface letterCountType {
    lettersLen: number,
    repliesLen: number
}
interface letterSwitchType {
    new: boolean,
    reply: boolean
}
const { persistAtom } = recoilPersist();
export const letterSwitchState = atom<letterSwitchType>({
    key: 'letterSwitchState',
    default: {
        new: true,
        reply: false
    }
})
export const hotelIdState = atom<string | string[]>({
    key: 'hotelIdState',
    default: '0'
})
export const newLetterCountState = atom<number>({
    key: 'newLetterCount',
    default: 0
})
export const letterUpdateState = atom<boolean>({
    key: 'letterUpdateState',
    default: false
})
export const replyNameState = atom<string>({
    key: 'replyNameState',
    default: ''
})
export const userCodeState = atom<User>({
    key: 'userCodeState',
    default: {
        nickname: "",
        code: "",
        membership: "",
        gender: null,
        birthDate: null,
        keyCount: 0,
        feekCount: 0,
    },
    effects_UNSTABLE: [persistAtom],
})
export const letterCountState = atom<letterCountType>({
    key: 'userCodeState',
    default: {
        lettersLen: 0,
        repliesLen: 0
    },
    effects_UNSTABLE: [persistAtom],
})
export const letterTypeState = atom<boolean>({
    key: 'letterTypeState',
    default: true
})

export const windowDateState = atom<number>({
    key: 'windowDateState',
    default: 0,
    effects_UNSTABLE: [persistAtom],
})