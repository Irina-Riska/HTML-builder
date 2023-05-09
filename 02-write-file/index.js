const readline = require('node:readline/promises');
const { writeFile } = require('fs/promises');
const { stdin: input, stdout: output } = process;


async function getTextFromCli() {
  // get from from cli input
  const rl = readline.createInterface({ input, output });
  // get file name from cli 
  const answer = await rl.question(
    ' Type file name where to save your text or press enter to create by default(text.txt)'
  );
  if (answer) {
    console.log(` Just joking, file created with name text.txt) 
           \n You can start typing your text...`);
  } else {
    console.log(' thank you,\n you can start typing your text...');
  }

  // listen Event from cliLine 
  rl.addListener('close', () => console.log('\nclosed'));

  rl.on('line', (event) => {
    const pathFileName = getPathAsArgument('text.txt');
    const dataFromCli = [];

    // turn off while 'exit or closed'

    if (event === 'exit') {
      // if nothing was added 
      if (dataFromCli.length === 0) {
        console.log('nothing was added to the file');
        return rl.close();
      }
      console.log('thanks');
      return rl.close();
    }
    dataFromCli.push(event);

    // data to file 
    writeFileText(event + '\n', pathFileName);
  });
}
getTextFromCli();

async function writeFileText(content, file) {
  await writeFile(file, content, { flag: 'a+' }, err => {
    console.log(err);
  }); 
}

function getPathAsArgument(fileName) {
  const path = require('path');
  const folderPath = process.argv[1];
  const folderName = path.basename(folderPath);
  const filePath = `./${folderName}/${fileName}`;
  return filePath;
}