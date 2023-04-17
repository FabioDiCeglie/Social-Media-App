import { configureStore, createSlice } from "@reduxjs/toolkit";
import { IPost, IUser } from "../lib/types";

const initialState = {
    mode: "light",
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

// config the store
const store = configureStore({
    reducer: {
        authSlice: authSlice.reducer
    }
})

export default store
export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } = authSlice.actions
