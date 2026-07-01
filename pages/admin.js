import styles from "@/styles/admin.module.css";

export default function AdminPage() {
    return (
        <section className={styles.page}>
            <h1 className={styles.title}>Admin Dashboard</h1>
            <p className={styles.description}>
                This area is reserved for administrative actions and reports.
            </p>
        </section>
    );
}
