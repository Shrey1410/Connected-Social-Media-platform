const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(" Multer is saving a file to: ./public/temp");
    cb(null, './public/temp');
  },
  filename: function (req, file, cb) {
    console.log(`Multer is saving the file with name: ${file.originalname}`);
    cb(null, file.originalname);
  }
});

module.exports = {
  upload: multer({ storage: storage })
};
