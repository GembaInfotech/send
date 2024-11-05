const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const profileType = req.body.profileType || 'user'; 
        let folder = '';

        if (profileType === 'user') {
            folder = 'UserProfileImg';
        } else if (profileType === 'vendor') {
            folder = 'VendorProfileImg';
        } else {
            return cb(new Error('Invalid profile type.'));
        }

        cb(null, path.join(__dirname, '..', '..', 'ProfileImage', folder));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// File upload middleware
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB limit
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            cb(null, true);
        } else {
            cb(new Error('Only .png, .jpg, and .jpeg formats are allowed!'));
        }
    }
});


module.exports = upload;
