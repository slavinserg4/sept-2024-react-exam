import {createBrowserRouter} from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout.tsx";
import HomePage from "../pages/HomePage/HomePage.tsx";
import UsersPage from "../pages/UsersPage/UsersPage.tsx";
import RecipesPage from "../pages/RecipesPage/RecipesPage.tsx";
import LoginPage from "../pages/LoginPage/LoginPage.tsx";

export const router = createBrowserRouter([
    { path: '/',  element:<MainLayout/>, children:[
            {
                index:true, element:<HomePage/>
            },
            {
                path:'users', element:<UsersPage/>
            },
            {
                path:'recipes', element:<RecipesPage/>
            },
            {
                path:'login', element:<LoginPage/>
            }
            ]}
])