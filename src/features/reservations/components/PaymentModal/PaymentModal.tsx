import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Modal from "../../../../components/ui/Modal/Modal";
import Button from "../../../../components/ui/Button";

import { useUpdatePaymentStatus } from "../../mutations/useUpdatePaymentStatus";

import styles from "./PaymentModal.module.css";

type Props = {
    isOpen: boolean;
    reservationId: string;
    totalPrice: number;
    onClose: () => void;
};

type PaymentMethod =
    | "IDEAL"
    | "VISA"
    | "MASTERCARD";

type PaymentStep =
    | "METHOD"
    | "IDEAL"
    | "CARD"
    | "PROCESSING"
    | "SUCCESS";

const banks = [
    {
        id: "ing",
        name: "ING",
        logo: "/payment-methods/banks/ing.png",
    },
    {
        id: "rabobank",
        name: "Rabobank",
        logo: "/payment-methods/banks/rabobank.png",
    },
    {
        id: "abn-amro",
        name: "ABN AMRO",
        logo: "/payment-methods/banks/abn-amro.png",
    },
    {
        id: "asn",
        name: "ASN Bank",
        logo: "/payment-methods/banks/asn.png",
    },
];

export default function PaymentModal({
    isOpen,
    reservationId,
    totalPrice,
    onClose,
}: Props) {
    const navigate = useNavigate();

    const [step, setStep] =
        useState<PaymentStep>("METHOD");

    const [paymentMethod, setPaymentMethod] =
        useState<PaymentMethod>("IDEAL");

    const [selectedBank, setSelectedBank] =
        useState("");

    const paymentMutation =
        useUpdatePaymentStatus();

    const isProcessing =
        step === "PROCESSING" ||
        paymentMutation.isPending;

    const formattedPrice =
        new Intl.NumberFormat("nl-NL", {
            style: "currency",
            currency: "EUR",
        }).format(totalPrice);

    function chooseMethod(
        method: PaymentMethod
    ) {
        setPaymentMethod(method);

        if (method === "IDEAL") {
            setStep("IDEAL");
            return;
        }

        setStep("CARD");
    }

    function handlePayment() {
        setStep("PROCESSING");

        window.setTimeout(() => {
            paymentMutation.mutate(
                {
                    reservationId,
                    paymentStatus: "PAID",
                },
                {
                    onSuccess: () => {
                        setStep("SUCCESS");
                    },
                },
            );
        }, 1800);
    }

    function handleClose() {
        if (isProcessing) {
            return;
        }

        setStep("METHOD");
        setSelectedBank("");
        onClose();
    }

    return (
        <Modal
            isOpen={isOpen}
            title={
                step === "SUCCESS"
                    ? "Betaling geslaagd"
                    : step === "PROCESSING"
                    ? "Betaling verwerken"
                    : "Betaling afronden"
            }
            onClose={handleClose}
            canClose={!isProcessing}
        >
            {step !== "SUCCESS" && (
                <div className={styles.amount}>
                    <span>Te betalen</span>
                    <strong>{formattedPrice}</strong>
                </div>
            )}

            {step === "METHOD" && (
                <>
                    <p className={styles.intro}>
                        Kies een betaalmethode.
                    </p>

                    <div className={styles.methods}>
                        <button
                            type="button"
                            className={styles.method}
                            onClick={() =>
                                chooseMethod("IDEAL")
                            }
                        >
                            <img
                                src="/payment-methods/ideal.png"
                                alt="iDEAL"
                                className={styles.paymentLogo}
                            />

                            <span>
                                <strong>iDEAL</strong>
                                <small>
                                    Betaal via je eigen bank
                                </small>
                            </span>
                        </button>

                        <button
                            type="button"
                            className={styles.method}
                            onClick={() =>
                                chooseMethod("VISA")
                            }
                        >
                            <img
                                src="/payment-methods/visa.png"
                                alt="Visa"
                                className={styles.paymentLogo}
                            />

                            <span>
                                <strong>Visa</strong>
                                <small>
                                    Betaal met creditcard
                                </small>
                            </span>
                        </button>

                        <button
                            type="button"
                            className={styles.method}
                            onClick={() =>
                                chooseMethod("MASTERCARD")
                            }
                        >
                            <img
                                src="/payment-methods/mastercard.png"
                                alt="Mastercard"
                                className={styles.paymentLogo}
                            />

                            <span>
                                <strong>Mastercard</strong>
                                <small>
                                    Betaal met creditcard
                                </small>
                            </span>
                        </button>
                    </div>
                </>
            )}

            {step === "IDEAL" && (
                <>
                    <button
                        type="button"
                        className={styles.backButton}
                        onClick={() =>
                            setStep("METHOD")
                        }
                    >
                        ← Andere betaalmethode
                    </button>

                    <div className={styles.methodHeading}>
                        <img
                            src="/payment-methods/ideal.png"
                            alt="iDEAL"
                            className={styles.methodLogo}
                        />

                        <div>
                            <h3>Betalen met iDEAL</h3>
                            <p>
                                Kies de bank waarmee je wilt betalen.
                            </p>
                        </div>
                    </div>

                    <div className={styles.banks}>
                        {banks.map((bank) => (
                            <button
                                key={bank.id}
                                type="button"
                                className={`${styles.bank} ${selectedBank === bank.id
                                        ? styles.selected
                                        : ""
                                    }`}
                                onClick={() =>
                                    setSelectedBank(bank.id)
                                }
                            >
                                <span className={styles.bankInfo}>
                                    <img
                                        src={bank.logo}
                                        alt=""
                                        className={styles.bankLogo}
                                    />

                                    <span>{bank.name}</span>
                                </span>

                                <span className={styles.chevron}>
                                    ›
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className={styles.actions}>
                        <Button
                            as="button"
                            type="button"
                            onClick={handlePayment}
                            disabled={
                                !selectedBank ||
                                paymentMutation.isPending
                            }
                        >
                            {paymentMutation.isPending
                                ? "Betaling verwerken..."
                                : `Betaal ${formattedPrice}`}
                        </Button>
                    </div>
                </>
            )}

            {step === "CARD" && (
                <>
                    <button
                        type="button"
                        className={styles.backButton}
                        onClick={() =>
                            setStep("METHOD")
                        }
                    >
                        ← Andere betaalmethode
                    </button>

                    <div className={styles.methodHeading}>
                        <img
                            src={
                                paymentMethod === "VISA"
                                    ? "/payment-methods/visa.png"
                                    : "/payment-methods/mastercard.png"
                            }
                            alt={
                                paymentMethod === "VISA"
                                    ? "Visa"
                                    : "Mastercard"
                            }
                            className={styles.methodLogo}
                        />

                        <div>
                            <h3>
                                Betalen met{" "}
                                {paymentMethod === "VISA"
                                    ? "Visa"
                                    : "Mastercard"}
                            </h3>

                            <p>
                                Vul je kaartgegevens in.
                            </p>
                        </div>
                    </div>

                    <div className={styles.cardForm}>
                        <label>
                            <span>Naam op kaart</span>
                            <input
                                type="text"
                                placeholder="Pascal Mol"
                                autoComplete="cc-name"
                            />
                        </label>

                        <label>
                            <span>Kaartnummer</span>
                            <input
                                type="text"
                                placeholder="1234 5678 9012 3456"
                                autoComplete="cc-number"
                            />
                        </label>

                        <div className={styles.cardRow}>
                            <label>
                                <span>Geldig tot</span>
                                <input
                                    type="text"
                                    placeholder="MM / JJ"
                                    autoComplete="cc-exp"
                                />
                            </label>

                            <label>
                                <span>CVC</span>
                                <input
                                    type="text"
                                    placeholder="123"
                                    autoComplete="cc-csc"
                                />
                            </label>
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <Button
                            as="button"
                            type="button"
                            onClick={handlePayment}
                            disabled={
                                paymentMutation.isPending
                            }
                        >
                            {paymentMutation.isPending
                                ? "Betaling verwerken..."
                                : `Betaal ${formattedPrice}`}
                        </Button>
                    </div>
                </>
            )}

            {paymentMutation.isError && (
                <p className={styles.error}>
                    Betaling kon niet worden verwerkt.
                    Probeer het opnieuw.
                </p>
            )}

            {step === "PROCESSING" && (
                <div className={styles.processing}>
                    <div className={styles.spinner} />

                    <h3>Betaling verwerken</h3>

                    <p>
                        Een moment geduld. Je betaling wordt
                        gecontroleerd.
                    </p>
                </div>
            )}

            {step === "SUCCESS" && (
                <div className={styles.success}>
                    <div className={styles.successIcon}>
                        ✓
                    </div>

                    <h3>Betaling goedgekeurd</h3>

                    <p>
                        Je betaling van{" "}
                        <strong>{formattedPrice}</strong>{" "}
                        is succesvol verwerkt.
                    </p>

                    <Button
                        as="button"
                        type="button"
                        onClick={() =>
                            navigate("/bevestiging")
                        }
                    >
                        Verder
                    </Button>
                </div>
            )}
        </Modal>
    );
}