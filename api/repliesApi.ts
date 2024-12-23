import axios from "axios";
import { REPLIES_URL } from "./url";
import { NewReply } from "./interface";

export const newReply = async (props: NewReply) => {
    try {
        const response = await axios.post(`${REPLIES_URL}/letter/${props.letterId}`, props);
        return response.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
};
export const replyDelete = async (replyId: number) => {
    try {
        const response = await axios.delete(`${REPLIES_URL}/${replyId}`);
        console.error(response)
        return response.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const replyBlock = async (replyId: number) => {
    try {
        const response = await axios.post(`${REPLIES_URL}/${replyId}/block`);
        console.error(response)
        return response.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}
export const replyUnBlock = async (replyId: number) => {
    try {
        const response = await axios.post(`${REPLIES_URL}/${replyId}/unblock`);
        console.error(response)
        return response.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}
