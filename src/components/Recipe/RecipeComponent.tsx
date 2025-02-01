import {IRecipe} from "../../models/IRecipe.ts";
import {FC} from "react";
import {Link} from "react-router-dom";
import RecipeTags from "../RecipeTags/RecipeTags.tsx";


interface IRecipeComponentProps {
    recipe: IRecipe;
}
const RecipeComponent:FC<IRecipeComponentProps> = ({recipe}) => {
    return (
        <div>
            <Link to={`/recipedetails/${recipe.id}`}>{recipe.name}, id:{recipe.id}</Link>
            {recipe.tags.map((tag,index)=><RecipeTags key={recipe.id+index} tag={tag} />)}
            <hr/>
            <br/>

        </div>
    );
};

export default RecipeComponent;