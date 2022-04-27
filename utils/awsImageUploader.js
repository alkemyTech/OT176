require('dotenv').config()
const upload = require('../utils/multer')
const s3 = require('../utils/s3')
const {
    v4: uuidv4
} = require('uuid');
const {
    validationResult
} = require("express-validator");

const uploadImg = async (req, res) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        } else {
            let myFile = await req.file.originalname.split(".")
            console.log('myFile', myFile)
            const fileType = await myFile[myFile.length - 1]

            console.log('myFile', myFile)
            console.log('fileType', fileType)

            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `${uuidv4()}.${fileType}`,
                Body: req.file.buffer,
                ACL: 'public-read',
                ContentEncoding: 'base64',
                ContentDisposition: 'inline',
                ContentType: 'image/jpeg',
            }


            s3.upload(params, (error, data) => {
                if (error) {
                    res.status(500).send(error)
                }
                let response = {
                    location: 'https://s3.console.aws.amazon.com/s3/buckets/ong-bucket-alkemy?region=us-east-1&tab=objects',
                    image: `https://${params.Bucket}.s3.amazonaws.com/${data.Key}`,
                    bucket: data.Bucket,
                }
                res.json(response)
            })
        }
    } catch (error) {
        console.log('error', error)
    }


}


module.exports = uploadImg