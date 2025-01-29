import {IUser} from "../../../models/IUser.ts";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getUsers} from "../../../services/api.service.users.ts";
import {IUserBaseResponseModel} from "../../../models/IUserBaseResponseModel.ts";


type UserSliceType = {
    users: IUser[];
    total: number;
    skip: number;
    limit: number;
}

const userInitState: UserSliceType = {
    users: [],
    total: 0,
    skip: 0,
    limit: 10,
}

export const loadUsers = createAsyncThunk('userSlice/loadUsers', async ({ skip, limit }: { skip: number; limit: number }, thunkAPI) => {
    try {
        const usersFromAPI = await getUsers(skip, limit);
        return thunkAPI.fulfillWithValue(usersFromAPI);
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
});


export const userSliceActions = {...userSlice.actions, loadUsers}
