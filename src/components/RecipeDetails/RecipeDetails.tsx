import {Link, useParams} from "react-router-dom";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.tsx";
import {useAppSelector} from "../../redux/hooks/useAppSelector.tsx";
import {recipeSliceActions} from "../../redux/slices/recipeSlice/recipeSlice.ts";
import {useEffect} from "react";
import RecipeTags from "../RecipeTags/RecipeTags.tsx";

const RecipeDetails = () => {

    const { recipeId } = useParams();
    const dispatch = useAppDispatch();
    const { recipe } = useAppSelector(state => state.recipePart);
    useEffect(() => {
        dispatch(recipeSliceActions.loadRecipe(Number(recipeId)));
    }, [dispatch, recipeId]);
    return (
        <div>
            Id:{recipe?.id}
            Name:{recipe?.name} <br/>
            UserId:{recipe?.userId}
            <p>Author: <Link to={`/userdetails/${recipe?.userId}`}>Author</Link> </p>
            Tags:{recipe?.tags.map((tag)=><RecipeTags disabled={false} tag={tag} />)}
        </div>
    );
};

export default RecipeDetails;