import React from "react";
import { observer } from "mobx-react-lite";
import { RTextInput, RTextArea, RButton, RHorizontalLine } from "@/components/ui";
import { Icon } from "@iconify/react";

interface ProfileEditFormProps {
    changingForm: any;
    setChangingForm: (form: any) => void;
    userStore: any;
    error: string | null;
    updateProfileError: string | null;
    loginCorrect: boolean;
    isCheckingUsername: boolean;
    checkUsername: (username: string) => void;
}

const ProfileEditForm: React.FC<ProfileEditFormProps> = observer(({
    changingForm,
    setChangingForm,
    userStore,
    error,
    updateProfileError,
    loginCorrect,
    isCheckingUsername,
    checkUsername
}) => {
    return (
        <form className="px-2 py-1 w-full" onSubmit={(e) => e.preventDefault()}>
            <div>
                {userStore && !userStore.user.custom_login_set && (
                    <div className="mb-2">
                        <div className="bg-green-50 border-2 border-green-300 rounded-md p-2 text-green-600 mb-2">
                            <p>Вам доступна возможность один раз сменить тег</p>
                            <br />
                            <p><i>(Тег - это имя, с помощью которого можно будет посетить ваш профиль)</i></p>
                        </div>
                        {error && (
                            <div className="mb-2 text-center bg-red-100 px-2 py-1 rounded-md border-red-500 border">
                                <p className="text-red-500">{error}</p>
                            </div>
                        )}
                        {updateProfileError && (
                            <div className="mb-2 text-center bg-red-100 px-2 py-1 rounded-md border-red-500 border">
                                <p className="text-red-500">{updateProfileError}</p>
                            </div>
                        )}
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
                                placeholder={changingForm.username || ""}
                                bind={[changingForm, "new_username", setChangingForm]}
                                maxLength={16}
                            />
                        </div>
                        {changingForm.new_username.length > 0 && (
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
                <RHorizontalLine title="Личная информация" />
                <p className="text-md font-medium">Имя</p>
                <RTextInput
                    placeholder=""
                    bind={[changingForm, "fullname", setChangingForm]}
                />
                <p className="text-md font-medium">Телефон</p>
                <RTextInput
                    placeholder=""
                    bind={[changingForm, "phone", setChangingForm]}
                />
                <p className="text-md font-medium">О себе</p>
                <RTextArea
                    placeholder=""
                    bind={[changingForm, "about", setChangingForm]}
                    rows={5}
                    maxLength={255}
                />
                <RHorizontalLine title="Социальные сети" />
                <p className="text-md font-medium">Telegram</p>
                <RTextInput
                    placeholder=""
                    bind={[changingForm, "telegram_link", setChangingForm]}
                />
                <p className="text-md font-medium">GitHub</p>
                <RTextInput
                    placeholder=""
                    bind={[changingForm, "github_link", setChangingForm]}
                />
                <p className="text-md font-medium">VK</p>
                <RTextInput
                    placeholder=""
                    bind={[changingForm, "vk_link", setChangingForm]}
                />
                <p className="text-md font-medium">Discord</p>
                <RTextInput
                    placeholder=""
                    bind={[changingForm, "discord_link", setChangingForm]}
                />
            </div>
        </form>
    );
});

export default ProfileEditForm;
