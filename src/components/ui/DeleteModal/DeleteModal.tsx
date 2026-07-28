import Modal from "../Modal/Modal";
import Button from "../Button";
import styles from "./DeleteModal.module.css";

type DeleteModalProps = { 
    isOpen: boolean;
    title? : string;
    message: string;
    itemName?: string;
    confirmLabel?: string;
    isPending?: boolean;
    onClose: () => void;
    onConfirm: () => void;
};

export default function DeleteModal({
    isOpen,
    title = "Verwijderen",
    message,
    itemName,
    confirmLabel = "Verwijderen",
    isPending = false,
    onClose,
    onConfirm,
}: DeleteModalProps) {
    return (
        <Modal  
            isOpen={isOpen}
            title={title}
            onClose={onClose}
            canClose={!isPending}
        >
            <p>{message}</p>

            {itemName && <strong>{itemName}</strong>}

            <div className={styles.actions}>
                <Button
                    type="button"
                    as="button"
                    variant="secondary"
                    onClick={onClose}
                    disabled={isPending}
                >
                    Annuleren
                </Button>

                <Button
                    type="button"
                    as="button"
                    variant="danger"
                    onClick={onConfirm}
                    disabled={isPending}
                >
                    {isPending ? "Verwijderen..." : confirmLabel}
                </Button>
            </div>
        </Modal>
    );
}