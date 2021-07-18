const fs = require("fs");

function base64_encode(file) {
    let buff = fs.readFileSync(file.path);
    let base64data = buff.toString('base64');
    console.log(base64data);
    return base64data;
    }

module.exports = base64_encode;