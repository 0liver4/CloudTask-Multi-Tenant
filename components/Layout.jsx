"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useTaskContext } from "@/context/TaskContext";
import AddNew from "@/components/AddNew";
import styles from "@/styles/AppShell.module.css";

export default function Layout({ children }) {
    const { user, theme, toggleTheme, showNotification } = useTaskContext();
    const [isOpen, setIsOpen] = useState(false);
    const btnRef = useRef();

    return (
        <div className={styles.shell} data-theme={theme}>
            <aside className={styles.sidebar}>
                <h1 className={styles.logo}>CloudTask</h1>

                <nav className={styles.navList}>
                    <Link href="/" className={styles.navLink}>Main</Link>
                    <Link href="/admin" className={styles.navLink}>Admin</Link>
                    <button ref={btnRef} onClick={() => setIsOpen(true)} className={styles.navLinkButton}>
                        Add New Task
                    </button>
                    <Link href="/dashboard/team-alpha" className={styles.navLink}>Team Alpha</Link>
                    <Link href="/dashboard/team-beta" className={styles.navLink}>Team Beta</Link>
                    <Link href="/dashboard/team-gamma" className={styles.navLink}>Team Gamma</Link>
                </nav>

                <div className={styles.userBlock}>
                    <span className={styles.label}>Logged as:</span>
                    <span className={styles.value}>{user.name}</span>
                </div>

                <div className={styles.userBlock}>
                    <span className={styles.label}>Role:</span>
                    <span className={styles.value}>{user.role}</span>
                </div>
            </aside>

            <div className={styles.mainArea}>
                <header className={styles.header}>
                    <h2 className={styles.headerTitle}>Dashboard</h2>
                    <div className={styles.headerActions}>
                        <button onClick={toggleTheme} className={styles.primaryButton}>Toggle Theme</button>
                        <button onClick={() => showNotification("Notification test")} className={styles.secondaryButton}>
                            Notification
                        </button>
                    </div>
                </header>

                <main className={styles.content}>{children}</main>
            </div>

            {isOpen && <AddNew anchorRef={btnRef} onClose={() => setIsOpen(false)} />}
        </div>
    );
}
