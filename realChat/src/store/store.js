import {configureStore} from "@reduxjs/toolkit";
import chatSliceReducer from "./chatSlice.js";

const store = configureStore({
    reducer: {
        "auth":chatSliceReducer
    }
});

export default store;