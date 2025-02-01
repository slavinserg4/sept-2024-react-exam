import {Link, useNavigate} from "react-router-dom";
import Logo from "../Logo/Logo.tsx";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.tsx";
import {loginSliceActions} from "../../redux/slices/loginSlice/loginSlice.ts";

const Menu = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const clickToLogout = () => {
        dispatch(loginSliceActions.setLoginToFalse())
        localStorage.clear();
        navigate("/");
    }
    return (
        <div>
            <Link to={'/recipes?query=&skip=0&limit=10'}>Recipes</Link>
            <Link to={'/users?query=&skip=0&limit=10'} >Users</Link>
            <Logo/>
            <button onClick={clickToLogout}>Log out</button>
        </div>
    );
};

export default Menu;