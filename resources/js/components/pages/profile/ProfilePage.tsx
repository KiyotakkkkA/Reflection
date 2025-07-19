import {
    RPanel,
    RAnimatedLoader,
} from "../../ui";
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
import { useState, useEffect, useCallback } from "react";
import { ProfileEditForm, ProfileUserBlock } from "../../ui/organisms/profile";

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
        about: "",
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
                about: data.about ?? "",
            });

            setAvatar(data.avatar);
        }
    }, [data]);

    const checkUsername = useCallback((username: string) => {
        checkUsernameMutation(username);
    }, [checkUsernameMutation]);

    const updateProfile = useCallback(() => {
        updateProfileMutation({
            fullname: changingForm.fullname,
            old_username: changingForm.old_username,
            new_username: userStore.user.custom_login_set ? "" : changingForm.new_username,
            phone: changingForm.phone,
            telegram_link: changingForm.telegram_link,
            github_link: changingForm.github_link,
            vk_link: changingForm.vk_link,
            discord_link: changingForm.discord_link,
            about: changingForm.about,
        });
        setIsChanging(false);
    }, [
        changingForm,
        updateProfileMutation,
        userStore.user.custom_login_set
    ]);

    const clearChangingForm = useCallback(() => {
        setChangingForm({
            fullname: data?.fullname ?? "",
            old_username: username as string,
            new_username: data?.username ?? "",
            phone: data?.phone ?? "",
            telegram_link: data?.telegram_link ?? "",
            github_link: data?.github_link ?? "",
            vk_link: data?.vk_link ?? "",
            discord_link: data?.discord_link ?? "",
            about: data?.about ?? "",
        });
        checkUsernameReset();
        updateProfileReset();
        setLoginCorrect(false);
        setIsChanging(false);
    }, [
        data,
        username,
        checkUsernameReset,
        updateProfileReset
    ]);

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
                <RAnimatedLoader className="mt-40" />
            </>
        );
    }

    return (
        <div>
            <div className="flex">
                <ProfileUserBlock
                    avatar={avatar}
                    updateAvatar={updateAvatar}
                    updateAvatarError={updateAvatarError || null}
                    data={data}
                    isChanging={isChanging}
                    setIsChanging={setIsChanging}
                    loginCorrect={loginCorrect}
                    updateProfile={updateProfile}
                    clearChangingForm={clearChangingForm}
                    staticImages={staticImages}
                />
                <div className="grid grid-cols-4 gap-4 px-4 w-full">
                    <div className={`${isChanging ? "col-span-3 col-start-2" : "col-span-4 col-start-1"} row-start-1 flex flex-col`}>
                        <RPanel className="w-full" shadowed bordered>
                            <div>
                            </div>
                        </RPanel>
                    </div>
                    <div className={`${isChanging && userInHisProfile ? "col-span-1 col-start-1" : "hidden"} row-start-1 flex flex-col`}>
                        <RPanel className="w-full" shadowed bordered>
                            {isChanging && (
                                <ProfileEditForm
                                    changingForm={changingForm}
                                    setChangingForm={setChangingForm}
                                    userStore={userStore}
                                    error={error || null}
                                    updateProfileError={updateProfileError || null}
                                    loginCorrect={loginCorrect}
                                    isCheckingUsername={isCheckingUsername}
                                    checkUsername={checkUsername}
                                />
                            )}
                        </RPanel>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ProfilePage;

