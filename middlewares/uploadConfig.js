import multer from "multer";
import path from "path";
import fs from "fs";


// Set up storage engine
const uploadDir = './uploads'
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir)
}

// configuracion de multer
const storage = multer.diskStorage({
    destination: function (req, file, db) {
        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname)
        const filename = Date.now() + ext
        cb(null, filename)
    },
})

const upload = multer({ storage })
export default upload
