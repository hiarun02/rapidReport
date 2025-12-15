import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, PNG, and WebP images are allowed"), false);
  }
};

const upload = multer({
  storage,
  limits: {fileSize: 5 * 1024 * 1024}, // 5MB
  fileFilter,
});

export const multerUpload = upload.single("imageFile");
export const uploadMiddleware = upload.single("image");
