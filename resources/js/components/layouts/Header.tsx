import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RButton, RDropdown, RSidebar } from '../ui';
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

                {userStore.user.id && (
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
                                <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Мой профиль</Link>
                                <Link to="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Настройки</Link>
                                <div className="border-t border-gray-100 my-1"></div>
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
                )}
            </div>
            <hr />
        </header>
    );
});

export default Header;

