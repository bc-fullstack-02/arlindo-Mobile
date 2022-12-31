import React, { ReactNode, useReducer } from "react";
import { Action } from "../@types/reducer";
import * as SecureStore from "expo-secure-store";
import { navigate } from '../../RootNavigation';
import api from "../services/api";
import { getAuthHeader } from "../services/auth"; 

const defaultValue = { posts: [], errorMessage: null}

const Context = React.createContext(defaultValue);

const Provider = ({ children}:  { children: ReactNode }) => {
    const reducer = (state: any, action: Action) => {
        switch(action.type) {

            case "create_post":

                return {...state, posts: [action.payload, ...state.posts] };
            case "show_posts":
                return {...state, posts: action.payload};

            case "like_posts":
                
                const newPostsLike = state.posts;
                const [postLike, ..._] = newPostsLike.filter((post) => post.id === action.payload.id
                );
                postLike.likes.push(action.payload.profile);

                return {...state, posts: [...newPostsLike] };

            case "unlike_posts":

                const newPostsUnlike = state.posts;
                const [postUnlike, ...rest] = newPostsUnlike.filter((post) => post.id === action.payload.id
                );
                const index = PostsUnlike.likes.indexOf(action.payload.profile);
                PostsUnlike.likes.splice(index, 1);
                return {...state, posts: [...newPostsUnlike] };
        }
    }
    const [state, dispatch] = useReducer(reducer, defaultValue);

    const getposts = async () => {
        try {
          const authHeader = await getAuthHeader();
          const response = await api.get("/feed", authHeader);
          dispatch({ type: "show_posts", payload: response.data });
        } catch(error) {
          console.error(error);
        }
    }
    const likepost = async ({postId}) => {
        try {
          const authHeader = await getAuthHeader();
          await api.post(`{postId}/like`, null, authHeader);
          const profile = await SecureStore.getItemAsync("profile");
          dispatch({ type: "like_post", payload: {id: postId, profile: profile}, });
        } catch(error) {
          console.error(error);
        }
    }
    const unlikePosts = async (postId) => {
        try {
          const authHeader = await getAuthHeader();
          await api.post(`/posts/${postId}/unlike`, null authHeader());
          const profile = await SecureStore.getItemAsync("profile");
          dispatch({ type: "like_post", payload: {id: postId, profile: profile}, });
        } catch(error) {
          console.error(error);
        }
    }
    const createPost = async ( { title, description} ) => {
        try {
            const authHeader = await getAuthHeader();
            const response = await api.post(
                "/post",
                {title, description},
                authHeader              
            ); 
            dispatch({type: "create_post", payload: response.data});
            navigate("Home");          
        } catch(error) {
          console.error(error);
        }
    };

    return(
        <Context.Provider
            value={{
                ...state,
                getposts,
                createPost,
                likeposts,
                unlikeposts,
            }}
        >
            {children}
        </Context.Provider>

    );
};

export { Provider, Context };