import multer from "multer";

// Multer configuration for image uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    //

    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
});

// Single file upload middleware
export const multerUpload = upload.single("imageFile");
// For image analysis temporary upload
export const uploadMiddleware = upload.single("image");
