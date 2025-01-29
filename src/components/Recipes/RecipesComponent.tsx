import {useAppSelector} from "../../redux/hooks/useAppSelector.tsx";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.tsx";
import {useEffect} from "react";
import {recipeSliceActions} from "../../redux/slices/recipeSlice/recipeSlice.ts";
import RecipeComponent from "../Recipe/RecipeComponent.tsx";
import {useSearchParams} from "react-router-dom";
import Pagination from "../Pagination/Pagination.tsx";

const RecipesComponent = () => {
    const recipeSliceState = useAppSelector(state => state.recipePart)
    const dispatch = useAppDispatch()
    const [searchParams] = useSearchParams();
    const skip = Number(searchParams.get("skip")) || 0;
    const limit = Number(searchParams.get("limit")) || 10;
    useEffect(() => {
        dispatch(recipeSliceActions.loadRecipes({skip,limit}));
    },[dispatch,skip,limit]);
    return (
        <div>
            {recipeSliceState.recipes.map((recipe) => <RecipeComponent recipe={recipe} key={recipe.id} />)}
            <Pagination total={recipeSliceState.total} limit={limit} />
        </div>
    );
};

export default RecipesComponent;