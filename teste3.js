import path from 'path';
import JavaScriptObfuscator from 'javascript-obfuscator';
import fs from 'fs';

// Função a ser ofuscada
async function funcao() {
    const valores = {
        nome: 'ORLANDO',
        idade: 25,
        cidade: 'Rio de Janeiro',
        bairro: 'Campo Grande'
    }
    console.log(valores.nome)
}

// Converte a função para uma string
const functionString = funcao.toString();

// Regex para encontrar as propriedades do objeto `valores`
const regex = /valores\.(\w+)/g;

// Função de substituição para ofuscar os valores do objeto `valores`
const replaceValues = (_, propertyName) => `valores.${ofuscarValor(valores[propertyName])}`;

// Função para ofuscar um valor específico
function ofuscarValor(valor) {
    // Implemente sua lógica de ofuscação aqui
    // Neste exemplo, simplesmente retorna um valor fixo
    return 'VALOR_OFUSCADO';
}

// Substitui os valores do objeto `valores` na string da função
const functionStringOfuscada = functionString.replace(regex, replaceValues);

// Executa a ofuscação da string da função
const obfuscationResult = JavaScriptObfuscator.obfuscate(functionStringOfuscada, {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    numbersToExpressions: true,
    simplify: true,
    stringArrayShuffle: true,
    splitStrings: true,
    stringArrayThreshold: 1
});

// Cria o nome do arquivo de saída usando o nome do arquivo JS original
var filePath = './refreshToken.js';
var fileName = path.basename(filePath, '.js');
var outputFileName = `${fileName}-of.js`;

// Escreve o resultado da ofuscação no arquivo de saída
var obfuscatedCode = obfuscationResult.getObfuscatedCode();
fs.writeFile(outputFileName, obfuscatedCode, function (err) {
    if (err) {
        console.error('Erro ao escrever no arquivo: ' + err);
    } else {
        console.log(`Resultado da ofuscação escrito em ${outputFileName}`);
    }
});






























/* import path from 'path';
import JavaScriptObfuscator from 'javascript-obfuscator';
import fs from 'fs';

// Lê o conteúdo do arquivo 'teste.js'
var filePath = './refreshToken.js';
var fileContent = fs.readFileSync(filePath, 'utf-8');

// Executa a ofuscação do conteúdo do arquivo
var obfuscationResult = JavaScriptObfuscator.obfuscate(fileContent, {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    numbersToExpressions: true,
    simplify: true,
    stringArrayShuffle: true,
    splitStrings: true,
    stringArrayThreshold: 1
});

// Cria o nome do arquivo de saída usando o nome do arquivo JS original
var fileName = path.basename(filePath, '.js');
var outputFileName = `${fileName}-of.js`;

// Escreve o resultado da ofuscação no arquivo de saída
var obfuscatedCode = obfuscationResult.getObfuscatedCode();
fs.writeFile(outputFileName, obfuscatedCode, function (err) {
    if (err) {
        console.error('Erro ao escrever no arquivo: ' + err);
    } else {
        console.log(`Resultado da ofuscação escrito em ${outputFileName}`);
    }
});
 */