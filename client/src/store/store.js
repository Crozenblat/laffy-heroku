import {configureStore} from "@reduxjs/toolkit";

import authorizationReducer from "./features/authorizationSlice";
import componentVisibilityReducer from "./features/componentVisibilitySlice";

const store = configureStore({
    reducer:{
        authorization: authorizationReducer,
        componentVisibility: componentVisibilityReducer
    }
});

export default store;