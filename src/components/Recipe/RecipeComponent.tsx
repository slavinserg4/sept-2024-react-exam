import {IRecipe} from "../../models/IRecipe.ts";
import {FC} from "react";
import {Link} from "react-router-dom";
import RecipeTags from "../RecipeTags/RecipeTags.tsx";
import './StyleForRecipeComponent.css'

interface IRecipeComponentProps {
    recipe: IRecipe;
}
const RecipeComponent:FC<IRecipeComponentProps> = ({recipe}) => {
    return (
        <div className={'Recipe'}>
            <Link className={'LinkToRecipeDetails'} to={`/recipedetails/${recipe.id}`}>{recipe.name}</Link>
            Tags: {recipe.tags.map((tag,index)=><RecipeTags key={recipe.id+index} tag={tag} />)}

            <hr className={'hrInRecipe'}/>
        </div>
    );
};

export default RecipeComponent;