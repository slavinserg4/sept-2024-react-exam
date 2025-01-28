import axios from 'axios';
import {IRecipe} from "../models/IRecipe.ts";
const axiosInstance = axios.create({
    baseURL: 'https://dummyjson.com',
    headers:{'Content-Type': 'application/json'}
})


export const getRecipes = async (): Promise<IRecipe[]> => {
    const {data} = await axiosInstance.get<IRecipe[]>('/recipes');
    console.log(data);
    return data
}

