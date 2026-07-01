import { notFound } from "next/navigation";
import TaskList from "@/components/TaskList";
import TEAM_NAMES from "@/lib/teamsNames";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

async function getTasksByTeam(teamId) {
    const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("team_id", teamId)
        .order("created_at", { ascending: false });

    if (error) {
        throw new Error(error.message);
    }

    return data ?? [];
}

export default async function TeamDashboardPage({ params }) {
    const { teamId } = await params;

    if (!teamId || !TEAM_NAMES[teamId]) {
        notFound();
    }

    const tasks = await getTasksByTeam(teamId);

    return (
        <div className="p-6">
            <TaskList tasks={tasks} teamName={TEAM_NAMES[teamId]} />
        </div>
    );
}
