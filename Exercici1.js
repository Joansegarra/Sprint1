// Nivell 1
/* Exercici 1. Crea una funció que mostri per consola el nom d'usuari/ària en invocar-la passant-li
 el nom com a paràmetre.*/

function imprimirNomUsuari(nomUsuari) {
    console.log('El nom d\'usuari és: ' + nomUsuari);
  }

  imprimirNomUsuari('Pep');


//Nivell 2
/*- Exercici 1. Mostra per consola el nom i cognoms de l'usuari/ària mitjançant template literals, 
guardant-los en variables i referenciant-les en la impressió del missatge.*/

const nom = 'Maria';
const cognoms = 'Garcia Pérez';

console.log(`El nom complet de l'usuari/ària és: ${nom} ${cognoms}`);


//Nivell 2
/*- Exercici 2. Invoca una funció que retorni un valor des de dins d'una template literal.*/

function obtenirSalutacio(hora) {
    if (hora >= 0 && hora < 12) {
      return 'Bon dia';
    } else if (hora >= 12 && hora < 18) {
      return 'Bona tarda';
    } else {
      return 'Bona nit';
    }
  }
  
  const horaActual = 15;
  const salutacio = obtenirSalutacio(horaActual);
  
  console.log(`"${salutacio}, són les ${horaActual} hores."`);



//Nivell 3
/* Exercici 1. Crea una matriu de deu funcions i emplena-la mitjançant un bucle de manera que cada funció 
compti del 0 al 9 per la consola. Invoca cada funció de l'array iterativament. 
Haurà de mostrar-se per consola el compte del 0 al 9 deu vegades.*/

const funcions = [];

for (let i = 0; i < 10; i++) {
  funcions[i] = function() {
    for (let j = 0; j < 10; j++) {
      console.log(j);
    }
  }
}

for (let i = 0; i < 10; i++) {
  funcions[i]();
}


//Nivell 3
/* Exercici 2. Crea una funció anònima autoinvocable igualada a una variable 
que mostri per consola el nom de l'usuari/ària a rebut com a paràmetre.*/

var nomUsuari = 'Manel';

(function(nom) {
  console.log('Hola ' + nom + '!');
})(nomUsuari);