import RecipeDetails from "../../components/RecipeDetails/RecipeDetails.tsx";
import {useNavigate} from "react-router-dom";
import './StyleForRecipeDetailsPage.css'

const RecipeDetailsPage = () => {
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate(-1);
    };
    return (
        <div className="RecipeDetailsPage">
            <button className={'RecipeDetailsPageButton'} onClick={handleBackClick}>Back</button>
            <RecipeDetails/>
        </div>
    );
};

export default RecipeDetailsPage;