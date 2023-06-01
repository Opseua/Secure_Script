import fs from 'fs';
const configFile = fs.readFileSync('config.json');
const config = JSON.parse(configFile);

const valor = 'executar.js'
const clientId = config[valor];
const importedFunction = eval(`(${clientId})`);
importedFunction('CCC');

