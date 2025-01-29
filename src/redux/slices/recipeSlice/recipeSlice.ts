import {IRecipe} from "../../../models/IRecipe.ts";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getRecipes} from "../../../services/api.service.recipes.ts";
import {IRecipeBaseResponseModel} from "../../../models/IRecipeBaseResponseModel.ts";


type RecipeSliceType = {
    recipes:IRecipe[];
    total: number;
    skip: number;
    limit: number;
}

const recipeInitState: RecipeSliceType = {
    recipes:[],
    total: 0,
    skip: 0,
    limit: 10,
}

export const loadRecipes = createAsyncThunk('recipeSlice/loadRecipes', async ({ skip, limit }: { skip: number; limit: number }, thunkAPI) => {
    try {
        const recipesFromAPI = await getRecipes(skip, limit)
        return thunkAPI.fulfillWithValue(recipesFromAPI);
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
});


export const recipeSliceActions = {...recipeSlice.actions, loadRecipes}
