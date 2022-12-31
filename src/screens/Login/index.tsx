import React from "react";
import { Text, TouchableOpacity } from 'react-native';
import type {NativeStackNavigationProp} from "@react-navigation/native-stack";
import { AuthForm } from "../../components/AuthForm" 
import { styles } from './styles'; 
import { useAuthContext } from "../../context/AuthCountext";
import { Spacer } from "../../components/Spacer";

interface LoginPropos {
    navigation: NativeStackNavigationProp<any, any>;
}

export function Login({ navigation }: LoginPropos) {    
    const { login, errorMessage } = useAuthContext();

    console.log(errorMessage);
    
    function handleRegisterClick(){
        navigation.navigate("SignUp");
    }

    return (
        <>
        <AuthForm
            formTitle='Faça login e começe a usar!'
            submitFormButtonText='Entrar'
            submitFormButtonAction={login}
        />
        <TouchableOpacity onPress={handleRegisterClick}>
            <Text style={styles.link}>Não possui conta? Crie uma agora!</Text>
        </TouchableOpacity>
        {errorMessage && (
           <Spacer>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
           </Spacer> 
        )}
        </>
    );
}