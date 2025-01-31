import {Link} from "react-router-dom";

const MainPage = () => {
    return (
        <div>
            You need to log in, <Link to='/login'> click here for login</Link>
        </div>
    );
};

export default MainPage;