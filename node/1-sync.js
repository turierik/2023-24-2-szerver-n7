const { readdirSync, readFileSync, writeFileSync } = require('fs')
const files = readdirSync('./files')
const output = files.map(file => readFileSync(`./files/${file}`, { encoding: 'utf-8' })).join("\n")
writeFileSync("./output.txt", output)
