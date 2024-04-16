const { readdir, readFile, writeFile } = require('fs/promises')

;(async () => {
    const files = await readdir("./files")
    const content = await Promise.all(files.map(file => readFile(`./files/${file}`, { encoding: 'utf-8'})))
    await writeFile("./output.txt", content.join("\n"))
    console.log("Vége.")
})()