import {IUser} from "../../models/IUser.ts";
import {FC} from "react";
import {Link} from "react-router-dom";

interface IUserProps {
    user: IUser;
}
const UserComponent:FC<IUserProps> = ({user}) => {
    return (
        <div>
            <Link to={`/userdetails/${user.id}`} state={user}>id:{user.id}, name:{user.firstName}</Link>
        </div>
    );
};

export default UserComponent;