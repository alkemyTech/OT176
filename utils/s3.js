require('dotenv').config();
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
  // region: 'region', // necesary for delete objects
  // version: "version"
});

module.exports = s3;
