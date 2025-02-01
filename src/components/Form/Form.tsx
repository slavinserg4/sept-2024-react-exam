import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../redux/hooks/useAppDispatch.tsx";
import { loginSliceActions } from "../../redux/slices/loginSlice/loginSlice.ts";
import {useAppSelector} from "../../redux/hooks/useAppSelector.tsx";

interface FormComponentProps {
    username: string;
    password: string;
}

const Form = () => {
    const expiresInMins = 30;
    const loginSliceState = useAppSelector((state) => state.loginPart);
    const dispatch = useAppDispatch();
    const { handleSubmit, register } = useForm<FormComponentProps>();


    const customHandler = async (formData: FormComponentProps) => {
        const params = {...formData, expiresInMins: expiresInMins};
        await dispatch(loginSliceActions.userLogin(params));

    };


    return (
        <div>
            <form onSubmit={handleSubmit(customHandler)}>
                <input
                    type="text"
                    {...register("username")}
                    placeholder="Username"
                />
                <input
                    type="password"
                    {...register("password")}
                    placeholder="Password"
                />
                <button type="submit">submit</button>
            </form>
            {loginSliceState.error ? (<p>Невірний логін чи пароль</p>) : null}
        </div>
    );
};

export default Form;
