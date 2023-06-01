/* 

async function teste(inf_ok) {
  const dec1 = await cryptDec({ tex: config['executar.js'], pas: inf.passw })
  const fun1 = await eval(`(${dec1.res})`);
  fun1(inf_ok);
}
teste('aaaaaaaaaaaa');


const dec1 = await cryptDec({ tex: config['executar.js'], pas: '12345678' })
const executar = eval(`(${dec1.res.replace(/export/g, '\/\/export')})`);
executar('aaaaaaa');

*/

import CryptoJS from 'crypto-js';
import md5 from 'js-md5';
import fs from 'fs';
const pt = import.meta.url
import path from 'path';

let funCryptEnc;
async function cryptEnc(inf) {
  const module = await import('../cryptEnc.js');
  funCryptEnc = module.default;
  return await funCryptEnc(inf);
}
let funCryptDec;
async function cryptDec(inf) {
  const module = await import('../cryptDec.js');
  funCryptDec = module.default;
  return await funCryptDec(inf);
}

const inf = []
inf['path'] = `/z_NAO_ENVIAR/${pt.split('/')[pt.split('/').length - 1]}`;
inf['path'] = pt.replace(new RegExp(inf.path, 'g'), '');
inf['path'] = inf.path.replace(new RegExp("file:\/\/\/", 'g'), '');
inf['conf'] = 'config.json';
inf['passw'] = '12345678';

//fs.writeFileSync(inf.conf, '{}');
const configFile = fs.readFileSync(inf.conf);
const config = JSON.parse(configFile);

// ###############################################################

async function listFiles() {
  if (!fs.existsSync(inf.path)) {
    console.log('PASTA NAO ENCONTRADA');
    return;
  }
  const ignoredItems = [inf.conf, 'import.js', 'z_NAO_ENVIAR', 'node_modules', '.git', '.z_tempCodeRunner.js', 'package.json', 'package-lock.json'];
  const ret = {};
  async function list(p, retObj) {
    const contP = fs.readdirSync(p);
    for (const item of contP) {
      const itemPath = path.join(p, item);
      const stat = fs.statSync(itemPath);
      if (ignoredItems.includes(item)) {
        continue;
      }
      if (stat.isDirectory()) {
        const isFolderEmpty = fs.readdirSync(itemPath).length === 0;
        if (isFolderEmpty) {
          retObj[item] = {};
        } else {
          retObj[item] = {};
          await list(itemPath, retObj[item]);
        }
      } else {
        if (stat.size / 1024 <= 100) { // ignorar arquivos maiores que 100KB
          const confCont = fs.readFileSync(itemPath).toString();
          const contF = await cryptEnc({ tex: confCont, pas: inf.passw });
          retObj[item] = contF.res;
        }
      }
    }
  }
  await list(inf.path, ret);

  fs.writeFileSync(inf.conf, JSON.stringify(ret, null, 2));
  console.log('LISTAR ARQUIVO: OK');
}
listFiles();

























/* 
  import CryptoJS from 'crypto-js';
import md5 from 'js-md5';
import fs from 'fs';
const pt = import.meta.url
import path from 'path';

let funCryptEnc;
async function cryptEnc(inf) {
  const module = await import('../cryptEnc.js');
  funCryptEnc = module.default;
  return await funCryptEnc(inf);
}
let funCryptDec;
async function cryptDec(inf) {
  const module = await import('../cryptDec.js');
  funCryptDec = module.default;
  return await funCryptDec(inf);
}

const inf = []
inf['path'] = `/z_NAO_ENVIAR/${pt.split('/')[pt.split('/').length - 1]}`;
inf['path'] = pt.replace(new RegExp(inf.path, 'g'), '');
inf['path'] = inf.path.replace(new RegExp("file:\/\/\/", 'g'), '');
inf['conf'] = 'config.json';
inf['passw'] = '12345678';

if (!fs.existsSync(inf.conf)) {
  fs.writeFileSync(inf.conf, '{}');
}
const configFile = fs.readFileSync(inf.conf);
const config = JSON.parse(configFile);

// ###############################################################

async function listFiles() {
  if (!fs.existsSync(inf.path)) {
    console.log('PASTA NAO ENCONTRADA');
    return;
  }
  const ignoredItems = [inf.conf, 'z_NAO_ENVIAR', 'api.js', 'node_modules', '.git', '.z_tempCodeRunner.js', 'package.json', 'package-lock.json'];

  function list(p) {
    const ret = {};
    const contP = fs.readdirSync(p);
    contP.forEach(item => {
      const itemPath = path.join(p, item);
      const stat = fs.statSync(itemPath);
      if (stat.isDirectory()) {
        if (ignoredItems.includes(item)) {
          return;
        }
        const isFolderEmpty = fs.readdirSync(itemPath).length === 0;
        if (isFolderEmpty) {
          ret[item] = {};
        } else {
          const numContents = fs.readdirSync(itemPath).length;
          if (numContents > 30) { // ignorar pastas com mais de 30 conteudos (arquivos + pastas)
            return;
          }
          ret[item] = list(itemPath);
        }
      } else {
        if (ignoredItems.includes(item)) {
          return;
        }
        if (stat.size / 1024 > 100) { // ignorar arquivos maiores que 100KB
          return;
        };
        const confCont = fs.readFileSync(itemPath).toString();
        const contF = cryptEnc({ tex: confCont, pas: inf.passw });
        contF.then(result => {
          ret[item] = result.res;
          fs.writeFileSync(inf.conf, JSON.stringify(ret, null, 2));
        }).catch(error => {
          console.error(error);
        });
      }
    });
    return ret;
  }

  fs.writeFileSync(inf.conf, JSON.stringify(list(inf.path), null, 2));
  console.log(`LISTAR ARQUIVO: OK`);
}

listFiles();


 */