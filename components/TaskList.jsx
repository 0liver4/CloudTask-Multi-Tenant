"use client";
import { useTaskContext } from "@/context/TaskContext";

export default function TaskList({ tasks, teamName }) {

    const { theme } = useTaskContext();

    return (
        <div>
            <h1 className={`text-3xl font-bold mb-6 ${theme === "dark" ? "text-gray-100" : "text-black" }`}>
                {teamName}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {tasks.map((task) => (

                    <div key={task.id} className={`border rounded-xl p-4 ${theme === "dark" ? "bg-gray-950 text-gray-100" : "bg-white text-black" }`}>
                        <h2 className="font-bold text-lg">
                            {task.title}
                        </h2>

                        <p className="text-gray-500">
                            {task.description}
                        </p>

                        <div className="mt-3 flex justify-between">
                            <span>
                                {task.priority}
                            </span>

                            <span>
                                {task.status}
                            </span>
                        </div>

                    </div>

                ))}
            </div>
        </div>

    );
}