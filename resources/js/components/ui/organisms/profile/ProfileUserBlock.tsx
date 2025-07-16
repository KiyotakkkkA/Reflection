import React from "react";
import {
    RPanel,
    RAvatar,
    RButton,
    RLink,
    RHorizontalLine
} from "@/components/ui";
import { userStore } from "@/store";
import { ProfileChangingFormType } from "@/services/api";
import { Icon } from "@iconify/react";

interface ProfileUserBlockProps {
    avatar: string;
    updateAvatar: (file: File) => void;
    updateAvatarError: string | null;
    data: any;
    isChanging: boolean;
    setIsChanging: (value: boolean) => void;
    loginCorrect: boolean;
    updateProfile: () => void;
    clearChangingForm: () => void;
    changingForm: ProfileChangingFormType;
    staticImages: {
        icon: {
            telegram: string;
            vk: string;
            discord: string;
            github: string;
        };
    };
}

export const ProfileUserBlock: React.FC<ProfileUserBlockProps> = ({
    avatar,
    updateAvatar,
    updateAvatarError,
    data,
    isChanging,
    setIsChanging,
    loginCorrect,
    updateProfile,
    clearChangingForm,
    changingForm,
    staticImages,
}) => {
    const userInHisProfile = userStore.checkIfUserInHisProfile(data?.username as string);

    return (
        <div className="flex flex-col ml-4">
            <RPanel className="flex flex-col px-4 py-4 w-[20rem]" shadowed bordered>
                {updateAvatarError && (
                    <div className="mb-2 text-center bg-red-100 px-2 py-1 rounded-md border-red-500 border">
                        <p className="text-red-500">{updateAvatarError}</p>
                    </div>
                )}
                <RAvatar
                    isChanging={isChanging}
                    src={avatar}
                    size="w-70 h-70"
                    onChange={updateAvatar}
                />
                <div>
                    <p className="text-lg font-medium break-words">
                        {data?.fullname ?? "[Не указано]"}
                    </p>
                </div>
                <div className="mt-2 text-muted">
                    @{data?.username}
                </div>
                {userInHisProfile && (
                    <>
                        {!isChanging ? (
                            <div>
                                <RHorizontalLine className="mt-2 mb-2"/>
                                <RButton
                                    icon="mdi:pencil"
                                    iconWidth={20}
                                    iconHeight={20}
                                    text="Редактировать"
                                    primary
                                    centered
                                    className="mt-2 w-full"
                                    onClick={() => setIsChanging(true)}
                                />
                            </div>
                        ) : (
                            <div>
                                <RHorizontalLine className="mt-2 mb-2"/>
                                <RButton
                                    icon={
                                        loginCorrect || (userStore && userStore.user.custom_login_set)
                                            ? "mdi:check"
                                            : "mdi:lock"
                                    }
                                    disabled={
                                        !loginCorrect &&
                                        !(userStore && userStore.user.custom_login_set)
                                    }
                                    iconWidth={20}
                                    iconHeight={20}
                                    text={
                                        loginCorrect || (userStore && userStore.user.custom_login_set)
                                            ? "Сохранить"
                                            : "Логин не проверен"
                                    }
                                    primary
                                    centered
                                    className="mt-2 w-full"
                                    onClick={updateProfile}
                                />
                                <RButton
                                    icon="mdi:cancel"
                                    iconWidth={20}
                                    iconHeight={20}
                                    text="Отменить"
                                    primaryOutline
                                    centered
                                    className="mt-4 w-full"
                                    onClick={clearChangingForm}
                                />
                            </div>
                        )}
                    </>
                )}
            </RPanel>

            {!isChanging && (
                <RPanel className="mt-4 flex flex-col" shadowed bordered>
                    {data?.phone && (
                        <div className="flex items-center gap-2 ml-4">
                            <Icon icon="mdi:phone" width={24} height={24} />
                            <span>{data?.phone}</span>
                        </div>
                    )}
                    {data?.about && (
                        <div>
                            <RHorizontalLine title="О себе" className="mt-2 mb-2" />
                            <p className="ml-2 break-words">
                                <i>{data?.about}</i>
                            </p>
                        </div>
                    )}
                    <RHorizontalLine title="Социальные сети" className="mt-2 mb-2" />
                    <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-2 w-full">
                        {data?.telegram_link && (
                            <RLink link={data.telegram_link} className="w-full" light>
                                <div className="flex flex-row items-center gap-2">
                                    <img
                                        src={staticImages.icon.telegram}
                                        alt="Telegram"
                                        width={30}
                                        height={30}
                                    />
                                    <p className="text-lg font-medium">Telegram</p>
                                </div>
                            </RLink>
                        )}
                        {data?.vk_link && (
                            <RLink link={data.vk_link} className="w-full" light>
                                <div className="flex flex-row items-center gap-2">
                                    <img
                                        src={staticImages.icon.vk}
                                        alt="VK"
                                        width={30}
                                        height={30}
                                    />
                                    <p className="text-lg font-medium">VK</p>
                                </div>
                            </RLink>
                        )}
                        {data?.discord_link && (
                            <RLink link={data.discord_link} className="w-full" light>
                                <div className="flex flex-row items-center gap-2">
                                    <img
                                        src={staticImages.icon.discord}
                                        alt="Discord"
                                        width={30}
                                        height={30}
                                    />
                                    <p className="text-lg font-medium">Discord</p>
                                </div>
                            </RLink>
                        )}
                        {data?.github_link && (
                            <RLink link={data.github_link} className="w-full" light>
                                <div className="flex flex-row items-center gap-2">
                                    <img
                                        src={staticImages.icon.github}
                                        alt="GitHub"
                                        width={30}
                                        height={30}
                                    />
                                    <p className="text-lg font-medium">GitHub</p>
                                </div>
                            </RLink>
                        )}
                    </div>
                </RPanel>
            )}
        </div>
    );
};

export default ProfileUserBlock;

