import {IRecipe} from "../../../models/IRecipe.ts";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getRecipes} from "../../../services/api.service.recipes.ts";


type RecipeSliceType = {
    recipes:IRecipe[]
    recipe:IRecipe|null
    login:boolean;
}

const recipeInitState: RecipeSliceType = {
    recipes:[],
    recipe:null,
    login: false
}

export const loadRecipes = createAsyncThunk('recipeSlice/loadRecipes', async (login:boolean, thunkAPI) => {
    try {
        if(login){
            const recipesFromAPI = await getRecipes()
            return thunkAPI.fulfillWithValue(recipesFromAPI);
        }
        return thunkAPI.rejectWithValue(new Error('You are not logged in.'))
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
            .addCase(loadRecipes.fulfilled, (state, action: PayloadAction<IRecipe[]>) => {
                state.recipes = action.payload;
            })
            .addCase(loadRecipes.rejected, (state, action)=>{
                console.log(state)
                console.log(action)
            })
});


export const recipeSliceActions = {...recipeSlice.actions, loadRecipes}
