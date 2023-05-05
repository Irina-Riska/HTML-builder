const { readdir, stat } = require('node:fs');
const path = require('node:path');


function getFilesInfo() {
  const dirPath = `${getPathAsArgument()}/secret-folder`;
  readdir(dirPath, { withFileTypes: true }, (err, value) => readDirectory(err, value, dirPath));
}
getFilesInfo();

async function readDirectory(err, files, dirPath) {
  if (err) { console.log(err); }
  for (const file of files) {

    if(file.isFile()){
      const fileInfo = {};
      fileInfo.name = path.basename(file.name, path.extname(file.name));
      fileInfo.extName = path.extname(file.name);

      const pathToElement = path.join(dirPath, file.name);

      stat(pathToElement, (err, stat) => {
        if (err) { console.log(err); }
        const size = stat.size;
        fileInfo.size = size;
        const finalOutput = `${fileInfo.name} - ${fileInfo.extName.slice(1)} - ${fileInfo.size}bytes`;

        console.log(finalOutput);
      });
    }}
}

function getPathAsArgument() {
  const folderPath = process.argv[1];
  const folderName = path.basename(folderPath);
  const filePath = `./${folderName}/`;
  return filePath;
}