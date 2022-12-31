import React, { useContext, useEffect } from "react";
import { StatusBar, View, Text, FlatList, TouchableOpacity } from "react-native";
import {  SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { UserCircle, PencilSimple } from "phospor-react-native";

import { Context as AuthContext } from '../../context/AuthCountext';
import { Context } from '../../context/PostContext';

import { THEME } from "../../theme";
import { styles } from "./styles";
import { FocusAwareStatusBar } from "../../components/FocusAwareStatusBar";
import { PosItem } from "../../components/PostItem";


interface HomeProps {
    navigation: NativeStackNavigationProp<any, any>;
}

export function Home({navigation}) {
    const { user } = useContext(AuthContext);
    const { getPosts, posts } = useContext(PostContext);

    useEffect(() => {
        getPosts && getPosts();
    }, []);

    function handlePencilPress() {
        navigation.navigate("CreatePost");
    }

    return ( 
        <SafeAreaView style={styles.container}>
            <FocusAwareStatusBar 
                barStyle="light-content"
                backgroundColor={THEME.COLORS.BACKGROUND_800}
            />
            <View style={styles.heading}>
                <UserCircle color="white" size={48} weight="thin"/>
                <Text style={styles.userNameText}>{user}</Text>
                <TouchableOpacity onPress={handlePencilPress}>
                <PencilSimple color="white" size={40} weighy="thin" />
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <FlatList
                    data={posts}
                    keyExtractor={({_id}) => _id}
                    renderItem={({ item }) => <PostItem post={item} />}
                />
            </View>
        </SafeAreaView>
    );
}