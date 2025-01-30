import axios from 'axios';
import {IUserWithTokens} from "../models/IUserWithTokens.ts";
import {IUserBaseResponseModel} from "../models/IUserBaseResponseModel.ts";
import {retriveLocalStorage} from "./helper.ts";
import {IUser} from "../models/IUser.ts";
import {IRecipeBaseResponseModel} from "../models/IRecipeBaseResponseModel.ts";
import {IRecipe} from "../models/IRecipe.ts";



type ILoginUserType ={
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

export const loginUser = async ({username, password}:ILoginUserType): Promise<IUserWithTokens> => {
    const response = await axiosInstance.post<IUserWithTokens>('/login', {username, password});
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data
}

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

