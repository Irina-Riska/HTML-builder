const { readFile } = require('fs/promises');
const path = require('path');



async function getFileData() {
  // get file path 
  const folderPath = process.argv[1];
  const folderName = path.basename(folderPath);
  const filePath = `./${folderName}/text.txt`;

  // read file 
  try {
    const data = await readFile(filePath, { encoding: 'utf8' });
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}
getFileData()