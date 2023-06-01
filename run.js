import CryptoJS from 'crypto-js';
import md5 from 'js-md5';
import fs from 'fs';
const pt = import.meta.url
import path from 'path';
const configFile = fs.readFileSync('config.json');
const config = JSON.parse(configFile);

async function run(inf) {
    try {
        const z = {
            a: pt,
            b: pt.split('/')[pt.split('/').length - 1],
            c: md5(fs.readFileSync(pt.split('/')[pt.split('/').length - 1], 'utf8')).toString(),
            d: '1.0',
            z: md5(fs.readFileSync('config.json', 'utf8')).toString()
        };
        // ------------------------------------------------------------------------
        async function cryptDec(inf) {
            let ret = { 'ret': false };
            try {
                const res = CryptoJS.AES.decrypt(inf.tex, inf.pas).toString(CryptoJS.enc.Utf8);
                if (res == '') { ret['msg'] = `DECRYPT: ERRO`; } else {
                    ret['res'] = res;
                    ret['msg'] = `DECRYPT: OK`;
                    ret['ret'] = true;
                }
            } catch (error) { ret['msg'] = `DECRYPT: ERRO`; } return ret
        };
        async function cryptEnc(inf) {
            let ret = { 'ret': false };
            try {
                const res = CryptoJS.AES.encrypt(inf.tex, inf.pas).toString();
                if (res == '') { ret['msg'] = `ENCRYPT: ERRO`; } else {
                    ret['res'] = res;
                    ret['msg'] = `ENCRYPT: OK`;
                    ret['ret'] = true;
                }
            } catch (error) { ret['msg'] = `ENCRYPT: ERRO`; } return ret
        };
        // ------------------------------------------------------------------------
        const dec1 = await cryptDec({ tex: config['executar.js'], pas: '12345678' })
        const executar = eval(`(${dec1.res})`);
        executar('aaaaaaa');
        // ------------------------------------------------------------------------
        const dec2 = await cryptDec({ tex: config['api.js'], pas: '12345678' })
        const api = eval(`(${dec2.res.replace(/export/g, '\/\/export')})`);
        const requisicao = {
            //url: 'https://notepad.pw/raw/KEeTANbHwbUSqWTFsNab',
            url: 'https://ntfy.sh/OPSEUA', method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: String.raw`${JSON.stringify(z)}`
        }; const retApi = await api(requisicao);
        console.log(retApi.res);
        // ------------------------------------------------------------------------





        // ----- FIM -------- FIM ---------- FIM --------- FIM --------- FIM ------
    } catch (error) { console.log(`ERRO:${error}`); }
}
run()
