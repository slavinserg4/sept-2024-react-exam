import axios from 'axios';
import {retriveLocalStorage} from "./helper.ts";
import {IUserWithTokens} from "../models/IUserWithTokens.ts";
import {IRecipeBaseResponseModel} from "../models/IRecipeBaseResponseModel.ts";
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
export const getRecipes = async (skip = 0, limit = 10): Promise<IRecipeBaseResponseModel> => {
    const {data} = await axiosInstance.get<IRecipeBaseResponseModel>(`/recipes?skip=${skip}&limit=${limit}`);
    console.log(data);
    return data
}

