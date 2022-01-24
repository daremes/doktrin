import classnames from "classnames";
import { useEffect, useRef, useState } from "react";
import { createUseStyles } from "react-jss";
import {
  LANDING_HEIGHT_DESKTOP,
  LANDING_HEIGHT_MOBILE,
} from "../utils/constants";
import { mediaMaxTablet639 } from "../utils/responsive";

const useStyles = createUseStyles({
  landingImg: {
    opacity: 1,
    position: "absolute",
    height: LANDING_HEIGHT_DESKTOP,
    objectFit: "cover",
    zIndex: -10,
    width: "100%",
    transform: "scale(1)",
    transition: "opacity 3s, transform 2s",
    [mediaMaxTablet639]: {
      height: LANDING_HEIGHT_MOBILE,
    },
  },
  mainImg: {
    zIndex: -5,
  },
  overlay: {
    zIndex: -2,
    position: "absolute",
    height: LANDING_HEIGHT_DESKTOP,
    width: "100%",
    background: "rgba(0,0,0,0.4)",
    // background: "radial-gradient(transparent, rgba(0,0,0,.84))",
    [mediaMaxTablet639]: {
      height: LANDING_HEIGHT_MOBILE,
    },
  },
  toggleHide: {
    opacity: 0,
    transform: "scale(1.2)",
  },
});

const HeroSlider = () => {
  const classes = useStyles();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [imgagesAlt, setImagesAlt] = useState(["", "", ""]);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    setImagesAlt(["landing-2", "landing-3", "landing-4"]);
    const onImageChange = () => {
      setActiveImage((prev) => {
        const total = imgagesAlt.length;
        if (prev === total) {
          return 0;
        }
        return prev + 1;
      });
      timeoutRef.current = setTimeout(onImageChange, 6000);
    };
    timeoutRef.current = setTimeout(onImageChange, 6000);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [imgagesAlt.length]);
  return (
    <>
      <picture>
        <source
          media="(min-width: 1200px)"
          srcSet="/landing-1-desktop.jpg 2x"
        />
        <source media="(min-width: 640px)" srcSet="/landing-1-tablet.jpg 2x" />
        <img
          alt=""
          className={classnames(classes.landingImg, classes.mainImg, {
            [classes.toggleHide]: activeImage !== 0,
          })}
          srcSet="/landing-1-mobile.jpg 2x"
        />
      </picture>
      {imgagesAlt.map((img, index) => (
        <picture key={index}>
          <source
            media="(min-width: 1200px)"
            srcSet={
              imgagesAlt[index] ? `${imgagesAlt[index]}-desktop.jpg 2x` : ""
            }
          />
          <source
            media="(min-width: 640px)"
            srcSet={
              imgagesAlt[index] ? `${imgagesAlt[index]}-tablet.jpg 2x` : ""
            }
          />
          <img
            alt=""
            className={classnames(classes.landingImg, {
              [classes.toggleHide]: activeImage !== index + 1,
            })}
            srcSet={
              imgagesAlt[index] ? `${imgagesAlt[index]}-mobile.jpg 2x` : ""
            }
          />
        </picture>
      ))}
      <div className={classnames(classes.overlay)} />
    </>
  );
};

export default HeroSlider;
