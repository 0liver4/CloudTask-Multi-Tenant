"use client";

import { useTaskContext } from "@/context/TaskContext";
import styles from "@/styles/Notification.module.css";

export default function Notification() {
    const { notification } = useTaskContext();

    if (!notification) return null;

    const isSuccess = notification.type === "success";

    return (
        <div className={`${styles.toast} ${isSuccess ? styles.success : styles.error}`}>
            {notification.message}
        </div>
    );
}
