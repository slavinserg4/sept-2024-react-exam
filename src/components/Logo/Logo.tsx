import {useAppSelector} from "../../redux/hooks/useAppSelector.tsx";

const Logo = () => {
    const loginSliceState = useAppSelector((state) => state.loginPart);
    return (
        <div>
            <img style={{height:50, width:50}} src={`${loginSliceState.user?.image}`} alt=""/>
        </div>
    );
};

export default Logo;