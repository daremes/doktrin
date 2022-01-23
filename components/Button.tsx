import classNames from "classnames";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { createUseStyles } from "react-jss";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

const useStyles = createUseStyles({
  default: {
    border: "1px solid #fff",
    borderRadius: 4,
    padding: 4,
  },
});

const Button = (props: ButtonProps) => {
  const classes = useStyles();
  return (
    <button className={classNames(classes.default, props.className)}>
      {props.children}
    </button>
  );
};

export default Button;
