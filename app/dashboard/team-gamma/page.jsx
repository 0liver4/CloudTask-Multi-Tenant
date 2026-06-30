import TaskRenderer from "@/components/TaskRenderer";
import TaskLoader from "@/components/TaskLoader";
import { Suspense } from "react";

export default function TeamBeta() {

    return (
        <div className="p-6">
            <Suspense fallback={<TaskLoader />}>
                <TaskRenderer teamId="team-gamma" />
            </Suspense>
        </div>
    );
}



