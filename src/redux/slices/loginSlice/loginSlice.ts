import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUserWithTokens} from "../../../models/IUserWithTokens.ts";
import {loginUser} from "../../../services/api.sercive.login.ts";
import {userSliceActions} from "../userSlice/userSlice.ts";
import {recipeSliceActions} from "../recipeSlice/recipeSlice.ts";


type LoginSliceType = {
    user:IUserWithTokens|null
}

const loginInitState: LoginSliceType = {
    user: null,
}

type userLoginType = {
    username:string,
    password:string
}

export const userLogin = createAsyncThunk('loginSlice/userLogin', async ({username, password}:userLoginType,thunkAPI) => {
    try {
        const loggedInUser = await loginUser({ username, password });
        await thunkAPI.dispatch(userSliceActions.loadUsers(true));
        await thunkAPI.dispatch(recipeSliceActions.loadRecipes(true));
        thunkAPI.dispatch(userSliceActions.setUserLogin());

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
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(userLogin.fulfilled, (state, action: PayloadAction<IUserWithTokens>) => {
                state.user = action.payload;

            })
            .addCase(userLogin.rejected, (state, action)=>{
                console.log(state)
                console.log(action)
            })
});


export const loginSliceActions = {...loginSlice.actions, userLogin}
