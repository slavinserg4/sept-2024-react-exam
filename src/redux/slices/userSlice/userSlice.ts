import {IUser} from "../../../models/IUser.ts";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getUser, getUsers} from "../../../services/api.service.users.ts";
import {IUserBaseResponseModel} from "../../../models/IUserBaseResponseModel.ts";


type UserSliceType = {
    users: IUser[];
    user:IUser|null;
    total: number;
    skip: number;
    limit: number;
}

const userInitState: UserSliceType = {
    users: [],
    user:null,
    total: 0,
    skip: 0,
    limit: 10,
}

export const loadUsers = createAsyncThunk('userSlice/loadUsers', async ({ skip, limit, query }: { skip: number; limit: number,query?:string }, thunkAPI) => {
    try {
        const usersFromAPI = await getUsers(skip, limit,query);
        return thunkAPI.fulfillWithValue(usersFromAPI);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});
export const loadUser = createAsyncThunk('userSlice/loadUser', async (id:number, thunkAPI) => {
    try {
        const userFromAPI = await getUser(id);
        return thunkAPI.fulfillWithValue(userFromAPI);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});


export const userSlice = createSlice({
    name: 'userSlice',
    initialState: userInitState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(loadUsers.fulfilled, (state, action: PayloadAction<IUserBaseResponseModel>) => {
                state.users = action.payload.users;
                state.total = action.payload.total;
                state.skip = action.payload.skip;
                state.limit = action.payload.limit;
            })
            .addCase(loadUsers.rejected, (state, action)=>{
                console.log(state)
                console.log(action)
            })
            .addCase(loadUser.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.user = action.payload;
            })
            .addCase(loadUser.rejected, (state, action) => {
                console.log(state);
                console.log(action);
            })
});


export const userSliceActions = {...userSlice.actions, loadUsers, loadUser};
