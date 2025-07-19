import { RAvatar } from "@/components/ui";

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
            <div key={data.username} className="flex flex-row gap-4 mt-2 mb-4">
                <RAvatar
                    src={data.avatar}
                    size="w-20 h-20"
                />
                <p className="text-lg font-medium break-words">{data.fullname}</p>
            </div>
        </div>
    );
};

export default ProfileFollowCard;
