import { useAppSelector } from "../../redux/hooks/useAppSelector.tsx";
import { useAppDispatch } from "../../redux/hooks/useAppDispatch.tsx";
import { useEffect, useState, useCallback } from "react";
import { recipeSliceActions } from "../../redux/slices/recipeSlice/recipeSlice.ts";
import RecipeComponent from "../Recipe/RecipeComponent.tsx";
import Pagination from "../Pagination/Pagination.tsx";
import { IRecipe } from "../../models/IRecipe.ts";
import { useSearchParams } from "react-router-dom";
import SearchComponent from "../SearchComponent/SearchComponent.tsx";
import { userSliceActions } from "../../redux/slices/userSlice/userSlice.ts";
import './StyleForRecipesComponent.css'

const RecipesComponent = () => {
    const recipeSliceState = useAppSelector((state) => state.recipePart);
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "");
    const [foundRecipe, setFoundRecipe] = useState<IRecipe | null>(null);
    const [isSearching, setIsSearching] = useState(false);

    const skip = Number(searchParams.get("skip")) || 0;
    const limit = Number(searchParams.get("limit")) || 10;
    const tag = searchParams.get("tag") || "";

    useEffect(() => {
        if (!searchTerm && !tag) {
            dispatch(recipeSliceActions.clearRecipesByTag());
        }
    }, [searchTerm, tag, dispatch]);

    useEffect(() => {
        if (!searchTerm && !tag) {
            setFoundRecipe(null);
            dispatch(userSliceActions.loadUsers({ skip, limit }));
        }
    }, [searchTerm, tag, dispatch, skip, limit]);

    useEffect(() => {
        setSearchTerm(searchParams.get("query") || "");
    }, [searchParams]);

    const fetchRecipes = useCallback(async (query: string, tag?: string) => {
        setIsSearching(true);
        const params = { skip, limit, query, tag };

        try {
            if (!query && !tag) {
                await dispatch(recipeSliceActions.loadRecipes(params));
                setFoundRecipe(null);
            } else if (tag) {
                await dispatch(recipeSliceActions.loadRecipesByTag({ tag, skip, limit })).unwrap();
            } else if (!isNaN(Number(query))) {
                const response = await dispatch(recipeSliceActions.loadRecipe(Number(query))).unwrap();
                setFoundRecipe(response);
            } else {
                await dispatch(recipeSliceActions.loadRecipes(params));
                setFoundRecipe(null);
            }
        } catch (error) {
            console.error("Помилка завантаження даних:", error);
        } finally {
            setIsSearching(false);
        }
    }, [dispatch, skip, limit, searchTerm, tag]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchRecipes(searchTerm, tag);
            } catch (error) {
                console.error("Помилка при отриманні рецептів:", error);
            }
        };

        fetchData().catch(console.error);
    }, [fetchRecipes, searchTerm, tag, skip, limit]);

    return (
        <div className={'RecipesComponent'}>
            <SearchComponent onSearch={(query) => setSearchTerm(query)} placeholder="Search for a recipe by name or ID..." />
            <div className={'CartsOdRecipes'}>
                {isSearching ? (
                    <p>Loading...</p>
                ) : foundRecipe ? (
                    <RecipeComponent recipe={foundRecipe} key={foundRecipe.id} />
                ) : recipeSliceState.recipesByTag?.length ? (
                    <>
                        {recipeSliceState.recipesByTag.map((recipe) => (
                            <RecipeComponent recipe={recipe} key={recipe.id} />
                        ))}
                        <Pagination total={recipeSliceState.total} limit={limit} />
                    </>
                ) : recipeSliceState.recipes.length ? (
                    <>
                        {recipeSliceState.recipes.map((recipe) => (
                            <RecipeComponent recipe={recipe} key={recipe.id} />
                        ))}
                        <Pagination total={recipeSliceState.total} limit={limit} />
                    </>
                ) : (
                    <p>There is no such recipe.</p>
                )}
            </div>
        </div>
    );
};




export default RecipesComponent;