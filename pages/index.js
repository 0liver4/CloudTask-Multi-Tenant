import styles from "@/styles/index.module.css";

export default function HomePage() {
    return (
        <section className={styles.page}>
            <h1 className={styles.title}>CloudTask</h1>
            <p className={styles.description}>
                A lightweight multi-tenant task board with server-rendered dashboards and interactive task creation.
            </p>
        </section>
    );
}
