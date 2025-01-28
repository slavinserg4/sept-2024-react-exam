import axios from 'axios';
import {IUser} from "../models/IUser.ts";
const axiosInstance = axios.create({
    baseURL: 'https://dummyjson.com',
    headers:{'Content-Type': 'application/json'}
})


export const getUsers = async (): Promise<IUser[]> => {
    const {data} = await axiosInstance.get<IUser[]>('/users');
    console.log(data);
    return data
}
