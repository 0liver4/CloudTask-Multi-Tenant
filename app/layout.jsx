"use client";

import "./globals.css";
import { createPortal } from "react-dom";
import Link from "next/link";
import { TaskProvider, useTaskContext } from "@/context/TaskContext";
import Notification from "@/components/Notification";
import { useState, useRef } from "react";

function AddNew({ anchorRef, onClose }) {

    const { showNotification, theme } = useTaskContext();
    const rect = anchorRef.current?.getBoundingClientRect();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "Medium",
        status: "Pending",
        team_id: "team-alpha",
    });

    function handleChange(e) {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            setLoading(true);

            const response = await fetch("/api/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error);
            }

            showNotification(
                "Task created successfully",
                "success"
            );

            onClose(false)


        } catch (error) {

            console.error(error);

            showNotification(
                "Error creating task",
                "error"
            );

        } finally {
            setLoading(false);
        }
    }

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div
                className={`w-105 rounded-xl shadow-xl p-6 ${theme === "dark"
                    ? "bg-gray-900"
                    : "bg-white border"
                    }`}
            >
                <div className="flex justify-end items-center mb-5 text-red-500">
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-xl"
                    >
                        Close
                    </button>
                </div>
                <div>
                    <h1 className={`text-3xl font-bold mb-6 ${theme === "dark"
                        ? "text-white"
                        : "text-black"
                        }`}>
                        Create New Task
                    </h1>
                    <form
                        onSubmit={handleSubmit}
                        className={`p-6 rounded-xl shadow space-y-4 
                            ${theme === "dark" ? "bg-gray-900" : "bg-white border"}`}
                    >
                        {/* TITLE */}
                        <div>
                            <label className={`block mb-1 font-medium ${theme === "dark"
                                ? "text-white"
                                : "text-black"
                                }`}>
                                Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className={`w-full border rounded px-3 py-2
                            ${theme === "dark" ? " text-gray-100" : " text-black"}`}
                            />
                        </div>

                        {/* DESCRIPTION */}
                        <div>
                            <label className={`block mb-1 font-medium ${theme === "dark"
                                ? "text-white"
                                : "text-black"
                                }`}>
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                className={`w-full border rounded px-3 py-2
                            ${theme === "dark" ? " text-gray-100" : " text-black"}`}
                            />
                        </div>

                        {/* PRIORITY */}
                        <div>
                            <label className={`block mb-1 font-medium ${theme === "dark"
                                ? "text-white"
                                : "text-black"
                                }`}>
                                Priority
                            </label>

                            <select
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                className={`w-full border rounded px-3 py-2
                            ${theme === "dark" ? " text-gray-100" : " text-black"}`}
                            >
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                            </select>
                        </div>

                        {/* STATUS */}
                        <div>
                            <label className={`block mb-1 font-medium ${theme === "dark"
                                ? "text-white"
                                : "text-black"
                                }`}>
                                Status
                            </label>

                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className={`w-full border rounded px-3 py-2 
                            ${theme === "dark" ? " text-gray-100" : " text-black"}`}
                            >
                                <option>Pending</option>
                                <option>In Progress</option>
                                <option>Completed</option>
                            </select>
                        </div>

                        {/* TEAM */}
                        <div>
                            <label className={`block mb-1 font-medium ${theme === "dark"
                                ? "text-white"
                                : "text-black"
                                }`}>
                                Team
                            </label>

                            <select
                                name="team_id"
                                value={formData.team_id}
                                onChange={handleChange}
                                className={`w-full border rounded px-3 py-2
                            ${theme === "dark" ? " text-gray-100" : " text-black"}`}
                            >
                                <option value="team-alpha">
                                    Team Alpha
                                </option>

                                <option value="team-beta">
                                    Team Beta
                                </option>

                                <option value="team-gamma">
                                    Team Gamma
                                </option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-500 hover:bg-blue-600 py-2 rounded text-gray-100"
                        >
                            {loading
                                ? "Creating..."
                                : "Create Task"}
                        </button>

                    </form>
                </div>
            </div>
        </div>,
        document.body
    );
}


function AppLayout({ children }) {

    const { user, theme, toggleTheme, showNotification } = useTaskContext();
    const [isOpen, setIsOpen] = useState(false);
    const btnRef = useRef()

    return (
        <div
            className={`flex h-screen ${theme === "dark"
                ? "bg-gray-950 text-gray-100"
                : "bg-white text-black"
                }`}
        >
            {/* SIDEBAR */}
            <aside
                className={`min-w-64 p-4 ${theme === "dark"
                    ? "bg-gray-900 text-gray-100"
                    : "bg-white text-black border-r"
                    }`}
            >
                <h1 className="text-xl font-bold mb-6">
                    CloudTask
                </h1>

                <nav className="space-y-3">

                    <Link
                        href="/"
                        className="block hover:text-blue-500"
                    >
                        Main
                    </Link>

                    <Link
                        href="/admin"
                        className="block hover:text-blue-500"
                    >
                        Admin
                    </Link>

                    <button
                        ref={btnRef}
                        onClick={() => { setIsOpen(true) }}
                        className="block hover:text-blue-500"
                    >
                        Add New Task
                    </button>

                    <Link
                        href="/dashboard/team-alpha"
                        className="block hover:text-blue-500"
                    >
                        Team Alpha
                    </Link>

                    <Link
                        href="/dashboard/team-beta"
                        className="block hover:text-blue-500"
                    >
                        Team Beta
                    </Link>

                    <Link
                        href="/dashboard/team-gamma"
                        className="block hover:text-blue-500"
                    >
                        Team Gamma
                    </Link>

                </nav>

                <div className="mt-10 text-sm text-gray-500">
                    Logged as:
                    <br />

                    <span className="font-semibold">
                        {user.name}
                    </span>
                </div>

                <div className="mt-4 text-sm text-gray-500">
                    Role:
                    <br />

                    <span className="font-semibold">
                        {user.role}
                    </span>
                </div>
            </aside>

            {/* MAIN */}
            <div className="flex-1 flex flex-col">

                {/* HEADER */}
                <header
                    className={`h-14 flex items-center justify-between px-6 ${theme === "dark"
                        ? "bg-gray-900 border-b border-gray-800"
                        : "bg-white border-b"
                        }`}
                >
                    <h2 className="font-semibold">
                        Dashboard
                    </h2>

                    <div className="flex flex-row gap-3">
                        <button
                            onClick={toggleTheme}
                            className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
                        >
                            Toggle Theme
                        </button>
                        <button
                            onClick={() => showNotification("Notification test")}
                            className="px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600">
                            Notification
                        </button>
                    </div>

                </header>

                {/* PAGE CONTENT */}
                <main className="flex-1 overflow-auto p-6">
                    {children}
                    {isOpen && (
                        <AddNew
                            anchorRef={btnRef}
                            onClose={() => setIsOpen(false)}
                        />
                    )}
                </main>

            </div>
        </div>
    );
}

export default function RootLayout({
    children,
}) {
    return (
        <html lang="en" className="h-full antialiased">
            <title>CloudTask Multi-Tenant</title>
            <body className="h-full">
                <TaskProvider>
                    <Notification />
                    <AppLayout>
                        {children}
                    </AppLayout>
                </TaskProvider>
            </body>
        </html>
    );
}
