import { useState } from "react";

import Button from "../../../../components/ui/Button";
import PaymentModal from "../PaymentModal/PaymentModal";

type PaymentCardProps = {
    reservationId: string;
    paymentStatus: "UNPAID" | "PAID";
    totalPrice: number;
};

export default function PaymentCard({
    reservationId,
    paymentStatus,
    totalPrice
}: PaymentCardProps) {
    const [isOpen, setIsOpen] = useState(false);

    if (paymentStatus === "PAID") {
        return (
            <div>
                <p>Betaald ✓</p>
            </div>
        );
    }

    return (
        <>
            <div>
                <p>Nog niet betaald</p>

                <Button
                    as="button"
                    type="button"
                    onClick={() => setIsOpen(true)}
                >
                    Betaal nu
                </Button>
            </div>

            <PaymentModal
                isOpen={isOpen}
                reservationId={reservationId}
                totalPrice={totalPrice}
                onClose={() => setIsOpen(false)}
            />
        </>
    );
}