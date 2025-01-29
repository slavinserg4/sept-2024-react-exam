import {useAppSelector} from "../../redux/hooks/useAppSelector.tsx";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.tsx";
import {useEffect} from "react";
import {userSliceActions} from "../../redux/slices/userSlice/userSlice.ts";
import UserComponent from "../User/UserComponent.tsx";
import {useSearchParams} from "react-router-dom";
import Pagination from "../Pagination/Pagination.tsx";

const UsersComponent = () => {
    const userSliceState = useAppSelector(state => state.userPart)
    const dispatch = useAppDispatch()
    const [searchParams] = useSearchParams();
    const skip = Number(searchParams.get("skip")) || 0;
    const limit = Number(searchParams.get("limit")) || 10;
    useEffect(() => {
        dispatch(userSliceActions.loadUsers({skip, limit}));
    },[dispatch, skip, limit]);
    return (
        <div>
            {
                userSliceState.users.map((user) => <UserComponent user={user} key={user.id} />)}
                <Pagination total={userSliceState.total} limit={limit} />

        </div>
    );
};

export default UsersComponent;