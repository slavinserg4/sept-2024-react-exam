import {useNavigate, useParams} from "react-router-dom";
import {useAppSelector} from "../../redux/hooks/useAppSelector.tsx";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.tsx";
import {useEffect} from "react";
import {userSliceActions} from "../../redux/slices/userSlice/userSlice.ts";


const UserDetailsPage = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate(-1);
    };


    const {user} = useAppSelector(state => state.userPart)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(userSliceActions.loadUser(Number(userId)))
    },[dispatch,userId])

    return (
        <div>
            <button onClick={handleBackClick}>Back</button> <br/>
            {user?.id} <br/>
            {user?.firstName} <br/>

        </div>
    );
};

export default UserDetailsPage;