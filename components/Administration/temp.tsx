import {
  getDownloadURL,
  getStorage,
  ref,
  //   uploadBytes,
  uploadString,
} from "firebase/storage";
import { ChangeEvent } from "react";
import { setDocument, updateDocument } from "../../firebase/firebase";

const imagePath = "";
const imageData = "";

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
    fetch(url, { method: "POST" }).then((res) => console.log(res));
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
      //   setImageData(result);
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
      //   setImagePath(url);
      update(url);
    });
  });
  // // 'file' comes from the Blob or File API
  // uploadBytes(storageRef, file).then((snapshot) => {
  //   console.log("Uploaded a blob or file!");
  // });
};
