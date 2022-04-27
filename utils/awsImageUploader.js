require('dotenv').config()
const upload = require('../utils/multer')
const s3 = require('../utils/s3')
const {
    v4: uuidv4
} = require('uuid');


const uploadImg = (req, res) => {

    let myFile = req.file.originalname.split(".")
    const fileType = myFile[myFile.length - 1]

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

    //Validación de si el usuario es adminsitrador, si lo es ejecuta el codigo de abajo
    console.log('params', params)
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


module.exports = uploadImg