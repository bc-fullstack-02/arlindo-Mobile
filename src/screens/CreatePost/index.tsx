import React, { useContext, useState } from "react";
import { Text, View } from "react-native";
import { UserCircle } from "phosphor-react-native";

import { Context, useAuthContext } from "../../context/AuthCountext";
import { Context as PostContext } from "../../context/PostContext";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Spacer } from "../../components/Spacer";
import { THEME } from "../../theme";

import { styles } from './styles';


export function CreatPost() {
    const { user } = useContext(AuthContext); 
    const { createPost } = useContext(PostContext);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    return (
       <View style={styles.container}>
        <View style={styles.heading}>
                <UserCircle color="white" size={48} weight="thin"/>
                <Text style={styles.userNameText}>{user}</Text>
                <View style={{ flex: 1 }}></View>
            </View>
            <Spacer>
                <Input.Root>
                    <Input.Input 
                        value={title}
                        onChangeText={setTitle}
                        placeholder="Digite o título do post" 
                        placeholderTextColor={THEME.COLORS.INPUT}
                        autoCorrect
                    />                        
                </Input.Root>
            </Spacer>
            <Spacer>
                <Input.Root>
                    <Input.Input 
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Digite a descrição do post" 
                        placeholderTextColor={THEME.COLORS.INPUT}
                        autoCorrect
                    />                        
                </Input.Root> 
            </Spacer>
            <Spacer>
            <Button
            title="Postar" 
            onPress={() => {
                createPost && createPost({ title, description });
            }} />
            </Spacer>
        </View>
    );
}
