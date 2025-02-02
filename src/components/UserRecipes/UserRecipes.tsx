import { FC, useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks/useAppSelector.tsx";
import { useAppDispatch } from "../../redux/hooks/useAppDispatch.tsx";
import { recipeSliceActions } from "../../redux/slices/recipeSlice/recipeSlice.ts";
import { Link } from "react-router-dom";
import { mergeRecipesWithUsers } from "../../helpers/helper.ts";
import { IRecipe } from "../../models/IRecipe.ts";
import './StyleForUserRecipes.css'

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
            <h2>Recipes of this user</h2>
            {loadedAll ? (
                userRecipes.length > 0 ? (
                    <ul>
                        {userRecipes.map(recipe => (
                            <li key={recipe.id}>
                                <Link className={'UserRecipesLink'} to={`/recipedetails/${recipe.id}`}>{recipe.name}</Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <h3>This user has no recipes.</h3>
                )
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default UserRecipes;
