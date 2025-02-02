import { useAppSelector } from "../../redux/hooks/useAppSelector.tsx";
import { useAppDispatch } from "../../redux/hooks/useAppDispatch.tsx";
import { useEffect, useState, useCallback } from "react";
import { userSliceActions } from "../../redux/slices/userSlice/userSlice.ts";
import UserComponent from "../User/UserComponent.tsx";
import Pagination from "../Pagination/Pagination.tsx";
import { IUser } from "../../models/IUser.ts";
import { useSearchParams } from "react-router-dom";
import SearchComponent from "../SearchComponent/SearchComponent.tsx";
import './StyleForUsersComponent.css'

const UsersComponent = () => {
    const userSliceState = useAppSelector((state) => state.userPart);
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "");
    const [foundUser, setFoundUser] = useState<IUser | null>(null);
    const [isSearching, setIsSearching] = useState(false);

    const skip = Number(searchParams.get("skip")) || 0;
    const limit = Number(searchParams.get("limit")) || 10;

    useEffect(() => {
        if (!searchTerm) {
            setFoundUser(null);
            dispatch(userSliceActions.loadUsers({ skip, limit }));
        }
    }, [searchTerm, dispatch, skip, limit]);

    useEffect(() => {
        setSearchTerm(searchParams.get("query") || "");
    }, [searchParams]);

    const fetchUsers = useCallback(async (query: string) => {
        setIsSearching(true);
        const params = { skip, limit, query };

        try {
            if (!query) {
                await dispatch(userSliceActions.loadUsers(params));
                setFoundUser(null);
            } else if (!isNaN(Number(query))) {
                const response = await dispatch(userSliceActions.loadUser(Number(query))).unwrap();
                setFoundUser(response);
            } else {
                await dispatch(userSliceActions.loadUsers(params));
                setFoundUser(null);
            }
        } catch (error) {
            console.error("Помилка завантаження даних:", error);
        } finally {
            setIsSearching(false);
        }
    }, [dispatch, skip, limit]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchUsers(searchTerm);
            } catch (error) {
                console.error("Помилка при отриманні користувачів:", error);
            }
        };

        fetchData().catch(console.error);
    }, [fetchUsers, searchTerm]);

    return (
        <div className={'UsersComponent'}>
            <SearchComponent onSearch={(query) => setSearchTerm(query)} placeholder="Input name or ID..." />

            {isSearching ? (
                <p>Loading...</p>
            ) : foundUser ? (
                <UserComponent user={foundUser} />
            ) : (
                <>
                    {userSliceState.users.length === 0 ? (
                        <p>No users found..</p>
                    ) : (
                        <>
                            {userSliceState.users.map((user) => (
                                <UserComponent user={user} key={user.id} />
                            ))}
                            <Pagination total={userSliceState.total} limit={limit} />
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default UsersComponent;
