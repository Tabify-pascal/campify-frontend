import { useEffect, useId, type MouseEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";

import styles from "./Modal.module.css";

type ModalProps = {
    isOpen: boolean;
    title: string;
    onClose: () => void;
    children: ReactNode;
    canClose?: boolean;
};

export default function Modal({
    isOpen, title, onClose, children, canClose = true
}: ModalProps) {
    const titleId = useId();

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape" && canClose) {
                onClose();
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        }
    }, [isOpen, onClose, canClose]);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    function handleOverlayClick(
        event: MouseEvent<HTMLDivElement>
    ) {
        if (canClose && event.target === event.currentTarget) {
            onClose();
        }
    }

    return createPortal(
        <div className={styles.overlay} onClick={handleOverlayClick}>
            <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby={titleId}>
                <header className={styles.header}>
                    <h2 id={titleId}>{title}</h2>
                    {canClose && (<button type="button" onClick={onClose} className={styles.closeButton} aria-label="Modal sluiten">
                        ×
                    </button>
                    )}
                </header>

                <div className={styles.content}>
                    {children}
                </div>
            </section>
        </div>,
        document.body
    );
}

