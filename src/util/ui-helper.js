import { message, Upload } from "antd";

export const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

export const validate = (file) => {
  const isImg = file["type"].includes("image");
  if (!isImg) message.error(`Upload failed, ${file.name} is not a image`);

  const isLt5M = file.size / 1024 / 1024 < 5;
  if (!isLt5M) {
    message.error(`Image must smaller than 5MB!`);
  }

  return (isImg && isLt5M) || Upload.LIST_IGNORE;
};
