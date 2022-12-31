import React, {useContext} from "react";
import { UserCircle } from "phosphor-react-native";
import { View, Text } from "react-native";

import { Context as AuthContext } from '../../context/AuthCountext';

import { styles } from "./styles";
import { Button } from "../../components/Button";
import { THEME } from "../../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export function Profile() {
    const {user, logout} = useContext(AuthContext);

    return (
        <SafeAreaView style={styles.container}>
        <StatusBar
            barStyle="light-content"
            backgroundColor={THEME.COLORS.BACKGROUND_800}
            />
            <View style={styles.heading}>
                <UserCircle color="white" size={48} weight="thin"/>
                <Text style={styles.userNameText}>{user}</Text>
            </View> 
            <Button title="Sair" onPress={logout}/>
            </SafeAreaView>
    );
}

