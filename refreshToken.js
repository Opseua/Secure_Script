import JavaScriptObfuscator from 'javascript-obfuscator';

async function funcao() {
    function a(){return '10'};
    function b(){return '20'};
    function c(){return '30'};
    function d(){return '40'};
    function e(){return '50'};

    const valores = {
        nome: a(),
        idade: b(),
        cidade: c(),
        bairro: d()
    }
    console.log(valores);
}

const obfuscationResult = JavaScriptObfuscator.obfuscate(
    funcao.toString(),
    {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 1,
        numbersToExpressions: true,
        simplify: true,
        stringArrayShuffle: true,
        splitStrings: true,
        stringArrayThreshold: 1
    }
);

const obfuscatedCode = obfuscationResult.getObfuscatedCode();
console.log(obfuscatedCode);
