import {IUser} from "../../../models/IUser.ts";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getUsers} from "../../../services/api.service.users.ts";


type UserSliceType = {
    users: IUser[];
    user: IUser | null;
    login:boolean;
}

const userInitState: UserSliceType = {
    users: [],
    user: null,
    login: false
}

export const loadUsers = createAsyncThunk('userSlice/loadUsers', async (login:boolean, thunkAPI) => {
    try {
        if(login){
            const usersFromAPI = await getUsers()
            return thunkAPI.fulfillWithValue(usersFromAPI);
        }
        return thunkAPI.rejectWithValue(new Error('You are not logged in.'))
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});


export const userSlice = createSlice({
    name: 'userSlice',
    initialState: userInitState,
    reducers: {
        setUserLogin:(state) =>{
            state.login = !state.login
        }
    },
    extraReducers: builder =>
        builder
            .addCase(loadUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
                state.users = action.payload;
            })
            .addCase(loadUsers.rejected, (state, action)=>{
                console.log(state)
                console.log(action)
            })
});


export const userSliceActions = {...userSlice.actions, loadUsers}
