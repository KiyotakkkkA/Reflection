import { Navigate } from "react-router-dom";
import { useGetSession } from "@/hooks/useAuth";
import { userStore } from "@/store";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import {
    RAnimatedLoader,
} from "@/components/ui";
import Header from "@/components/layouts/Header";

interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute = observer(({ children }: PrivateRouteProps) => {

    const { data: sessionData, isPending: sessionPending } = useGetSession();

    useEffect(() => {
        if (sessionData?.id) {
            userStore.setUser(sessionData);
        }
    }, [sessionData]);

    if (sessionPending) {
        return (
            <>
                <Header />
                <RAnimatedLoader className="mt-40" />
            </>
        );
    }

    if (!userStore.user.id) {
        return <Navigate to="/auth/login" />;
    }

    return <>{children}</>;
});

export default PrivateRoute;
