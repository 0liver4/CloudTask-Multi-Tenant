"use client";

import { createContext, useContext, useState } from "react";

const TaskContext = createContext();

export function TaskProvider({ children }) {

    //MOCK USER
    const [user, setUser] = useState({
        name: "Oliver",
        role: "admin",
        teamName: "team-alpha"
    });

    //THEME
    const [theme, setTheme] = useState("light");
// 
    //NOTIFICATIONS (TOASTS)
    const [notification, setNotification] = useState(null);

    //TRIGGER REFRESH (preload all tasks)
    const [refreshKey, setRefreshKey] = useState(0);

    //TOGGLE THEME
    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    //SHOW NOTIFICATION
    const showNotification = (message, type = "success") => {
        setNotification({ message, type });

        setTimeout(() => {
            setNotification(null);
        }, 3000);
    };

    //REFRESH TASKS
    const refreshTasks = () => {
        setRefreshKey((prev) => prev + 1);
    };

    return (
        <TaskContext.Provider
            value={{
                user,
                setUser,
                theme,
                toggleTheme,
                notification,
                showNotification,
                refreshTasks,
                refreshKey,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
}

// 🧠 CUSTOM HOOK
export function useTaskContext() {
    return useContext(TaskContext);
}