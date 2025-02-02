import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUserWithTokens} from "../../../models/IUserWithTokens.ts";
import {loginUser} from "../../../services/api.service.users.ts";


type LoginSliceType = {
    user:IUserWithTokens|null,
    login:boolean,
    error:boolean
}

const loginInitState: LoginSliceType = {
    error: false,
    user: null,
    login:false,
}

type userLoginType = {
    username:string,
    password:string
}

export const userLogin = createAsyncThunk('loginSlice/userLogin', async ({username, password}:userLoginType,thunkAPI) => {
    try {
        const loggedInUser = await loginUser({username, password});
        return thunkAPI.fulfillWithValue(loggedInUser);
    } catch (e: unknown) {
        if (e instanceof Error) {
            return thunkAPI.rejectWithValue(e.message || "Login failed. Please try again.");
        } else {
            return thunkAPI.rejectWithValue("Login failed. Please try again.");
        }}
});


export const loginSlice = createSlice({
    name: 'loginSlice',
    initialState: loginInitState,
    reducers: {
        setLoginToFalse: (state) => {
            state.login = false;
            state.error = false;
        }
    },
    extraReducers: builder =>
        builder
            .addCase(userLogin.fulfilled, (state, action: PayloadAction<IUserWithTokens>) => {
                state.user = action.payload;
                state.login=true
                state.error=false;
            })
            .addCase(userLogin.rejected, (state, action)=>{
                console.log(state)
                console.log(action)
                state.error=true;
            })
});


export const loginSliceActions = {...loginSlice.actions, userLogin}
