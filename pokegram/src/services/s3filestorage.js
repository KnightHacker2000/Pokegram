const AWS = require('aws-sdk');
// const fs = require('fs');
// The access ID and secret key of the S3 bucket
const ID = 'AKIAXT4OCR7TYUYMJJ6S';
const SECRET = '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';

// The name of the bucket that you have created
const BUCKET_NAME = '557pokemonstorage';

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET
});

// upload a file
const uploadFile = async (filename, file) => {
  // console.log('entered!');
  // console.log(filename);
  // console.log(file);
  //  const test = new File(file, file.name);
  /*
  const read = new FileReader();
  read.readAsBinaryString(file);
  read.onloadend = () => {
    testResult = fileReader.result.toString();
    console.log(testResult);
  };
  */
  const params = {
    Bucket: BUCKET_NAME,
    Key: filename, // File name we want to upload
    Body: file
  };
  // const fileContent = fs.readFileSync(fileName);
  // console.log(fileName);

  // Uploading files to the bucket
  s3.upload(params, (err, data) => {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
    return data.Location;
  });
};

// uploadFile('C:\\Users\\kexin\\OneDrive\\桌面\\ysy-557-final\\project
// ---design-hw1-pokemon-go\\pokegram\\src\\images\\jieni.jpg');

// read a file

const readFile = (fileName) => {
  // Setting up S3 read parameters
  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName // File name we want to retrieve
  };

  // download file from the bucket
  s3.getObject(params, (err, data) => {
    if (err) {
      throw err;
    }
    // do something with the file
    // const fStream = fs.createWriteStream('cat1.jpg');
    // fStream.write(data.Body);
    // fStream.end();
    // console.log(`File downloaded successfully. ${data.Body}`);
    return data.Body;
    // console.log(`File downloaded successfully. ${data.Body}`);
  });
};

// readFile('C:\\Users\\kexin\\OneDrive\\桌面\\ysy-557-final\\project--
// -design-hw1-pokemon-go\\pokegram\\src\\images\\jieni.jpg');

// delete a file
const deleteFile = (fileName) => {
  // Setting up S3 delete parameters
  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName // File name we want to delete
  };

  // download file from the bucket
  s3.deleteObject(params, (err, data) => {
    if (err) {
      throw err;
    }
    console.log(`File deleted successfully. ${data.Body}`);
  });
};

// deleteFile('C:\\Users\\kexin\\OneDrive\\桌面\\ysy-557-final\\project
// ---design-hw1-pokemon-go\\pokegram\\src\\images\\jieni.jpg');
export default { uploadFile, readFile, deleteFile };
