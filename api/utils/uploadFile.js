import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

aws.config.update({
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    accessKeyId: process.env.ACCESS_KEY_ID,
    region: 'us-east-1',
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(new Error('Invalid Mime Type, only JPEG and PNG'), false);
    }
  }

const upload = multer({
    fileFilter,
    storage: multerS3({
      s3,
      bucket: 'blog-photos-react',
      acl: 'public-read',
      metadata: (req, file, cb) => {
        cb(null, {fieldName: file.fieldname});
      },
      key: (req, file, cb) => {
        cb(null, Date.now().toString())
      }
    })
  })

  export default upload;