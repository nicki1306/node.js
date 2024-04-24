import multer from 'multer';
import config from './config.js';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.UPLOAD_DIR);
    },

    filename: (req, file, cb) => {
        console.log(file);
        cb(null, file.originalname);
    }
});

export const uploader = multer({ storage: storage });