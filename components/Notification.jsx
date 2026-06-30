"use client"

import { useTaskContext } from "@/context/TaskContext";

export default function Notification() {
    const { notification } = useTaskContext();

    if (!notification) return null;

    const bgColor = notification.type === "success" ? "bg-green-500" : "bg-red-500";

    return (
        <div className={`fixed top-20 right-4 ${bgColor} text-white px-4 py-3 rounded shadow-lg z-50`}>
            {notification.message}
        </div>
    );
}
