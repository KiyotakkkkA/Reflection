import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RButton, RSidebar, RLink, RAvatar } from '../ui';
import { userStore } from '@/store';
import { useLogout } from '@/hooks/useAuth';
import { observer } from 'mobx-react-lite';

const Header = observer(() => {
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    const { mutate } = useLogout();

    return (
        <header className="bg-white shadow-sm">
            <div className="container mx-auto flex justify-between items-center px-4 py-3">
                <div className="flex items-center space-x-3">
                    <Link to="/main" className="flex items-center">
                        <svg className="h-8 w-8 text-black" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 12L12 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 12L20 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 12L4 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="ml-2 text-xl font-bold text-gray-800">Reflection</span>
                    </Link>
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

