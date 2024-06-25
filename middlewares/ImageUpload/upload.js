const multer = require('multer')
const  sharp = require('sharp')
 const path = require('path')
const  fileURLToPath = require( "url");

const fs = require('fs');
const dirname = require('path');

const filename = __filename; // Adjust as needed

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {

    cb(null, path.join(__dirname, "../../assets/userAvatars"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpeg");
  },
});

const dir = async (req, res) => {
  console.log(path.join(__dirname, "../../assets/userAvatars"));
};

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(
      {
        message: "Unsupported file format",
      },
      false
    );
  }
};

const uploadPhoto = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fieldSize: 2000000 },
});

const parkingImgResize = async (req, res, next) => {
  console.log("heyer" + __dirname);
  if (!req.files) return next();

  await Promise.all(
    req.files.map(async (file) => {
      const destinationPath = `../../assets/userAvatars/${file.filename}`;

      await sharp(file.path)
        .resize(300, 300)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(destinationPath);
      fs.unlinkSync(destinationPath);
    })
  );
  
};

module.exports = { uploadPhoto, parkingImgResize, dir };
