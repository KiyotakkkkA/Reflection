import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { PublicRoute, PrivateRoute } from "./routes";
import {
    MainPage,
    ProfilePage,
    ProfileFollowersPage,
    ProfileFollowingsPage,
    LoginPage,
    RegisterPage,
    EmailVerifyPage,
    PasswordRecoveryPage,
    PasswordResetPage,
} from "../pages";

import Footer from "../layouts/Footer";
import Header from "../layouts/Header";

const publicRoutes = [
    {
        path: "/auth/login",
        element: <LoginPage />,
    },
    {
        path: "/auth/register",
        element: <RegisterPage />,
    },
    {
        path: "/auth/verify",
        element: <EmailVerifyPage />,
    },
    {
        path: "/auth/recovery-password",
        element: <PasswordRecoveryPage />,
    },
    {
        path: "/auth/reset-password",
        element: <PasswordResetPage />,
    },
    {
        path: "/profile/:username",
        element: <ProfilePage />,
    },
    {
        path: "/profile/:username/followers",
        element: <ProfileFollowersPage />,
    },
    {
        path: "/profile/:username/followings",
        element: <ProfileFollowingsPage />,
    }
]

const privateRoutes = [
    {
        path: "/main",
        element: <MainPage />,
    }
]

const MRouter: React.FC = () => {
    return (
        <Router>
            <Header />
            <Routes>
                {privateRoutes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            <PrivateRoute>
                                {route.element}
                            </PrivateRoute>
                        }
                    />
                ))}
                {publicRoutes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            <PublicRoute>
                                {route.element}
                            </PublicRoute>
                        }
                    />
                ))}
                <Route path="*" element={<Navigate to="/auth/login" />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default MRouter;
