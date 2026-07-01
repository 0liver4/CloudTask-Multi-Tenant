"use client";

import { createContext, useContext, useState } from "react";

const TaskContext = createContext();

export function TaskProvider({ children }) {

    //MOCK USER
    const [user, setUser] = useState({
        name: "Oliver",
        role: "admin",
    });

    //THEME
    const [theme, setTheme] = useState("light");

    //NOTIFICATIONS (TOASTS)
    const [notification, setNotification] = useState(null);

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

    return (
        <TaskContext.Provider
            value={{
                user,
                setUser,
                theme,
                toggleTheme,
                notification,
                showNotification,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
}

// CUSTOM HOOK
export function useTaskContext() {
    return useContext(TaskContext);
}