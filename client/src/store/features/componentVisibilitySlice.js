import {createSlice} from "@reduxjs/toolkit";

export const componentVisibilitySlice = createSlice({
    name: "componentVisibility",
    initialState:{
        deleteAccountModalVisible: false
    },
    reducers:{
        makeDeleteAccountModalVisible: state => {
            state.deleteAccountModalVisible = true;
        },
        makeDeleteAccountModalInvisible: state => {
            state.deleteAccountModalVisible = false;
        }
    }
});

export const {makeDeleteAccountModalVisible, makeDeleteAccountModalInvisible} = componentVisibilitySlice.actions;
export default componentVisibilitySlice.reducer;