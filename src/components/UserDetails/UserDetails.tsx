import {FC, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useAppSelector} from "../../redux/hooks/useAppSelector.tsx";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.tsx";
import {userSliceActions} from "../../redux/slices/userSlice/userSlice.ts";
import UserRecipes from "../UserRecipes/UserRecipes.tsx";
import './StyleForUserDetails.css'

const UserDetails:FC = () => {
    const { userId } = useParams();
    const {user} = useAppSelector(state => state.userPart)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(userSliceActions.loadUser(Number(userId)))
    },[dispatch, userId])

    return (
        <div className={'UserDetailsDiv'}>
            <img className={'UserImage'} src={user?.image} alt="user image"/>
            <p>Id: {user?.id}</p>
            <p>First name: {user?.firstName}</p>
            <p>Last name: {user?.lastName}</p>
            <p>Maiden Name: {user?.maidenName}</p>
            <p>Age: {user?.age}</p>
            <p>Email: {user?.email}</p>
            <p>Phone: {user?.phone}</p>
            <p>Gender: {user?.gender}</p>
            <p>BirthDate: {user?.birthDate}</p>
            {<UserRecipes userId={Number(userId)}/>}
        </div>
    );
};

export default UserDetails;