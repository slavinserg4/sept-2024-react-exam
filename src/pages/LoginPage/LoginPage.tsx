import Form from "../../components/Form/Form.tsx";
import {useAppSelector} from "../../redux/hooks/useAppSelector.tsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import './StyleForLoginPage.css'

const LoginPage = () => {
    const loginSliceState = useAppSelector(state => state.loginPart)
    const navigate = useNavigate();
    useEffect(() => {
        if (loginSliceState.login) {
            navigate('/users');
        }
    }, [loginSliceState.login, navigate]);
    return (
        <div className={'LoginPage'}>
            <Form/>
        </div>
    );
};

export default LoginPage;