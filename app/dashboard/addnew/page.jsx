"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTaskContext } from "@/context/TaskContext";

export default function AddNew() {

    const router = useRouter();

    const { showNotification, theme } = useTaskContext();

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

            router.push(`/dashboard/${formData.team_id}`);

            router.refresh();

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

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">
                Create New Task
            </h1>
            <form
                onSubmit={handleSubmit}
                className={`p-6 rounded-xl shadow space-y-4 
                    ${theme === "dark" ? "bg-gray-900" : "bg-white border"}`}
            >

                {/* TITLE */}
                <div>
                    <label className="block mb-1 font-medium">
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
                    <label className="block mb-1 font-medium">
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
                    <label className="block mb-1 font-medium">
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
                    <label className="block mb-1 font-medium">
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
                    <label className="block mb-1 font-medium">
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
                    className={`w-full bg-blue-500 hover:bg-blue-600 py-2 rounded 
                        ${theme === "dark" ? " text-gray-100" : " text-black"}`}
                >
                    {loading
                        ? "Creating..."
                        : "Create Task"}
                </button>

            </form>
        </div>
    );
}