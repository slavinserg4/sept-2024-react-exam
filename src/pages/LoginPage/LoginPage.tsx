import Form from "../../components/Form/Form.tsx";
import {useAppSelector} from "../../redux/hooks/useAppSelector.tsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const LoginPage = () => {
    const loginSliceState = useAppSelector(state => state.loginPart)
    const navigate = useNavigate();
    useEffect(() => {
        if (loginSliceState.login) {
            navigate('/users');
        }
    }, [loginSliceState.login, navigate]);
    return (
        <div>
            <Form/>
        </div>
    );
};

export default LoginPage;