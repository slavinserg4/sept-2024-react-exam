import {IRecipe} from "../../../models/IRecipe.ts";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IRecipeBaseResponseModel} from "../../../models/IRecipeBaseResponseModel.ts";
import {getRecipe, getRecipes} from "../../../services/api.service.users.ts";


type RecipeSliceType = {
    recipes:IRecipe[];
    recipe:IRecipe|null;
    total: number;
    skip: number;
    limit: number;
}

const recipeInitState: RecipeSliceType = {
    recipes:[],
    recipe:null,
    total: 0,
    skip: 0,
    limit: 10,
}

export const loadRecipes = createAsyncThunk('recipeSlice/loadRecipes', async ({ skip, limit, query }: { skip: number; limit: number, query?:string }, thunkAPI) => {
    try {
        const recipesFromAPI = await getRecipes(skip, limit,query)
        return thunkAPI.fulfillWithValue(recipesFromAPI);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});
export const loadRecipe = createAsyncThunk('recipeSlice/loadRecipe', async (id:number, thunkAPI) => {
    try {
        const recipeFromAPI = await getRecipe(id)
        return thunkAPI.fulfillWithValue(recipeFromAPI);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});


export const recipeSlice = createSlice({
    name: 'recipeSlice',
    initialState: recipeInitState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(loadRecipes.fulfilled, (state, action: PayloadAction<IRecipeBaseResponseModel>) => {
                state.recipes = action.payload.recipes;
                state.total = action.payload.total;
                state.skip = action.payload.skip;
                state.limit = action.payload.limit;
            })
            .addCase(loadRecipes.rejected, (state, action)=>{
                console.log(state)
                console.log(action)
            })
            .addCase(loadRecipe.fulfilled, (state, action:PayloadAction<IRecipe>)=>{
                state.recipe=action.payload
            })
            .addCase(loadRecipe.rejected, (state, action) => {
                console.log(state);
                console.log(action);
            })
});


export const recipeSliceActions = {...recipeSlice.actions, loadRecipes, loadRecipe};
