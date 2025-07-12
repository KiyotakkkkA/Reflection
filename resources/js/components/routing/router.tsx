import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { PublicRoute, PrivateRoute } from "./routes";
import {
    MainPage,
    LoginPage,
    RegisterPage,
    EmailVerifyPage,
    PasswordRecoveryPage,
    PasswordResetPage,
} from "../pages";

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
        </Router>
    );
};

export default MRouter;
