import { Navigate, useLocation } from "react-router-dom";
import { useVerifyToken, useGetSession } from "@/hooks/useAuth";
import { userStore } from "@/store";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import {
    RAnimatedLoader,
} from "@/components/ui";
import Header from "@/components/layouts/Header";

interface PublicRouteProps {
    children: React.ReactNode;
}

const PublicRoute = observer(({ children }: PublicRouteProps) => {

    const location = useLocation();

    const { data: verifyTokenData, isPending: verifyTokenPending } = useVerifyToken();

    const { data: sessionData, isPending: sessionPending } = useGetSession();

    const publicToRedirect: Record<string, string> = {
        "/auth/login": "/main",
        "/auth/register": "/main",
        "/auth/verify": "/main",
        "/auth/recovery-password": "/main",
        "/auth/reset-password": "/main",
    }

    useEffect(() => {
        if (sessionData?.id) {
            userStore.setUser(sessionData);
        }
    }, [sessionData]);

    if (verifyTokenPending || sessionPending) {
        return (
            <>
                <Header />
                <RAnimatedLoader className="mt-40" />
            </>
        );
    }

    if (sessionData?.id && publicToRedirect[location.pathname]) {
        return <Navigate to={publicToRedirect[location.pathname]} />;
    }

    return <>{children}</>;
});

export default PublicRoute;
