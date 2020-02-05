const multer = require('multer');

exports.ImageUpload = function(filename) {
  console.log(filename,"Filename")
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString() + file.originalname.toLocaleLowerCase().split(' ').join('-'));
    }
  });
  
  const fileFilter = (req, file, cb) => {
    // reject a file
   // console.log("file type is "+file.mimetype)
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/gif') {
      cb(null, true);
    } else {
      cb(new Error("File must be in jpeg, jpg or png format."), false);
    }
  };
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  }).single(filename);
  console.log(upload)
  return upload;
}