import {Link} from "react-router-dom";
import './StyleForLoginMenu.css'
const LoginMenu = () => {
    return (
        <div className={'LoginMenuDiv'}>
            <Link className={'Link'} to={"/login"}>Click this message to login</Link>
        </div>
    );
};

export default LoginMenu;