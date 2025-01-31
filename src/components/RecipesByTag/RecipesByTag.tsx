import {useNavigate, useSearchParams} from "react-router-dom";
import {useAppSelector} from "../../redux/hooks/useAppSelector.tsx";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.tsx";
import {useEffect, useState} from "react";
import {recipeSliceActions} from "../../redux/slices/recipeSlice/recipeSlice.ts";
import RecipeByTag from "../RecipeByTag/RecipeByTag.tsx";
import Pagination from "../Pagination/Pagination.tsx";

const RecipesByTag = () => {
    const recipeSliceState = useAppSelector((state) => state.recipePart);
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    const skip = Number(searchParams.get("skip")) || 0;
    const limit = Number(searchParams.get("limit")) || 10;
    const navigate = useNavigate();
    const [tag] = useState(searchParams.get("tag") || "");



    useEffect(() => {
        dispatch(recipeSliceActions.loadRecipesByTag({tag, skip, limit}))
    }, [dispatch,limit,skip,tag]);


    const handleBackClick = () => {
        navigate(-1);
    };
    return (
        <div>
            <button onClick={handleBackClick}>back</button>
            <h3>All Recipes with tag: {tag}</h3>
            {
                recipeSliceState.recipesByTag.map((recipe) => <RecipeByTag recipe={recipe}/>)
            }
            <Pagination total={recipeSliceState.total} limit={limit}/>
        </div>
    );
};

export default RecipesByTag;