import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'), // ensure folder exists
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  file.mimetype.startsWith("image") ? cb(null, true) : cb(new Error("Only images"), false);
};

const upload = multer({ storage, fileFilter });

export default upload;
