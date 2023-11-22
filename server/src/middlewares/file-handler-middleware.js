const multer = require("multer");
const fs = require("fs");
const path = require("path");

const fileHandler = (req, res, next) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(401).json({message: "Unauthorized"});
  }

  const currentDir = `uploads/${userId}/`;

  const storageSetup = multer.diskStorage({
    destination: (req, file, cb) => {
      if (!fs.existsSync(currentDir)) {
        fs.mkdirSync(currentDir, {recursive: true});
      }
      cb(null, currentDir);
    }, filename: (req, file, cb) => cb(null, file.originalname)
  });

  const upload = multer({
    storage: storageSetup, limits: {fileSize: 5 * 1024 * 1024}, fileFilter: (req, file, cb) => {
      const fileTypes = /pdf|doc|docx/;
      const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
      if (extName) {
        return cb(null, true);
      }
      cb(new Error("Only PDF, DOC and DOCX files are allowed"));
    }
  });

  upload.fields([{name: 'resume', maxCount: 1}, {name: 'coverLetter', maxCount: 1}])(req, res, (err) => {
    if (err) {
      return res.status(500).json({message: err.message});
    }
    next();
  });
};

module.exports = fileHandler;
