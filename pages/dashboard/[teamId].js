import TEAM_NAMES from "@/lib/teamsNames";
import styles from "@/styles/teamId.module.css";

export async function getServerSideProps({ params }) {
    const teamId = params?.teamId;

    if (!teamId || !TEAM_NAMES[teamId]) {
        return {
            notFound: true,
        };
    }

    try {
        const baseUrl = process.env.NEXT_BASE_URL;
        const response = await fetch(`http://${baseUrl}/api/tasks?teamId=${teamId}`, {
            headers: {
                "content-type": "application/json",
            },
        });

        const responseText = await response.text();
        let payload = [];

        if (responseText) {
            try {
                payload = JSON.parse(responseText);
            } catch {
                payload = [];
            }
        }

        const tasks = Array.isArray(payload) ? payload : [];

        return {
            props: {
                teamId,
                tasks,
                errorMessage: null,
            },
        };
    } catch (error) {
        return {
            props: {
                teamId,
                tasks: [],
                errorMessage: error.message,
            },
        };
    }
}

export default function TeamDashboardPage({ teamId, tasks, errorMessage }) {
    return (
        <section className={styles.page}>
            <div className={styles.header}>
                <div>
                    <p className={styles.eyebrow}>Team dashboard</p>
                    <h1 className={styles.title}>{TEAM_NAMES[teamId] ?? teamId}</h1>
                </div>
                <div className={styles.summary}>
                    <span>{tasks.length} tasks</span>
                </div>
            </div>

            {errorMessage ? (
                <p className={styles.error}>{errorMessage}</p>
            ) : (
                <div className={styles.grid}>
                    {tasks.map((task) => (
                        <article key={task.id} className={styles.card}>
                            <h2 className={styles.taskTitle}>{task.title}</h2>
                            <p className={styles.description}>{task.description}</p>
                            <div className={styles.footer}>
                                <span className={styles.badge}>{task.priority}</span>
                                <span className={styles.badge}>{task.status}</span>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}
