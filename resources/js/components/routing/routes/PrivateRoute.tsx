import { Navigate } from "react-router-dom";
import { useGetSession } from "@/hooks/useAuth";
import { userStore } from "@/store";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import {
    RAnimatedLoader,
} from "@/components/ui";

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
            <div className="min-h-screen">
                <RAnimatedLoader className="mt-40" />
            </div>
        );
    }

    if (!sessionData?.id) {
        return <Navigate to="/auth/login" />;
    }

    return <div className="min-h-screen">{children}</div>;
});

export default PrivateRoute;
