import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { createUseStyles } from "react-jss";
import { IoClose } from "react-icons/io5";
import Button from "./Button";
import { BASE_GREEN } from "../styles/colors";
import { mediaMaxTablet639 } from "../utils/responsive";
import classNames from "classnames";

interface Props {
  boxClassName?: string;
  boxContentClassName?: string;
  boxTitleClassName?: string;
  visible?: boolean;
  children: ReactNode;
  title?: string;
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
    transition: "opacity 0.6s",
    opacity: 0,
  },
  modalOpen: {
    opacity: 1,
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
    transition: "transform 0.4s",
    transitionDelay: 0.6,
    transform: "scale(0.1)",
    [mediaMaxTablet639]: {
      maxHeight: "100%",
      maxWidth: "100%",
      border: "none",
    },
  },
  boxOpen: {
    transform: "scale(1)",
  },
  controls: {
    display: "flex",
    width: "100%",
    height: 48,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
  },
  noTitle: {
    justifyContent: "end",
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
  title,
  boxClassName,
  boxContentClassName,
  boxTitleClassName,
}: Props) => {
  const classes = useStyles();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [animation, setAnimation] = useState(false);

  const handleClose = useCallback(() => {
    setAnimation(false), onClose();
  }, [onClose]);

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
      if (e.target === ref) {
        handleClose();
      }
    };
    ref.addEventListener("click", onWrapperClick);
    return () => {
      ref.removeEventListener("click", onWrapperClick);
    };
  }, [handleClose, onClose, visible]);

  useEffect(() => {
    if (!visible) {
      return;
    }
    setAnimation(true);
  }, [visible]);

  if (!visible) {
    return null;
  }

  return (
    <div
      ref={wrapperRef}
      className={classNames(classes.wrapper, {
        [classes.modalOpen]: animation,
      })}
    >
      <div
        className={classNames(classes.box, boxClassName, {
          [classes.boxOpen]: animation,
        })}
      >
        <div className={classes.controls}>
          <h2
            className={classNames(classes.title, boxTitleClassName, {
              [classes.noTitle]: !title,
            })}
          >
            {title}
          </h2>
          <Button
            className={classNames(classes.closeButton, boxContentClassName)}
            onClick={handleClose}
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
