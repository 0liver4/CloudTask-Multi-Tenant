import { useEffect } from "react";
import { TaskProvider, useTaskContext } from "@/context/TaskContext";
import Notification from "@/components/Notification";
import Layout from "@/components/Layout";
import "@/styles/globals.css";

function ThemeSync() {
    const { theme } = useTaskContext();

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    return null;
}

export default function App({ Component, pageProps }) {
    return (
        <TaskProvider>
            <ThemeSync />
            <Notification />
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </TaskProvider>
    );
}

