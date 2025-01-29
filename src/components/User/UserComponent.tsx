import {IUser} from "../../models/IUser.ts";
import {FC} from "react";

interface IUserProps {
    user: IUser;
}
const UserComponent:FC<IUserProps> = ({user}) => {
    return (
        <div>
            {user.firstName}
        </div>
    );
};

export default UserComponent;