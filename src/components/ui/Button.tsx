import { Link, type LinkProps } from "react-router-dom";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary";

type ButtonAsLinkProps = LinkProps & {
  as?: "link";
  variant?: ButtonVariant;
};

type ButtonAsButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  as: "button";
  variant?: ButtonVariant;
};

type ButtonProps = ButtonAsLinkProps | ButtonAsButtonProps;

export default function Button(props: ButtonProps) {
  const variant = props.variant ?? "primary";
  const className = `${styles.button} ${styles[variant]} ${props.className ?? ""}`;

  if (props.as === "button") {
    const { as, variant, className: _className, ...buttonProps } = props;

    return <button className={className} {...buttonProps} />;
  }

  const { as, variant: _variant, className: _className, ...linkProps } = props;

  return <Link className={className} {...linkProps} />;
}