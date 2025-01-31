import { FC, useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks/useAppSelector.tsx";
import { useAppDispatch } from "../../redux/hooks/useAppDispatch.tsx";
import { recipeSliceActions } from "../../redux/slices/recipeSlice/recipeSlice.ts";
import { Link } from "react-router-dom";
import { mergeRecipesWithUsers } from "../../helpers/helper.ts";
import { IRecipe } from "../../models/IRecipe.ts";

interface Props {
    userId: number;
}

const UserRecipes: FC<Props> = ({ userId }) => {
    const { total } = useAppSelector(state => state.recipePart);
    const dispatch = useAppDispatch();
    const [loadedAll, setLoadedAll] = useState(false);
    const [recipes, setRecipes] = useState<IRecipe[]>([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            let skip = 0;
            const limit = 30;
            let allLoadedRecipes: IRecipe[] = [];

            try {
                while (skip < total || total === 0) {
                    const response = await dispatch(recipeSliceActions.loadRecipes({ skip, limit })).unwrap();
                    allLoadedRecipes = [...allLoadedRecipes, ...response.recipes];

                    skip += limit;
                    if (allLoadedRecipes.length >= response.total) break;
                }

                setRecipes(allLoadedRecipes);
                setLoadedAll(true);
            } catch (error) {
                console.error("Помилка при завантаженні рецептів:", error);
            }
        };

        void fetchRecipes();
    }, [dispatch, total]);

    const userRecipes = loadedAll ? mergeRecipesWithUsers(recipes, userId) : [];

    return (
        <div>
            <h2>Рецепти користувача</h2>
            {loadedAll ? (
                <ul>
                    {userRecipes.map(recipe => (
                        <li key={recipe.id}>
                            <Link to={`/recipedetails/${recipe.id}`}>{recipe.name}</Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Завантаження...</p>
            )}
        </div>
    );
};

export default UserRecipes;
