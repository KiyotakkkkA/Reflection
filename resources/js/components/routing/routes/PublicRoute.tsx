import { Navigate } from "react-router-dom";
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

    const { data: verifyTokenData, isPending: verifyTokenPending } = useVerifyToken();

    const { data: sessionData, isPending: sessionPending } = useGetSession();

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

    if (userStore.user.id !== null) {
        return <Navigate to="/main" />;
    }

    return <>{children}</>;
});

export default PublicRoute;
