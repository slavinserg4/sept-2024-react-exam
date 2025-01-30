import { useAppSelector } from "../../redux/hooks/useAppSelector.tsx";
import { useAppDispatch } from "../../redux/hooks/useAppDispatch.tsx";
import { useEffect, useState } from "react";
import { userSliceActions } from "../../redux/slices/userSlice/userSlice.ts";
import UserComponent from "../User/UserComponent.tsx";
import { useSearchParams } from "react-router-dom";
import Pagination from "../Pagination/Pagination.tsx";
import {IUser} from "../../models/IUser.ts";

const UsersComponent = () => {
    const userSliceState = useAppSelector(state => state.userPart);
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "");
    const [foundUser, setFoundUser] = useState<IUser|null>(null);
    const [isSearching, setIsSearching] = useState(false);

    const skip = Number(searchParams.get("skip")) || 0;
    const limit = Number(searchParams.get("limit")) || 10;

    useEffect(() => {
        const fetchUsers = async () => {
            setIsSearching(true);

            if (!searchTerm) {
                setSearchParams({ skip: skip.toString(), limit: limit.toString() });
                await dispatch(userSliceActions.loadUsers({ skip, limit }));
                setFoundUser(null);
            } else if (!isNaN(Number(searchTerm))) {
                setSearchParams({});
                try {
                    const response = await dispatch(userSliceActions.loadUser(Number(searchTerm))).unwrap();
                    setFoundUser(response);
                } catch (error) {
                    console.error("Користувача не знайдено:", error);
                    setFoundUser(null);
                }
            } else {
                setSearchParams({ query: searchTerm, skip: skip.toString(), limit: limit.toString() });
                await dispatch(userSliceActions.loadUsers({ skip, limit, query: searchTerm }));
                setFoundUser(null);
            }

            setIsSearching(false);
        };

        fetchUsers().catch(console.error);
    }, [searchTerm, skip, limit, dispatch, setSearchParams]);

    return (
        <div>
            <input
                type="text"
                placeholder="Введіть ім'я або ID користувача..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {isSearching ? (
                <p>Завантаження...</p>
            ) : foundUser ? (
                <UserComponent user={foundUser} />
            ) : (
                <>
                    {userSliceState.users.map((user) => (
                        <UserComponent user={user} key={user.id} />
                    ))}
                    <Pagination total={userSliceState.total} limit={limit} />
                </>
            )}
        </div>
    );
};

export default UsersComponent;
