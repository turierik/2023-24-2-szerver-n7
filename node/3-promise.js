const { readdir, readFile, writeFile } = require('fs/promises')

readdir("./files")
    .then(files => 
        Promise.all(files.map(file => readFile(`./files/${file}`, { encoding: 'utf-8'})))
    )
    .then(contents => writeFile('./output.txt', contents.join("\n")))
    .then(() => console.log('Vége.') )
