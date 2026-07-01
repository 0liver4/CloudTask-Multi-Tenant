import styles from "@/styles/403.module.css";

export default function ForbiddenPage() {
    return (
        <section className={styles.page}>
            <h1 className={styles.code}>403</h1>
            <p className={styles.title}>Access Forbidden</p>
            <p className={styles.description}>
                You do not have permission to access this page.
            </p>
        </section>
    );
}
