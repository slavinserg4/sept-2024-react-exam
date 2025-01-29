import {IRecipe} from "../../models/IRecipe.ts";
import {FC} from "react";


interface IRecipeComponentProps {
    recipe: IRecipe;
}
const RecipeComponent:FC<IRecipeComponentProps> = ({recipe}) => {
    return (
        <div>
            {
                recipe.name
            }
        </div>
    );
};

export default RecipeComponent;