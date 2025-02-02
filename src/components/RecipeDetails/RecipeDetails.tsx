import {Link, useParams} from "react-router-dom";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.tsx";
import {useAppSelector} from "../../redux/hooks/useAppSelector.tsx";
import {recipeSliceActions} from "../../redux/slices/recipeSlice/recipeSlice.ts";
import {useEffect} from "react";
import RecipeTags from "../RecipeTags/RecipeTags.tsx";
import './StyleForRecipeDetails.css'

const RecipeDetails = () => {

    const { recipeId } = useParams();
    const dispatch = useAppDispatch();
    const { recipe } = useAppSelector(state => state.recipePart);
    useEffect(() => {
        dispatch(recipeSliceActions.loadRecipe(Number(recipeId)));
    }, [dispatch, recipeId]);
    return (
        <div className={'recipeDetailsDiv'}>
            <img className={'RecipeImg'} src={recipe?.image} alt="recipe image"/>
            <p>Id: {recipe?.id}</p>
            <p>Name: {recipe?.name}</p>
            <p>PrepTimeMinutes: {recipe?.prepTimeMinutes}</p>
            <p>CookTimeMinutes: {recipe?.cookTimeMinutes}</p>
            <p>Servings: {recipe?.servings}</p>
            <p>Difficulty: {recipe?.difficulty}</p>
            <p>Cuisine: {recipe?.cuisine}</p>
            <Link className={'LinkForRecipeDetails'} key={recipe?.id} to={`/userdetails/${recipe?.userId}`}>Click to go to the author</Link>
            Tags:{recipe?.tags.map((tag, index) => <RecipeTags key={tag + index} tag={tag}/>)}
        </div>
    );
};

export default RecipeDetails;