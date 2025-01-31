import {IRecipe} from "../../models/IRecipe.ts";
import {FC} from "react";
import {Link} from "react-router-dom";
import RecipeTags from "../RecipeTags/RecipeTags.tsx";

type RecipeByTagType = {
    recipe: IRecipe;
}
const RecipeByTag:FC<RecipeByTagType> = ({recipe}) => {
    return (
        <div>
            Id:{recipe.id}
            Name:{recipe.name} <br/>
            UserId:{recipe.userId}
            <p>Author: <Link to={`/userdetails/${recipe.userId}`}>Author</Link> </p>
            Tags:{recipe.tags.map((tag)=><RecipeTags tag={tag} disabled={true}/>)}
            <hr/>
        </div>
    );
};

export default RecipeByTag;