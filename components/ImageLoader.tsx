import classNames from "classnames";
import { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { getDocument } from "../firebase/firebase";

interface Props {
  className?: string;
  id: string;
  imgClassName?: string;
}

interface ImageDataApi {
  base64: string;
  title: string;
}

interface ImageData {
  src: string;
  title: string;
}

const useStyles = createUseStyles({
  imageLoader: {},
  spinner: {},
  img: {
    width: "100%",
    height: "100%",
  },
});

const ImageLoader = ({ id, className, imgClassName }: Props) => {
  const [image, setImage] = useState<ImageData | null>(null);
  const classes = useStyles();

  useEffect(() => {
    const loadImage = async (id: string) => {
      let data;
      try {
        data = await getDocument("images", id);
      } catch (e) {
        console.error("Cannot load image");
      }
      if (!data) {
        setImage({ src: "/placeholder.jpg", title: "Placeholder" });
      } else {
        setImage({ src: data.base64, title: data.title });
      }
    };
    loadImage(id);
  }, [id]);

  return (
    <div className={classNames(classes.imageLoader, className)}>
      {!image && <div className={classes.spinner}>X</div>}
      {image && (
        <img
          className={classNames(classes.img, imgClassName)}
          alt={image.title || ""}
          src={image.src}
        />
      )}
    </div>
  );
};

export default ImageLoader;
