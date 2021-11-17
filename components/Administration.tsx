import Link from "next/link";
import {
  getDownloadURL,
  getStorage,
  ref,
  //   uploadBytes,
  uploadString,
} from "firebase/storage";
import { ChangeEvent, useState } from "react";
import { setDocument, updateDocument } from "../firebase/firebase";

export const Administration = () => {
  const [imageData, setImageData] = useState<string | null>(null);
  const [imagePath, setImagePath] = useState("");

  const set = () => {
    setDocument("pages", "homepage", {
      imageUrl: imagePath,
      title: "dok.trin",
    });
  };

  const update = (imageUrl: string) => {
    updateDocument("pages", "homepage", {
      imageUrl: imageUrl,
    });
  };

  const rebuild = () => {
    const url = process.env.NEXT_PUBLIC_BUILD_HOOK;
    if (url) {
      fetch(url, { method: "POST" });
    }
  };

  const onFileSelected = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (!result) {
        return;
      }
      if (typeof result === "string") {
        setImageData(result);
      }
    };
    reader.onprogress = (e) => {
      console.log("progress", e);
    };
    reader.readAsDataURL(files[0]);
  };

  const uploadImage = () => {
    if (!imageData) {
      return;
    }
    const storage = getStorage();
    const storageRef = ref(storage, "mainImage.jpg");
    uploadString(storageRef, imageData, "data_url", {
      contentType: "image/jpeg",
    }).then(() => {
      getDownloadURL(storageRef).then((url) => {
        setImagePath(url);
        update(url);
      });
    });
    // // 'file' comes from the Blob or File API
    // uploadBytes(storageRef, file).then((snapshot) => {
    //   console.log("Uploaded a blob or file!");
    // });
  };

  return (
    <>
      <div>
        <h1>administration</h1>
        {/* <button onClick={set}>set</button> */}
        {/* <button disabled={!imagePath} onClick={update}>
          update
        </button> */}
        <input type="file" onChange={onFileSelected} />
        <button disabled={!imageData} onClick={uploadImage}>
          upload image
        </button>
        <button onClick={rebuild}>rebuild</button>
      </div>
      <div>{imagePath && <img src={imagePath} alt="" />}</div>
    </>
  );
};
