import Header from "../layouts/Header";
import { RAvatar, RButton, RPanel, RAnimatedLoader, RTextInput, RLink } from "../ui";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import {
    useProfile,
    useCheckUsername,
    useUpdateProfile,
    useUpdateAvatar
} from "@/hooks/useProfile";
import { ProfileChangingFormType } from "@/services/api";
import { userStore } from "@/store";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { queryClient } from "@/config/clients";

const ProfilePage = observer(() => {

    const staticImages = {
        icon: {
            telegram: "/images/telegram-icon.svg",
            vk: "/images/vk-icon.svg",
            discord: "/images/discord-icon.svg",
            github: "/images/github-icon.svg",
        }
    }

    const [avatar, setAvatar] = useState("");

    const { username } = useParams();

    const { data, isPending } = useProfile(username as string);
    const { mutate: checkUsernameMutation,
        isPending: isCheckingUsername,
        error,
        reset: checkUsernameReset,
        data: checkUsernameData } = useCheckUsername();

    const { mutate: updateProfileMutation,
        error: updateProfileError,
        reset: updateProfileReset } = useUpdateProfile();

    const { mutate: updateAvatarMutation,
        error: updateAvatarError,
        reset: updateAvatarReset } = useUpdateAvatar();

    const [isChanging, setIsChanging] = useState(false);
    const [loginCorrect, setLoginCorrect] = useState(false);
    const [changingForm, setChangingForm] = useState<ProfileChangingFormType>({
        fullname: "",
        old_username: username as string,
        new_username: "",
        phone: "",
        telegram_link: "",
        github_link: "",
        vk_link: "",
        discord_link: "",
    });

    const userInHisProfile = userStore.checkIfUserInHisProfile(data?.username as string);

    useEffect(() => {
        if (checkUsernameData) {
            setLoginCorrect(checkUsernameData);
        }
    }, [checkUsernameData]);

    useEffect(() => {
        if (error) {
            setLoginCorrect(false);
        }
    }, [error]);

    useEffect(() => {
        if (data) {
            setChangingForm({
                fullname: data.fullname ?? "",
                old_username: data.username ?? "",
                new_username: data.username ?? "",
                phone: data.phone ?? "",
                telegram_link: data.telegram_link ?? "",
                github_link: data.github_link ?? "",
                vk_link: data.vk_link ?? "",
                discord_link: data.discord_link ?? "",
            });

            setAvatar(data.avatar);
        }
    }, [data]);

    const clearChangingForm = () => {
        setChangingForm({
            fullname: data?.fullname ?? "",
            old_username: username as string,
            new_username: data?.username ?? "",
            phone: data?.phone ?? "",
            telegram_link: data?.telegram_link ?? "",
            github_link: data?.github_link ?? "",
            vk_link: data?.vk_link ?? "",
            discord_link: data?.discord_link ?? "",
        });

        checkUsernameReset();
        updateProfileReset();
        setLoginCorrect(false);
        setIsChanging(false);
    };

    const checkUsername = (username: string) => {
        checkUsernameMutation(username);
    }

    const updateProfile = () => {
        updateProfileMutation({
            fullname: changingForm.fullname,
            old_username: changingForm.old_username,
            new_username: userStore.user.custom_login_set ? "" : changingForm.new_username,
            phone: changingForm.phone,
            telegram_link: changingForm.telegram_link,
            github_link: changingForm.github_link,
            vk_link: changingForm.vk_link,
            discord_link: changingForm.discord_link,
        });
        setIsChanging(false);
    }

    const updateAvatar = (file: File) => {
        updateAvatarReset();
        const formData = new FormData();

        formData.append('username', username as string);
        formData.append('image', file);

        updateAvatarMutation(formData, {
            onSuccess: (data) => {
                setAvatar(data.avatar);
            },
        });
    };

    if (isPending) {
        return (
            <>
                <Header />
                <RAnimatedLoader className="mt-40" />
            </>
        );
    }

    return (
        <div>
            <Header />
            <div className="flex">
                <div className="flex flex-col ml-4">
                    <RPanel className="flex flex-col px-4 py-4 w-[20rem]" shadowed>
                        {updateAvatarError && <div className="mb-2 text-center bg-red-100 px-2 py-1 rounded-md border-red-500 border">
                            <p className="text-red-500">{updateAvatarError}</p>
                        </div>}
                        <RAvatar
                            isChanging={isChanging}
                            src={avatar}
                            size="w-70 h-70"
                            onChange={updateAvatar}
                        />
                        <div>
                            <p className="text-lg font-medium">{data?.fullname ?? "[Не указано]"}</p>
                        </div>
                        <div className="mt-2 text-muted">
                            @{data?.username}
                        </div>
                        {userInHisProfile && (
                            <>
                                {!isChanging ? (
                                    <div>
                                        <RButton
                                            icon="mdi:pencil"
                                            iconWidth={20}
                                            iconHeight={20}
                                            text="Редактировать"
                                            primary
                                            centered
                                            className="mt-4 w-full"
                                            onClick={() => setIsChanging(true)}
                                        />
                                    </div>
                                ) : (
                                    <div>
                                        <RButton
                                            icon={loginCorrect || (userStore && userStore.user.custom_login_set) ? "mdi:check" : "mdi:lock"}
                                            disabled={!loginCorrect && !(userStore && userStore.user.custom_login_set) as boolean}
                                            iconWidth={20}
                                            iconHeight={20}
                                            text={loginCorrect || (userStore && userStore.user.custom_login_set) ? "Сохранить" : "Логин не проверен"}
                                            primary
                                            centered
                                            className="mt-4 w-full"
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
                    {
                        !isChanging && (
                            <RPanel className="mt-4 flex flex-col" shadowed>
                                {
                                    data?.phone && (
                                        <div className="flex items-center gap-2 ml-4">
                                            <Icon icon="mdi:phone" width={24} height={24} />
                                            <span>{data?.phone}</span>
                                        </div>
                                    )
                                }
                                <div className="flex items-center justify-center mb-2 mt-4">
                                    <div className="w-full border-b border-gray-300"></div>
                                    <span className="px-4 bg-white text-gray-500 whitespace-nowrap">Социальные сети</span>
                                    <div className="w-full border-b border-gray-300"></div>
                                </div>
                                <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-2 w-full">
                                    {
                                        data?.telegram_link && (
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
                                        )
                                    }
                                    {
                                        data?.vk_link && (
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
                                        )
                                    }
                                    {
                                        data?.discord_link && (
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
                                        )
                                    }
                                    {
                                        data?.github_link && (
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
                                        )
                                    }
                                </div>
                            </RPanel>
                        )
                    }
                </div>
                <div className="grid grid-cols-4 gap-4 px-4 w-full">
                    <div className={`${isChanging ? "col-span-3 col-start-2" : "col-span-4 col-start-1"} row-start-1 flex flex-col`}>
                        <RPanel className="w-full">
                            <div>
                            </div>
                        </RPanel>
                    </div>
                    <div className={`${isChanging && userInHisProfile ? "col-span-1 col-start-1" : "hidden"} row-start-1 flex flex-col`}>
                        <RPanel className="w-full" shadowed>
                            {isChanging && (
                                <form className="px-2 py-1 w-full" onSubmit={(e) => e.preventDefault()}>
                                    <div>
                                        {userStore && !userStore.user.custom_login_set && (
                                            <div className="mb-2">
                                                <div className="bg-green-50 border-2 border-green-300 rounded-md p-2 text-green-600 mb-2">
                                                    <p>Вам доступна возможность один раз сменить тег</p>
                                                    <br />
                                                    <p><i>(Тег - это имя, с помощью которого можно будет посетить ваш профиль)</i></p>
                                                </div>
                                                {error && <div className="mb-2 text-center bg-red-100 px-2 py-1 rounded-md border-red-500 border">
                                                    <p className="text-red-500">{error}</p>
                                                </div>}
                                                {updateProfileError && <div className="mb-2 text-center bg-red-100 px-2 py-1 rounded-md border-red-500 border">
                                                    <p className="text-red-500">{updateProfileError}</p>
                                                </div>}
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <p className="text-md font-medium">Тег</p>
                                                        {loginCorrect && (
                                                            <Icon
                                                                icon="mdi:check"
                                                                width={20}
                                                                height={20}
                                                                className="text-green-700"
                                                            />
                                                        )}
                                                    </div>
                                                    <RTextInput
                                                        placeholder={data?.username}
                                                        bind={[changingForm, "new_username", setChangingForm]}
                                                        maxLength={16}
                                                    />
                                                </div>
                                                { changingForm.new_username.length > 0 && (
                                                    <RButton
                                                    icon={isCheckingUsername ? "mdi:refresh" : "mdi:check"}
                                                    iconWidth={20}
                                                    iconHeight={20}
                                                    text={isCheckingUsername ? "Проверка..." : "Проверить"}
                                                    primaryOutline
                                                    centered
                                                    disabled={isCheckingUsername}
                                                    className="mt-4 w-full"
                                                    onClick={() => {
                                                        checkUsername(changingForm.new_username);
                                                    }}
                                                />
                                                )}
                                            </div>
                                        )}
                                        <div className="flex items-center justify-center mb-2">
                                            <div className="w-full border-b border-gray-300"></div>
                                            <span className="px-4 bg-white text-gray-500 whitespace-nowrap">Личная информация</span>
                                            <div className="w-full border-b border-gray-300"></div>
                                        </div>
                                        <p className="text-md font-medium">Имя</p>
                                        <RTextInput
                                            placeholder={data?.fullname}
                                            bind={[changingForm, "fullname", setChangingForm]}
                                        />
                                        <p className="text-md font-medium">Телефон</p>
                                        <RTextInput
                                            placeholder={data?.phone}
                                            bind={[changingForm, "phone", setChangingForm]}
                                        />
                                        <div className="flex items-center justify-center mb-2 mt-4">
                                            <div className="w-full border-b border-gray-300"></div>
                                            <span className="px-4 bg-white text-gray-500 whitespace-nowrap">Социальные сети</span>
                                            <div className="w-full border-b border-gray-300"></div>
                                        </div>
                                        <p className="text-md font-medium">Telegram</p>
                                        <RTextInput
                                            placeholder={data?.telegram_link}
                                            bind={[changingForm, "telegram_link", setChangingForm]}
                                        />
                                        <p className="text-md font-medium">GitHub</p>
                                        <RTextInput
                                            placeholder={data?.github_link}
                                            bind={[changingForm, "github_link", setChangingForm]}
                                        />
                                        <p className="text-md font-medium">VK</p>
                                        <RTextInput
                                            placeholder={data?.vk_link}
                                            bind={[changingForm, "vk_link", setChangingForm]}
                                        />
                                        <p className="text-md font-medium">Discord</p>
                                        <RTextInput
                                            placeholder={data?.discord_link}
                                            bind={[changingForm, "discord_link", setChangingForm]}
                                        />
                                    </div>
                                </form>
                            )}
                        </RPanel>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ProfilePage;

