import { useAppSelector } from "../../redux/hooks/useAppSelector.tsx";
import { useAppDispatch } from "../../redux/hooks/useAppDispatch.tsx";
import { useEffect, useState, useCallback } from "react";
import { recipeSliceActions } from "../../redux/slices/recipeSlice/recipeSlice.ts";
import RecipeComponent from "../Recipe/RecipeComponent.tsx";
import Pagination from "../Pagination/Pagination.tsx";
import { IRecipe } from "../../models/IRecipe.ts";
import { useSearchParams } from "react-router-dom";
import SearchComponent from "../SearchComponent/SearchComponent.tsx";

const RecipesComponent = () => {
    const recipeSliceState = useAppSelector((state) => state.recipePart);
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "");
    const [foundRecipe, setFoundRecipe] = useState<IRecipe | null>(null);
    const [isSearching, setIsSearching] = useState(false);

    const skip = Number(searchParams.get("skip")) || 0;
    const limit = Number(searchParams.get("limit")) || 10;

    const fetchRecipes = useCallback(async (query: string) => {
        setIsSearching(true);
        const params = { skip, limit, query };

        try {
            if (!query) {
                await dispatch(recipeSliceActions.loadRecipes(params));
                setFoundRecipe(null);
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
    }, [dispatch, skip, limit]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchRecipes(searchTerm);
            } catch (error) {
                console.error("Помилка при отриманні рецептів:", error);
            }
        };

        fetchData().catch(console.error);
    }, [fetchRecipes, searchTerm]);

    return (
        <div>
            <SearchComponent onSearch={(query) => setSearchTerm(query)} placeholder="Пошук рецепта за назвою або ID..." />

            {isSearching ? (
                <p>Завантаження...</p>
            ) : foundRecipe ? (
                <RecipeComponent recipe={foundRecipe} key={foundRecipe.id} />
            ) : (
                <>
                    {recipeSliceState.recipes.map((recipe) => (
                        <RecipeComponent recipe={recipe} key={recipe.id} />
                    ))}
                    <Pagination total={recipeSliceState.total} limit={limit} />
                </>
            )}
        </div>
    );
};

export default RecipesComponent;
