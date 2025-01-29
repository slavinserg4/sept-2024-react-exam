import {IRecipe} from "../models/IRecipe.ts";

export const mergeRecipesWithUsers = (recipes: IRecipe[], userId:number): IRecipe[] => {
    return recipes.filter(recipe => recipe.userId === userId);
}