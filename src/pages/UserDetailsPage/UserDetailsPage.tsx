import {useNavigate} from "react-router-dom";
import UserDetails from "../../components/UserDetails/UserDetails.tsx";


const UserDetailsPage = () => {
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <div>
            <button onClick={handleBackClick}>Back</button> <br/>
            <UserDetails/>

        </div>
    );
};

export default UserDetailsPage;