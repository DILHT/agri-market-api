import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure upload directory exists
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // save in uploads/
    },
    filename: (req, file, cb) => {
        // rename the file (example: product-1728371923.png)
        const uniqueName = `product-${Date.now()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    },
    });

    const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // limit: 5MB
    fileFilter: (req, file, cb) => {
        const allowed = /jpeg|jpg|png/;
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowed.test(ext)) cb(null, true);
        else cb(new Error('Only images (jpg, jpeg, png) allowed!'));
    },
    });

    export default upload;
