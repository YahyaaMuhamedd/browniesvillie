import { capitalizeFirstLetter } from "@/helpers/capitalizeFirstLetter";
import { useAppSelector } from "@/hooks/Redux";
import { RootState } from "@/store/store";

export const Profile = () => {
    const { user, isAuthenticated } = useAppSelector((state: RootState) => state.user);


    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Welcome, {capitalizeFirstLetter(user?.name?.split(" ")[0])}</h1>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Phone:</strong> {user?.phone}</p>
        </div>
    );
};