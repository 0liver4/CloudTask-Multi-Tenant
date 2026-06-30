import TaskList from "./TaskList";

export default async function TaskRenderer({ teamId }) {

    try {

        const response = await fetch(
            `http://localhost:3000/api/tasks?teamId=${teamId}`,
            {
                cache: "no-store"
            }
        );

        if (!response.ok) {
            console.log(response)
            return (
                <p className="text-red-500">
                    Error loading tasks
                </p>
            );
        }

        // Simulated timeout 
        // await new Promise((resolve) =>
        //     setTimeout(resolve, 1000)
        // );

        const tasks = await response.json();
        let teamName;

        if (teamId == "team-alpha") {
            teamName = "Team Alpha";
        }

        if (teamId == "team-beta") {
            teamName = "Team Beta";
        }

        if (teamId == "team-gamma") {
            teamName = "Team Gamma";
        }
        if(teamId == "") {
            teamName = "All Tasks"
        }

        return (
            <TaskList tasks={tasks} teamName={teamName}/>
        );

    } catch (error) {

        console.error(error);

        return (
            <p className="text-red-500">
                Something went wrong
            </p>
        );
    }
}