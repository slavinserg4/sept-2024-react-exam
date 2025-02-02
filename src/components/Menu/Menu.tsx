import {Link, useNavigate} from "react-router-dom";
import Logo from "../Logo/Logo.tsx";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.tsx";
import {loginSliceActions} from "../../redux/slices/loginSlice/loginSlice.ts";
import './StyleForMenu.css'

const Menu = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const clickToLogout = () => {
        dispatch(loginSliceActions.setLoginToFalse())
        localStorage.clear();
        navigate("/");
    }
    return (
        <div className="Menu">
            <Link className={'LinkForAllRecipes'} to={'/recipes?query=&skip=0&limit=10'}>All Recipes</Link>
            <Link className={'LinkForAllUsers'} to={'/users?query=&skip=0&limit=10'} >All Users</Link>
            <button className={'ButtonForLogOut'} onClick={clickToLogout}>Log out</button>
            <Logo/>
        </div>
    );
};

export default Menu;