import CryptoJS from 'crypto-js';

async function cryptDec(inf) {
    const ret = { 'ret': false };
    try {
        const res = CryptoJS.AES.decrypt(inf.tex, inf.pas).toString(CryptoJS.enc.Utf8);
        if (res == '') {
            ret['msg'] = `DECRYPT: ERRO`;
        } else {
            ret['res'] = res;
            ret['msg'] = `DECRYPT: OK`;
            ret['ret'] = true;
        }
    } catch (error) {
        ret['msg'] = `DECRYPT: ERRO`;
    };

    if (!ret.msg) {
        console.log(ret.msg);
    }
    return ret
}
export default cryptDec

