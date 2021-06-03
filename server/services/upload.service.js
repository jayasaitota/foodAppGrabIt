import multer from 'multer';
import fs from 'fs';

const  uploadConfig = {
  user: 'server/upload/user',
  catogory:'server/upload/catogory',
  item:'server/upload/item'
}

/**
 * Storing Uploades file
 * @return {uploded file name}
 */
let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    if (!fs.existsSync(uploadConfig[req.uploadPath])) {
      fs.mkdirSync(uploadConfig[req.uploadPath])
    }
    callback(null, uploadConfig[req.uploadPath]);
  },
  filename: function (req, file, callback) {
    let ext = '';
    let name = '';
    if (file.originalname) {
      let p = file.originalname.lastIndexOf('.');
      ext = file.originalname.substring(p + 1);
      let firstName = file.originalname.substring(0, p + 1);
      name = Date.now() + '_' + firstName;
      name += ext;
    }
    req.uploadFile.push({ name: name, imagePath:`${uploadConfig[req.uploadPath]}/${name}`, apiPath:`/docs/${req.uploadPath}/${name}`});
    if (req.uploadFile && req.uploadFile.length > 0) {
      callback(null, name);
    }
  }
});

const upload = multer({
  storage: storage
}).array('file');

export default {
  upload
}