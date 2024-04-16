const { readdir, readFile, writeFile } = require('fs')

readdir("./files", (err, files) => {
    console.log(files)
    let output = []
    for (const i in files) {
        readFile(`./files/${files[i]}`, { encoding: 'utf-8'}, (err, data) => {
            output[i] = data
            if (output.filter(x => x !== null).length == files.length){
                writeFile("./output.txt", output.join("\n"), () => {
                    console.log("Vége.")
                    // CALLBACK HELL!!!
                })
            }
        })
    }
})