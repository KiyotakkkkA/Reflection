import {
    RHorizontalLine,
    RAnimatedLoader
} from "@/components/ui"
import {
    ProfileFollowCard
} from "@/components/ui/molecules/profiles";

interface ProfileFollowsBlockProps {
    data: {
        fullname: string;
        username: string;
        avatar: string;
    }[] | null;
    isLoading: boolean;
}

const ProfileFollowsBlock = ({ data, isLoading }: ProfileFollowsBlockProps) => {

    if (isLoading) {
        return (
            <div className="flex justify-center items-center w-full">
                <RAnimatedLoader className="mt-2" />
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full mx-4">
            {data?.map((item) => (
                <div key={item.username}>
                    <ProfileFollowCard
                        data={item}
                    />
                    <RHorizontalLine className="mt-2 mb-2"/>
                </div>
            ))}
        </div>
    );
};

export default ProfileFollowsBlock;

