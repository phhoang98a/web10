const fs = require('fs');

const writeFileSync = (fileName, data) => {
    fs.writeFileSync(fileName, data, 'utf-8');
}

const readFileSync = (fileName) => {
    return fs.readFileSync(fileName, 'utf-8');
}

//Export module ra thành 1 object bao gồm 2 function
module.exports = {
    writeFile: writeFileSync,
    readFile:readFileSync
}