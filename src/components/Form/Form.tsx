import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../redux/hooks/useAppDispatch.tsx";
import { loginSliceActions } from "../../redux/slices/loginSlice/loginSlice.ts";

interface FormComponentProps {
    username: string;
    password: string;
}

const Form = () => {
    const dispatch = useAppDispatch();
    const { handleSubmit, register } = useForm<FormComponentProps>();

    const customHandler = async (formData: FormComponentProps) => {
        await dispatch(loginSliceActions.userLogin(formData));

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

        </div>
    );
};

export default Form;
