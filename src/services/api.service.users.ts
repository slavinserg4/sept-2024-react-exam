import axios from 'axios';
import {IUserWithTokens} from "../models/IUserWithTokens.ts";
import {IUserBaseResponseModel} from "../models/IUserBaseResponseModel.ts";
import {retriveLocalStorage} from "./helper.ts";
import {IUser} from "../models/IUser.ts";
import {IRecipeBaseResponseModel} from "../models/IRecipeBaseResponseModel.ts";
import {IRecipe} from "../models/IRecipe.ts";



type ILoginUserType ={
    expiresInMins:number;
    username: string;
    password: string;
}


const axiosInstance = axios.create({
    baseURL: 'https://dummyjson.com/auth',
    headers:{'Content-Type': 'application/json'}
})



axiosInstance.interceptors.request.use((request)=>{
    if(request.method?.toUpperCase() == "GET"){
        request.headers.Authorization = 'Bearer ' + retriveLocalStorage<IUserWithTokens>('user').accessToken;
    }
    return request;
})
//Login user
export const loginUser = async ({username, password, expiresInMins}:ILoginUserType): Promise<IUserWithTokens> => {
    const response = await axiosInstance.post<IUserWithTokens>('/login', {username, password, expiresInMins});
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data
}


//Recipes
export const getRecipes = async (skip = 0, limit = 10, query?:string): Promise<IRecipeBaseResponseModel> => {
    const url = query
        ? `/recipes/search?q=${query}&skip=${skip}&limit=${limit}`
        : `/recipes?skip=${skip}&limit=${limit}`;

    const { data } = await axiosInstance.get<IRecipeBaseResponseModel>(url);
    return data;
}

export const getRecipe = async (id:number): Promise<IRecipe> => {
    const { data } = await axiosInstance.get<IRecipe>(`/recipes/${id}`);
    return data;
};
export const getRecipeByTag = async (tag: string, skip: number, limit: number): Promise<IRecipeBaseResponseModel> => {
    const { data } = await axiosInstance.get<IRecipeBaseResponseModel>(`/recipes/tag/${tag}`, {
        params: {
            skip: skip,
            limit: limit
        }
    });
    return data;
};


//Users
export const getUsers = async (skip = 0, limit = 10,query?:string): Promise<IUserBaseResponseModel> => {
    const url = query
        ? `/users/search?q=${query}&skip=${skip}&limit=${limit}`
        : `/users?skip=${skip}&limit=${limit}`;

    const { data } = await axiosInstance.get<IUserBaseResponseModel>(url);
    return data;
};
export const getUser = async (id:number): Promise<IUser> => {
    const { data } = await axiosInstance.get<IUser>(`/users/${id}`);
    return data;
};

