import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../redux/hooks/useAppDispatch.tsx";
import { loginSliceActions } from "../../redux/slices/loginSlice/loginSlice.ts";
import {useAppSelector} from "../../redux/hooks/useAppSelector.tsx";
import './StyleForForm.css'

interface FormComponentProps {
    username: string;
    password: string;
}

const Form = () => {
    const loginSliceState = useAppSelector((state) => state.loginPart);
    const dispatch = useAppDispatch();
    const { handleSubmit, register } = useForm<FormComponentProps>();


    const customHandler = async (formData: FormComponentProps) => {
        await dispatch(loginSliceActions.userLogin(formData));

    };


    return (
        <div className={'MainFormDiv'}>
            <p className={"HeaderForForm"}>Please log in to access the site.</p>
            <hr className={'hrForForm'}/>
            <form className={'Form'} onSubmit={handleSubmit(customHandler)}>
                <h4 className={'Enter'}>Enter your username</h4>
                <input
                    type="text"
                    {...register("username")}
                    placeholder="Username"
                    className="FormInputUsername"
                />
                <h4 className={'Enter'}>Enter your password</h4>
                <input
                    type="password"
                    {...register("password")}
                    placeholder="Password"
                    className="FormInputPassword"
                />
                <button className={'ButtonForForm'} type="submit">Submit</button>
            </form>
            {loginSliceState.error ? (<p className={'error'}>Incorrect username or password</p>) : null}
        </div>
    );
};

export default Form;
