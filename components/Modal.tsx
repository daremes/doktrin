import { ReactNode, useEffect, useRef } from "react";
import { createUseStyles } from "react-jss";
import { IoClose } from "react-icons/io5";
import Button from "./Button";
import { BASE_GREEN } from "../styles/colors";
import { mediaMaxTablet639 } from "../utils/responsive";
import classNames from "classnames";
import { relative } from "path";

interface Props {
  boxClassName?: string;
  boxContent?: string;
  boxTitle?: string;
  visible?: boolean;
  children: ReactNode;
  onClose: () => void;
}

// const BORDER_COLOR = "#ffffffb0";
const BORDER_COLOR = BASE_GREEN;

const useStyles = createUseStyles({
  wrapper: {
    width: "100vw",
    height: "100vh",
    position: "fixed",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    background: "rgba(0,0,0,0.95)",
    zIndex: 1000,
  },
  box: {
    width: "100%",
    height: "100%",
    maxWidth: 640,
    maxHeight: 600,
    position: "relative",
    background: "transparent",
    border: `1px solid ${BORDER_COLOR}`,
    borderRadius: 6,
    [mediaMaxTablet639]: {
      maxHeight: "100%",
      maxWidth: "100%",
      border: "none",
    },
  },
  controls: {
    display: "flex",
    width: "100%",
    height: 48,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
  },
  title: {
    color: BORDER_COLOR,
    textTransform: "uppercase",
    fontSize: 20,
    marginLeft: 12,
  },
  closeButton: {
    border: "none",
    color: BORDER_COLOR,
  },
  content: {
    width: "100%",
    position: "relative",
    color: "#fafafa",
    padding: "8px 20px 20px 20px",
  },
});

const Modal = ({
  visible,
  children,
  onClose,
  boxClassName,
  boxContent,
  boxTitle,
}: Props) => {
  const classes = useStyles();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bodyEl = document.getElementsByTagName("body")[0];
    if (!bodyEl) {
      return;
    }
    if (visible) {
      bodyEl.style.height = "100vh";
      bodyEl.style.overflowY = "hidden";
    } else {
      bodyEl.style.height = "100%";
      bodyEl.style.overflowY = "auto";
    }
  }, [visible]);

  useEffect(() => {
    if (!visible || !wrapperRef.current) {
      return;
    }
    const ref = wrapperRef.current;
    const onWrapperClick = (e: MouseEvent) => {
      console.log(e.target);
      if (e.target === ref) {
        onClose();
      }
    };
    ref.addEventListener("click", onWrapperClick);
    return () => {
      ref.removeEventListener("click", onWrapperClick);
    };
  }, [onClose, visible]);

  if (!visible) {
    return null;
  }

  return (
    <div ref={wrapperRef} className={classes.wrapper}>
      <div className={classNames(classes.box, boxClassName)}>
        <div className={classes.controls}>
          <h2 className={classNames(classes.title, boxTitle)}>
            Nejbližší akce
          </h2>
          <Button
            className={classNames(classes.closeButton, boxContent)}
            onClick={onClose}
          >
            <IoClose size={32} />
          </Button>
        </div>
        <div className={classes.content}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
