import {FC, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useAppSelector} from "../../redux/hooks/useAppSelector.tsx";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.tsx";
import {userSliceActions} from "../../redux/slices/userSlice/userSlice.ts";
import UserRecipes from "../UserRecipes/UserRecipes.tsx";
const UserDetails:FC = () => {
    const { userId } = useParams();
    const {user} = useAppSelector(state => state.userPart)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(userSliceActions.loadUser(Number(userId)))
    },[dispatch, userId])
    


    return (
        <div>
            name:{user?.firstName}, <br/>
            id:{user?.id} <br/>
            birthday:{user?.birthDate} <br/>
            recipes:{<UserRecipes userId={Number(userId)}/>}
        </div>
    );
};

export default UserDetails;