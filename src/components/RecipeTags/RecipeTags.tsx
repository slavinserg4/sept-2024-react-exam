import {FC} from "react";

type RecipeTagsPropType = {
    tag:string,
}
const RecipeTags:FC<RecipeTagsPropType> = ({tag}) => {
    return (
        <div>
            {tag}
        </div>
    );
};

export default RecipeTags;