import {Outlet} from "react-router-dom";
import Menu from "../../components/Menu/Menu.tsx";
import {useAppSelector} from "../../redux/hooks/useAppSelector.tsx";
import LoginMenu from "../../components/LoginMenu/LoginMenu.tsx";

const MainLayout = () => {
    const loginSliceState = useAppSelector(state => state.loginPart)
    return (
        <div>
            <div className={'Header'}>{loginSliceState.login? <Menu/> : <LoginMenu/>}</div>
            <Outlet/>
        </div>
    );
};

export default MainLayout;