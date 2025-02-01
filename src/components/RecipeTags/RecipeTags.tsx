import { FC } from "react";
import {Link} from "react-router-dom";

type RecipeTagsPropType = {
    tag: string;

}

const RecipeTags: FC<RecipeTagsPropType> = ({ tag}) => {

    return (
        <div>
             <Link to={`/recipes/?tag=${tag}&skip=0&limit=10`}>{tag}</Link>


        </div>
    );
};


export default RecipeTags;
