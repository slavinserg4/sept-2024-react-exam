import {useNavigate} from "react-router-dom";
import UserDetails from "../../components/UserDetails/UserDetails.tsx";
import './StyleForUserDetailsPage.css'

const UserDetailsPage = () => {
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate(-1);
    };
    return (
        <div className="UserDetailsPage">
            <button className={'UserDetailsPageButton'} onClick={handleBackClick}>Back</button> <br/>
            <UserDetails/>

        </div>
    );
};

export default UserDetailsPage;