import {configureStore} from "@reduxjs/toolkit";
import chatSliceReducer from "./chatSlice.js";

const store = configureStore({
    reducer: chatSliceReducer
});

export default store;