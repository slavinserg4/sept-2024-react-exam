import {configureStore} from "@reduxjs/toolkit";
import {userSlice} from "./slices/userSlice/userSlice.ts";
import {recipeSlice} from "./slices/recipeSlice/recipeSlice.ts";
import {loginSlice} from "./slices/loginSlice/loginSlice.ts";


export const store = configureStore({
    reducer: {
        userPart: userSlice.reducer,
        recipePart:recipeSlice.reducer,
        loginPart: loginSlice.reducer,
    }
});