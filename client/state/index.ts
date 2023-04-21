import {configureStore, createSlice } from "@reduxjs/toolkit";
import { IPost, IUser } from "../lib/types";
import { createWrapper } from "next-redux-wrapper";
import {nextReduxCookieMiddleware, wrapMakeStore} from "next-redux-cookie-wrapper";

const initialState = {
    mode:  "light",
    user: null,
    token: null,
    posts: []
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light"
        },
        setLogin: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
        },
        setLogout: (state) => {
            state.user = null
            state.token = null
        },
        setFriends: (state, action) => {
            if( state.user ) {
                const user = state.user as IUser
                user.friends = action.payload.friends
            } else {
                console.error("user friends non-existent")
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts
        },
        setPost: (state, action) => {
            const updatePosts: IPost[] = state.posts.map((post: IPost) => {
                if( post.id === action.payload.post.id ) {
                    return action.payload.post
                }
                return post
            })
            // @ts-ignore
            state.posts = updatePosts
        }
    }
})
const makeStore = wrapMakeStore(() =>
    configureStore({
        reducer: authSlice.reducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().prepend(
                nextReduxCookieMiddleware({
                    subtrees: ["my.subtree"],
                })
            ),
    })
);
export const wrapper = createWrapper(makeStore, {debug: true});
export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } = authSlice.actions
