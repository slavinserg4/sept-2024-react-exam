import { FC } from "react";
import {Link} from "react-router-dom";

type RecipeTagsPropType = {
    tag: string;
    disabled: boolean;
}

const RecipeTags: FC<RecipeTagsPropType> = ({ tag,disabled}) => {

    return (
        <div>
            {!disabled? <Link to={`/recipesbytag/?tag=${tag}&skip=0&limit=10`}>{tag}</Link> : tag}


        </div>
    );
};

export default RecipeTags;
