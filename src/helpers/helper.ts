import {IRecipe} from "../models/IRecipe.ts";

export const mergeRecipesWithUsers = (recipes: IRecipe[] | undefined, userId: number): IRecipe[] => {
    if (!Array.isArray(recipes)) return [];
    console.log(recipes)
    return recipes.filter(recipe => Number(recipe.userId) === Number(userId));
};
