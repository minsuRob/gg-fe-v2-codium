
import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import NewLetterItem from "../../components/newLetterItem";
import MailHeader from "../../components/mailHeader";
import ReplyLetterItem from "../../components/replyLetterItem";
import { useRecoilValue } from "recoil";
import {
    hotelIdState,
    letterSwitchState,
    letterUpdateState,
} from "../../atom/letterAtom";
import ReplyBoxHeader from "../../components/replyBoxHeader";
import { useQuery } from "react-query";
import { newLetterData, repliesLetterData } from "../../api/letterApi";
import { useNavigation, useLocalSearchParams } from "expo-router";
import ReplyLetterBoxItem from "../../components/replyLetterBoxItem";


export default function ReplyBox() {
    const deleteCheck = useRecoilValue(letterUpdateState);
    const { id } = useLocalSearchParams();
    const { data, isLoading, refetch } = useQuery(
        "repliesLetter",
        async () => await repliesLetterData(id)
    );
    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);
    useEffect(() => {
        refetch();
    }, [deleteCheck])
    // console.log(data?.letter);
    if (isLoading) {
        return <Text>...로딩중</Text>
    }
    return (
        <View style={styles.container}>
            <ReplyBoxHeader />
            <ReplyLetterBoxItem letter={data.letter} replies={data.replies} />
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
