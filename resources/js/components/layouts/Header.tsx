import { useState } from 'react';
import {
    RButton,
    RSidebar,
    RLink,
    RAvatar,
    RLogo
} from '../ui';
import { userStore } from '@/store';
import { useLogout } from '@/hooks/useAuth';
import { observer } from 'mobx-react-lite';

const Header = observer(() => {
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    const { mutate } = useLogout();

    return (
        <header className="bg-white shadow-sm">
            <div className="flex justify-between items-center px-4 py-3">
                <div className="flex items-center space-x-3">
                    <RLogo withText />
                </div>

                {userStore.user.id ? (
                    <div>
                        <div>
                            <RButton className="flex items-center focus:outline-none" onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} text={userStore.user.email || ""} icon="mdi:account" iconWidth={20} iconHeight={20} light />
                        </div>
                        <div className="flex items-center space-x-3">
                            <RSidebar
                                open={isProfileMenuOpen}
                                onClose={() => setIsProfileMenuOpen(false)}
                                className="w-[150px]"
                            >
                                <div className="flex items-center mb-2">
                                    <RAvatar src={userStore.user.avatar || ""} size="w-12 h-12" />
                                    <div className="flex flex-col ml-2">
                                        <span className="text-md text-gray-800 font-medium">{userStore.user.email}</span>
                                        <span className="text-xs text-gray-500 font-medium">@{userStore.user.username}</span>
                                    </div>
                                </div>
                                <div className="border-t border-gray-200 my-1"></div>
                                <RLink icon="mdi:account" link={`/profile/${userStore?.user.username}`} className="text-md block px-4 py-2 hover:bg-gray-100">
                                    Мой профиль
                                </RLink>
                                <RLink icon="mdi:cog" link="/settings" className="text-md block px-4 py-2 hover:bg-gray-100">
                                    Настройки
                                </RLink>
                                <div className="border-t border-gray-200 my-1"></div>
                                <RButton
                                    text="Выход"
                                    className="w-full"
                                    onClick={() => mutate()}
                                    icon="mdi:logout"
                                    iconWidth={20}
                                    iconHeight={20}
                                    light
                                />
                            </RSidebar>
                        </div>
                    </div>
                ) : (
                    <div>
                        <RLink link="/auth/login" className="text-md block px-4 py-2" primaryOutline>
                            Вход
                        </RLink>
                    </div>
                )}
            </div>
            <hr />
        </header>
    );
});

export default Header;

