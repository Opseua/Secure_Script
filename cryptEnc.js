import CryptoJS from 'crypto-js';

async function cryptEnc(inf) {
    let ret = { 'ret': false };
    try {
        const res = CryptoJS.AES.encrypt(inf.tex, inf.pas).toString();
        if (res == '') {
            ret['msg'] = `ENCRYPT: ERRO`;
        } else {
            ret['res'] = res;
            ret['msg'] = `ENCRYPT: OK`;
            ret['ret'] = true;
        }
    } catch (error) {
        ret['msg'] = `ENCRYPT: ERRO`;
    };

    if (!ret.msg) {
        console.log(ret.msg);
    }
    return ret
}
export default cryptEnc
