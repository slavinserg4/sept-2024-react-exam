import axios from 'axios';
import {IUserWithTokens} from "../models/IUserWithTokens.ts";
const axiosInstance = axios.create({
    baseURL: 'https://dummyjson.com',
    headers:{'Content-Type': 'application/json', }
})


interface ILoginUserType {
    username: string;
    password: string;
}

export const loginUser = async ({username, password}:ILoginUserType): Promise<IUserWithTokens> => {
    const response = await axiosInstance.post<IUserWithTokens>('/auth/login', {username, password});
    console.log(response.data);
    return response.data
}

