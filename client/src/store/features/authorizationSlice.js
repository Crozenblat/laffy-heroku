import {createSlice} from "@reduxjs/toolkit";

export const authorizationSlice = createSlice({
    name: "authorization",
    initialState:{
        userId: null,
        username: null
    },
    reducers:{
        authLoginUser: (state, action) => {
            state.userId = action.payload.userId;
            state.username = action.payload.username;
        },
        authLogoutUser:state => {
            state.userId = null;
            state.username = null;
        }
    }
});

export const {authLoginUser, authLogoutUser} = authorizationSlice.actions;
export default authorizationSlice.reducer;