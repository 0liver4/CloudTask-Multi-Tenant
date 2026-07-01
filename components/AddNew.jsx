import { useState } from "react";
import { createPortal } from "react-dom";
import { useTaskContext } from "@/context/TaskContext";
import styles from "@/styles/AddNew.module.css";

export default function AddNew({ anchorRef, onClose }) {
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
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error);
            }

            showNotification("Task created successfully", "success");
            onClose(false);
        } catch (error) {
            console.error(error);
            showNotification("Error creating task", "error");
        } finally {
            setLoading(false);
        }
    }

    return createPortal(
        <div className={styles.overlay}>
            <div
                className={`${styles.modal} ${theme === "dark" ? styles.dark : styles.light}`}
                style={rect ? { top: rect.top + 8, left: rect.left + 8 } : undefined}
            >
                <div className={styles.modalHeader}>
                    <button type="button" onClick={onClose} className={styles.closeButton}>Close</button>
                </div>
                <h1 className={styles.title}>Create New Task</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div>
                        <label className={styles.label}>Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} required className={styles.input} />
                    </div>
                    <div>
                        <label className={styles.label}>Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} required className={styles.input} />
                    </div>
                    <div>
                        <label className={styles.label}>Priority</label>
                        <select name="priority" value={formData.priority} onChange={handleChange} className={styles.input}>
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                        </select>
                    </div>
                    <div>
                        <label className={styles.label}>Status</label>
                        <select name="status" value={formData.status} onChange={handleChange} className={styles.input}>
                            <option>Pending</option>
                            <option>In Progress</option>
                            <option>Completed</option>
                        </select>
                    </div>
                    <div>
                        <label className={styles.label}>Team</label>
                        <select name="team_id" value={formData.team_id} onChange={handleChange} className={styles.input}>
                            <option value="team-alpha">Team Alpha</option>
                            <option value="team-beta">Team Beta</option>
                            <option value="team-gamma">Team Gamma</option>
                        </select>
                    </div>

                    <button type="submit" disabled={loading} className={styles.submitButton}>
                        {loading ? "Creating..." : "Create Task"}
                    </button>
                </form>
            </div>
        </div>,
        document.body
    );
}
