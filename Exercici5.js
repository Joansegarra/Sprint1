//Entrega 1.5: Node Utils

/*Descripció:
Els mòduls natius de Node.js permeten als desenvolupadors/es d'aplicacions i mòduls dur a terme diferents tasques: gestió d'arxius, processament d'informació, codificació i encriptació, entre d'altres. Necessitaràs donar un cop d'ull a la documentació de Node!
Utilitza l'intèrpret de node en els exercicis i pensa que potser cal incloure instruccions d'instal·lació i/o execució perquè es pugui revisar cada part dels exercicis.*/

//Nivell 1
/*- Exercici 1
Crea una funció que, en executar-la, escrigui una frase en un fitxer.*/

const fs = require('fs');
function writeToFile() {
fs.writeFile('output.txt', 'Aquesta és una frase per al fitxer.', (err) => {
if (err) throw err;
console.log('El contingut ha estat escrit correctament en el fitxer!');
});
}

writeToFile();



/*- Exercici 2
Crea una altra funció que mostri per consola el contingut del fitxer de l'exercici anterior.*/

function readFromFile() {
    fs.readFile('output.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
    });
    }
    readFromFile();
    
    

/*- Exercici 3
Crea una funció que comprimeixi el fitxer del nivell 1.*/

const zlib = require('zlib');
function compressFile() {
const gzip = zlib.createGzip();
const input = fs.createReadStream('output.txt');
const output = fs.createWriteStream('output.txt.gz');

input.pipe(gzip).pipe(output);

console.log('El fitxer ha estat comprimit correctament!');
}

compressFile();

//Nivell 2

/*- Exercici 1
Crea una funció que imprimeixi recursivament un missatge per la consola amb demores d'un segon.*/

function printDelayedMessage(message, seconds) {
    setTimeout(() => {
      console.log(message);
      printDelayedMessage(message, seconds);
    }, seconds * 1000);
  }
  
  // Exemple d'ús
  printDelayedMessage("Missatge tardat", 1); // Mostra "Missatge tardat" cada segon

  
/*
- Exercici 2
Crea una funció que llisti per la consola el contingut del directori d'usuari/ària de l'ordinador utilizant Node Child Processes.*/


const { exec } = require("child_process");

function listUserDirectory() {
  exec("ls ~/documents/GitHub/Sprint1/", (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
}

// Exemple d'ús
listUserDirectory(); // Llista el contingut del directori d'usuari/ària


//Nivell 3
/*- Exercici 1
Crea una funció que creï dos fitxers codificats en hexadecimal i en base64 respectivamente, a partir del fitxer del nivell 1.
Crea una funció que guardi els fitxers del punt anterior, ara encriptats amb l'algoritme aes-192-cbc, i esborri els fitxers inicials.
Crea una altra funció que desencripti i descodifiqui els fitxers de l'apartat anterior tornant a generar una còpia de l'inicial.
Inclou un README amb instruccions per a l'execució de cada part.*/


const crypto = require('crypto');

function createEncodedFiles(filename) {
  // Llegir el contingut del fitxer
  const data = fs.readFileSync(filename);
  
  // Codificar en hexadecimal
  const hexEncodedData = data.toString('hex');
  
  // Codificar en base64
  const base64EncodedData = data.toString('base64');
  
  // Escriure els fitxers codificats
  fs.writeFileSync(`${filename}.hex`, hexEncodedData);
  fs.writeFileSync(`${filename}.base64`, base64EncodedData);
  
  console.log(`S'han creat els fitxers codificats ${filename}.hex i ${filename}.base64`);
}



createEncodedFiles('output.txt');


function encryptFiles(filename) {
  // Generar una clau de xifratge aleatòria
  const key = crypto.randomBytes(24);
  
  // Generar un vector d'inicialització aleatori
  const iv = crypto.randomBytes(16);
  
  // Crear una instància del xifratge AES-192-CBC
  const cipher = crypto.createCipheriv('aes-192-cbc', key, iv);
  
  // Llegir el contingut del fitxer codificat en hexadecimal
  const hexEncodedData = fs.readFileSync(`${filename}.hex`);
  
  // Encriptar el contingut
  const encryptedData = Buffer.concat([cipher.update(hexEncodedData), cipher.final()]);
  
  // Escriure el fitxer encriptat
  fs.writeFileSync(`${filename}.enc`, encryptedData);
  
  // Esborrar el fitxer codificat en hexadecimal
  fs.unlinkSync(`${filename}.hex`);
  
  // Esborrar el fitxer codificat en base64
  fs.unlinkSync(`${filename}.base64`);
  
  console.log(`S'ha encriptat el fitxer ${filename}.enc`);
  
  return { key, iv };
}



/*
function createEncodedFiles() {
  const fileContents = fs.readFileSync('output.txt');
  
// Codificació en hexadecimal
  const hexEncodedData = fileContents.toString('hex');
  fs.writeFileSync('./file_hex.txt', hexEncodedData);

// Codificació en base64
  const base64EncodedData = fileContents.toString('base64');
  fs.writeFileSync('./file_base64.txt', base64EncodedData);
}


//encriptar

const crypto = require('crypto');

function encryptFiles() {
  const algorithm = 'aes-192-cbc';
  const password = 'mysecretpassword';
  const key = crypto.scryptSync(password, 'salt', 24);

  const iv = crypto.randomBytes(16);

  const hexEncodedStream = fs.createReadStream('./file_hex.txt');
  const hexEncryptedStream = crypto.createCipheriv(algorithm, key, iv);
  const hexOutputStream = fs.createWriteStream('./file_hex_encrypted.txt');

  hexEncodedStream.pipe(hexEncryptedStream).pipe(hexOutputStream);

  const base64EncodedStream = fs.createReadStream('./file_base64.txt');
  const base64EncryptedStream = crypto.createCipheriv(algorithm, key, iv);
  const base64OutputStream = fs.createWriteStream('./file_base64_encrypted.txt');

  base64EncodedStream.pipe(base64EncryptedStream).pipe(base64OutputStream);


// Esborrar fitxers originals
  fs.unlinkSync('./file_hex.txt');
  fs.unlinkSync('./file_base64.txt');
}



//per desencriptar els fitxers encriptats
function decryptFiles() {
  const algorithm = 'aes-192-cbc';
  const password = 'mysecretpassword';
  const key = crypto.scryptSync(password, 'salt', 24);

  const hexEncryptedStream = fs.createReadStream('./file_hex_encrypted.txt');
  const hexDecryptedStream = crypto.createDecipheriv(algorithm, key, iv);
  const hexOutputStream = fs.createWriteStream('./file_hex.txt');

  hexEncryptedStream.pipe(hexDecryptedStream).pipe(hexOutputStream);

  const base64EncryptedStream = fs.createReadStream('./file_base64_encrypted.txt');
  const base64DecryptedStream = crypto.createDecipheriv(algorithm, key, iv);
  const base64OutputStream = fs.createWriteStream('./file_base64.txt');

  base
}
*/