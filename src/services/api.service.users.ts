import axios from 'axios';
import {IUserWithTokens} from "../models/IUserWithTokens.ts";
import {IUserBaseResponseModel} from "../models/IUserBaseResponseModel.ts";
import {retriveLocalStorage} from "./helper.ts";



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


export const loginUser = async ({username, password}:ILoginUserType): Promise<IUserWithTokens> => {
    const response = await axiosInstance.post<IUserWithTokens>('/login', {username, password});
    console.log(response.data);
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data
}

export const getUsers = async (skip = 0, limit = 10): Promise<IUserBaseResponseModel> => {
    const { data } = await axiosInstance.get<IUserBaseResponseModel>(`/users?skip=${skip}&limit=${limit}`);
    console.log(data);
    return data;
};

