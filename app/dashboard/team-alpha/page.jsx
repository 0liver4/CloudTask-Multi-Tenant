import TaskRenderer from "@/components/TaskRenderer";
import { Suspense } from "react";
import TaskLoader from "@/components/TaskLoader";

export default function TeamAlpha() {

    return (
        <div className="p-6">
            <Suspense fallback={<TaskLoader />}>
                <TaskRenderer teamId="team-alpha" />
            </Suspense>
        </div>
    );
}