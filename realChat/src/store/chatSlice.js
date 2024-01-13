import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    mode: 'light',
    roomUsers: null,
    userName: null,
    roomId: '',
    token: null,
    messages:[],
}


const chatSlice = createSlice(
    {
        name:'ChatApp',
        initialState,
        reducers: {
            setMode: (state) => {
                state.mode = (state.mode === "light") ? "dark":"light"
            },
            setLogin: (state, action) => {
                state.user = action.payload.user
                state.token = action.payload.token
            },
            setLogout : (state, action) => {
                state.user = null;
                state.token = null;
                state.messages = []
            },
            setMessage: (state, action) => {
                let newMessage = action.payload;
                console.log(action.payload)

                state.messages.push(newMessage)
            },
            setRoomID : (state, action) => {
                state.roomId = action.payload.roomId;
            },
            setUserName : (state, action) => {
                state.userName = action.payload.userName;
            }
        }
    }
);


export const { setLogin, setLogout, setMode, setMessage, setRoomID, setUserName  } = chatSlice.actions;

export default chatSlice.reducer;