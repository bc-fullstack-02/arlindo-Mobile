import { Chat, Heart, UserCircle } from 'phosphor-react-native';
import React, {useContext} from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Post } from '../../@types/post';
import { Context as PostContext } from '../../context/PostContext';
import { Context as AuthContext } from '../../context/AuthCountext';
import { styles } from './styles';

interface PostItemProps {
    post: Post;
}

export function PosItem ({ post }: Post) {
    const {likePost} = useContext(PostContext);
    const { profile } = useContext(AuthContext);

    function handleLikePress() {
       if( post.likes.includes(profile)){
            unlikePost && unlikePost ({ postId: post._id})
       } else {
        likePost && likePost({postId: post._id});
       }
    }

    return(
        <View style={styles.post}>
                <View style={styles.postHeading}>
                    <UserCircle color="white" size={48} weight="thin"/>
                    <Text style={styles.postUserText}>{post.profile.name}</Text>
                </View>
                {post. image ? (
                    <Image source={post.description} style={styles.image}></Image>
                ) : (
                <View style={styles.contentBody}>
                    <Text style={styles.contentText}>{post.description}</Text>
                </View> 
                )}
                  <View style={styles.footer}>
                  <Chat size={24} color="white" weight="thin" />
                  <Text style={styles.number}>{post.likes.length}</Text>
                  <TouchableOpacity
                    onPress={() => {
                       
                    }}
                    >
                  <Heart size={24} color="white" weight="thin" />
                  </TouchableOpacity>
                  <Text style={styles.number}>{post.likes.length}</Text>
                </View> 
        </View>       
    );
}
