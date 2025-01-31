import {Link} from "react-router-dom";

const Menu = () => {


    return (
        <div>
            <Link to={'/recipes'}>Recipes</Link>
            <Link to={'/users'} >Users</Link>
        </div>
    );
};

export default Menu;