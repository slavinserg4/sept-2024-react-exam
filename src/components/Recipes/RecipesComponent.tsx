import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks/useAppSelector.tsx";
import { useAppDispatch } from "../../redux/hooks/useAppDispatch.tsx";
import { recipeSliceActions } from "../../redux/slices/recipeSlice/recipeSlice.ts";
import RecipeComponent from "../Recipe/RecipeComponent.tsx";
import Pagination from "../Pagination/Pagination.tsx";
import { IRecipe } from "../../models/IRecipe.ts";

const RecipesComponent = () => {
    const recipeSliceState = useAppSelector(state => state.recipePart);
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [foundRecipe, setFoundRecipe] = useState<IRecipe | null>(null);
    const [isSearching, setIsSearching] = useState<boolean>(false);

    const skip = Number(searchParams.get("skip")) || 0;
    const limit = Number(searchParams.get("limit")) || 10;

    useEffect(() => {
        const fetchRecipes = async (): Promise<void> => {
            setIsSearching(true);

            if (!searchTerm) {
                setSearchParams({ skip: skip.toString(), limit: limit.toString() });
                await dispatch(recipeSliceActions.loadRecipes({ skip, limit }));
                setFoundRecipe(null);
            } else if (!isNaN(Number(searchTerm))) {
                setSearchParams({});
                try {
                    const response = await dispatch(recipeSliceActions.loadRecipe(Number(searchTerm))).unwrap();
                    setFoundRecipe(response);
                } catch (error) {
                    console.error("Рецепт не знайдено:", error);
                    setFoundRecipe(null);
                }
            } else {
                setSearchParams({ query: searchTerm, skip: skip.toString(), limit: limit.toString() });
                await dispatch(recipeSliceActions.loadRecipes({ skip, limit, query: searchTerm }));
                setFoundRecipe(null);
            }

            setIsSearching(false);
        };

        fetchRecipes().catch(console.error);
    }, [searchTerm, skip, limit, dispatch, setSearchParams]);

    return (
        <div>
            <input
                type="text"
                placeholder="Пошук рецепта за назвою або ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {isSearching ? (
                <p>Завантаження...</p>
            ) : foundRecipe ? (
                <RecipeComponent recipe={foundRecipe} key={foundRecipe.id} />
            ) : (
                recipeSliceState.recipes.map((recipe) => <RecipeComponent recipe={recipe} key={recipe.id} />)
            )}

            <Pagination total={recipeSliceState.total} limit={limit} />
        </div>
    );
};

export default RecipesComponent;
