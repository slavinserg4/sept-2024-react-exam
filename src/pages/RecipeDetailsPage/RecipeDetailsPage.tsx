import RecipeDetails from "../../components/RecipeDetails/RecipeDetails.tsx";
import {useNavigate} from "react-router-dom";

const RecipeDetailsPage = () => {
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate(-1);
    };
    return (
        <div>
            <button onClick={handleBackClick}>Back</button>
            <br/>
            <RecipeDetails/>
        </div>
    );
};

export default RecipeDetailsPage;