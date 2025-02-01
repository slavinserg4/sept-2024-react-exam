import {createBrowserRouter} from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout.tsx";
import UsersPage from "../pages/UsersPage/UsersPage.tsx";
import RecipesPage from "../pages/RecipesPage/RecipesPage.tsx";
import LoginPage from "../pages/LoginPage/LoginPage.tsx";
import UserDetailsPage from "../pages/UserDetailsPage/UserDetailsPage.tsx";
import RecipeDetailsPage from "../pages/RecipeDetailsPage/RecipeDetailsPage.tsx";
import MainPage from "../pages/MainPage/MainPage.tsx";

export const router = createBrowserRouter([
    { path: '/',  element:<MainLayout/>, children:[
            {
                index:true, element:<MainPage/>
            },
            {
                path:'users', element:<UsersPage/>
            },
            {
                path:'recipes', element:<RecipesPage/>
            },
            {
                path:'login', element:<LoginPage/>
            },
            {
                path:'userdetails/:userId', element:<UserDetailsPage/>
            },
            {
                path:'recipedetails/:recipeId', element:<RecipeDetailsPage/>
            }
            ]}
])