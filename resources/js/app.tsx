import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./config/clients";

import MRouter from "./components/routing/router";

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <main>
                <MRouter />
            </main>
        </QueryClientProvider>
    );
};

createInertiaApp({
    title: (title: string) => `${title} - ${"E - JOURNAL"}`,
    resolve: () => App,
    setup: ({ el }) => {
        createRoot(el).render(<App />);
    },
    progress: {
        color: "#4B5563",
    },
});
