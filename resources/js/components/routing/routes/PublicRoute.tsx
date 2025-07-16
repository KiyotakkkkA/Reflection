import { Navigate, useLocation } from "react-router-dom";
import { useVerifyToken, useGetSession } from "@/hooks/useAuth";
import { userStore } from "@/store";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import {
    RAnimatedLoader,
} from "@/components/ui";

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
            <div className="min-h-screen">
                <RAnimatedLoader className="mt-40" />
            </div>
        );
    }

    if (sessionData?.id && publicToRedirect[location.pathname]) {
        return <Navigate to={publicToRedirect[location.pathname]} />;
    }

    return <div className="min-h-screen">{children}</div>;
});

export default PublicRoute;
