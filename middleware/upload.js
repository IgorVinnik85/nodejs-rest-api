import multer from "multer";

import path from "path";

const destination = path.resolve("temp");

const srorage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const fileName = `${uniqueSuffix}_${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({
  srorage,
});

export default upload;