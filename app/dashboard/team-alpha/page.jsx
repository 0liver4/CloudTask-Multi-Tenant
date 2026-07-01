// app/team-alpha/page.jsx  (o donde corresponda tu ruta)
import { Suspense } from "react";
import TaskList from "@/components/TaskList";
import TaskLoader from "@/components/TaskLoader";
import TEAM_NAMES from "@/lib/teamsNames";



async function TaskRenderer({ teamId }) {
    const URL = "https:/http://localhost:3000/api/tasks";
    
    try {
        const response = await fetch(
            `${URL}?teamId=${teamId}`,
            { cache: "no-store" }
        );

        consle.log("Response from API:", response);

        if (!response.ok) {
            console.log(response);
            return <p className="text-red-500">Error loading tasks</p>;
        }

        const tasks = await response.json();
        const teamName = TEAM_NAMES[teamId] ?? teamId;

        return <TaskList tasks={tasks} teamName={teamName} />;
    } catch (error) {
        console.error(error);
        return <p className="text-red-500">Something went wrong</p>;
    }
}

export default function TeamAlpha() {
    return (
        <div className="p-6">
            <Suspense fallback={<TaskLoader />}>
                <TaskRenderer teamId="team-alpha" />
            </Suspense>
        </div>
    );
}