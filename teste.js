import { spawn } from 'child_process';


// Comando que deseja executar
const comando = 'powershell';
const argumentos = [
  '-Command',
  'Start-Process',
  'D:\\ARQUIVOS\\WINDOWS\\PORTABLE_mitmproxy\\RUN_COMMAND.bat',
  '-Verb',
  'RunAs'
];

// Executa o comando
const processo = spawn(comando, argumentos);

// Captura a saída do console
processo.stdout.on('data', (dados) => {
  console.log(dados.toString());
});

// Captura os erros, se houver
processo.stderr.on('data', (erro) => {
  console.error(erro.toString());
});

// Executado quando o processo é encerrado
processo.on('close', (codigo) => {
  console.log(`O processo foi encerrado com código: ${codigo}`);
});



/* import fs from 'fs';


function escreverArquivo(caminho, conteudo) {
  return new Promise((resolve, reject) => {
    fs.writeFile(caminho, conteudo, (error) => {
      if (error) {
        reject(`Erro ao escrever o arquivo: ${error}`);
      } else {
        resolve('Arquivo escrito com sucesso');
      }
    });
  });
}

async function escreverArquivoAsync() {
  try {
    const resultado = await escreverArquivo('D:/TESTE.bat', 'notepad2');
    console.log(resultado);
  } catch (error) {
    console.error(error);
  }
}

escreverArquivoAsync(); */