import {Link} from "react-router-dom";

const HomePage = () => {
    return (
        <div>
            You need to log in, <Link to='/login'> click here for login</Link>
        </div>
    );
};

export default HomePage;