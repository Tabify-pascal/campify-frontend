import { Outlet, useNavigate } from "react-router-dom";

import Button from "../ui/Button";
import { useLogout } from "../../features/auth/mutations/useLogout";

import styles from "./AccountLayout.module.css";

export default function AccountLayout(){
    const navigate = useNavigate();
    const logoutMutation = useLogout();

    function handleLogout() {
        logoutMutation.mutate(undefined, {
            onSuccess: () => {
                navigate("/", {
                    replace: true,
                });
            },
        });
    }

    return (
        <div className={styles.layout}>
            <aside className={styles.sidebar}>
                <h2 className={styles.title}>
                    Mijn account
                </h2>

                <div className={styles.footer}>
                    <Button
                        as="button"
                        type="button"
                        variant="secondary"
                        onClick={handleLogout}
                        disabled={logoutMutation.isPending}
                    >
                        {logoutMutation.isPending
                            ? "Uitloggen..."
                            : "Uitloggen"}
                    </Button>
                </div>
            </aside>

            <main className={styles.content}>
                <Outlet />
            </main>
        </div>
    )
}