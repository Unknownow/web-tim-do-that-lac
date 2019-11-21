const multer = require('multer');

module.exports = {
  storage: multer.diskStorage({
    filename(req, file, next) {
      next(null, `${file.originalname}`);
    }
  }),
  fileFilter: (req, file, cb) => {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    return cb(null, true);
  }
};