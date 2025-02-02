import { FC } from "react";
import {Link} from "react-router-dom";
import './StyleForRecipeTags.css'

type RecipeTagsPropType = {
    tag: string;

}

const RecipeTags: FC<RecipeTagsPropType> = ({ tag}) => {
    return (
        <div>
             <Link className={'LinkToTag'} to={`/recipes/?tag=${tag}&skip=0&limit=10`}>{tag}</Link>
        </div>
    );
};


export default RecipeTags;
