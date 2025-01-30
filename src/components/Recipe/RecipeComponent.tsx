import {IRecipe} from "../../models/IRecipe.ts";
import {FC} from "react";
import {Link} from "react-router-dom";


interface IRecipeComponentProps {
    recipe: IRecipe;
}
const RecipeComponent:FC<IRecipeComponentProps> = ({recipe}) => {
    return (
        <div>
            <Link to={`/recipedetails/${recipe.id}`}>{recipe.name}, id:{recipe.id}</Link>
        </div>
    );
};

export default RecipeComponent;