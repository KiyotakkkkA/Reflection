import Header from "../layouts/Header";

import { RAvatar, RButton, RPanel } from "../ui";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useProfile } from "@/hooks/useProfile";

const ProfilePage = observer(() => {

    const { username } = useParams();

    const { data, isPending } = useProfile(username as string);

    return (
        <div>
            <Header />
            <div className="grid grid-cols-4 gap-4 px-4">
                <RPanel className="col-span-2 flex flex-col items-center justify-center px-4 py-4">
                    <RAvatar
                        src={data?.avatar}
                        size="w-72 h-72"
                    />
                    <div className="mt-2 text-muted">
                        @{data?.username}
                    </div>
                    <RButton icon="mdi:pencil" iconWidth={20} iconHeight={20} text="Редактировать профиль" primary centered className="mt-4 w-full"/>
                </RPanel>
            </div>
        </div>
    );
});

export default ProfilePage;

