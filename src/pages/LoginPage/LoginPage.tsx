import Form from "../../components/Form/Form.tsx";
import {useAppSelector} from "../../redux/hooks/useAppSelector.tsx";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    const loginSliceState = useAppSelector(state => state.loginPart)
    const navigate = useNavigate();
    if (loginSliceState.login) {
        navigate('/users')
    }
    return (
        <div>
            <Form/>
        </div>
    );
};

export default LoginPage;