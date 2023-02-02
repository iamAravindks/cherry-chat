import axios from "axios";

export const uploadImg = async (filename) => {
  const formData = new FormData();
  formData.append("file", filename);
  formData.append("upload_preset", "atyrg7be");
  console.log(filename);
  const res = await axios.post(
    ` https://api.cloudinary.com/v1_1/dlgosw3g3/image/upload`,
    formData
  );
  return res.data.url
};
