import {IUser} from "../../models/IUser.ts";
import {FC} from "react";
import {Link} from "react-router-dom";
import './StyleForUserComponent.css'

interface IUserProps {
    user: IUser;
}
const UserComponent:FC<IUserProps> = ({user}) => {
    return (
        <div className={'UserComponentDiv'}>
            <Link className={'LinkToUserDetails'} to={`/userdetails/${user.id}`} state={user}>Id:{user.id}&nbsp;&nbsp; | First name: {user.firstName}, Last name: {user.lastName}</Link>
            <hr className={'hrInUser'}/>
        </div>
    );
};

export default UserComponent;