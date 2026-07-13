import styles from "./FormError.module.css";

type FormErrorProps = {
  message?: string;
};


export default function FormError({ message }: FormErrorProps) {
  if (!message) {
    return null;
  }

  return <span className={styles.error}>{message}</span>;
}