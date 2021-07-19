const uploadFile = require("../middleware/upload");
const fs = require("fs");
const baseUrl = "http://localhost:8080/files/";
const base64_encode = require('../resources/base64_encode');

const upload = async (req, res) => {
  try {
    await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).json({ message: "Insira uma imagem" });
    }
    const type = req.file.originalname.substr(req.file.originalname.lastIndexOf('.') +1);
    if(type == 'jpeg' || type == 'png' || type == 'jpg') {
      const encodedFile = base64_encode(req.file);
      res.status(200).json({
        base64file: encodedFile,
      });
    }else{
      return res.status(400).json({ message: "Tipo de arquivo não suportado!" });
    }
  } catch (err) {
    console.log(err);
  }
};

const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Não é possível digitalizar arquivos!",
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });

    res.status(200).send(fileInfos);
  });
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Não consegui baixar o arquivo. " + err,
      });
    }
  });
};

module.exports = {
  upload,
  getListFiles,
  download,
};
