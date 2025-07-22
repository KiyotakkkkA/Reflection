import {
    RAvatar,
} from "@/components/ui";
import { Link } from "react-router-dom";

interface ProfileFollowCardProps {
    data: {
        fullname: string;
        username: string;
        avatar: string;
    };
}

const ProfileFollowCard = ({ data }: ProfileFollowCardProps) => {

    return (
        <div>
            <div className="flex flex-row gap-4 mt-2 mb-4 justify-between">
                <div className="flex flex-row gap-4">
                    <RAvatar
                        src={data.avatar}
                        size="w-20 h-20"
                    />
                    <p className="text-lg font-medium break-words">
                        <Link to={`/profile/${data.username}`} className="hover:underline">{data.fullname}</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfileFollowCard;
