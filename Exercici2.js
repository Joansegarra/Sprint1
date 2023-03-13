// SPRINT 1.2: Classes & Arrow Functions

/* Descripció
Les arrow functions són una evolució de les funcions tradicionals. Les classes van ser introduïdes en EcmaScript 6 i treballarem amb elles en profunditat.
Utilitza l'intèrpret de node en tots els casos. */


// Nivell 1
/*
- Exercici 1:
Mostra per la consola el resultat d'una arrow function autoinvocable que sumi dos nombres.*/

((a, b) => {
    console.log(a + b);
  })(5, 10);


// Nivell 2
/*- Exercici 1:
Crea una arrow function que, rebent un paràmetre, retorni un objecte 
amb un atribut que tingui com a valor el paràmetre rebut.*/

const creaObjecte = (valor) => ({ atribut: valor });

console.log(creaObjecte("hola")); // Mostra per la consola: { atribut: "hola" }


// Nivell 2
/*- Exercici 2:
Crea una classe "Persona" que rebi un paràmetre 'nom' en ser instanciada. La classe inclourà un mètode 
dirNom que imprimeixi per consola el paràmetre 'nom'. Invoca el mètode dirNom des de fora de la classe.*/

class Persona {
    constructor(nom) {
      this.nom = nom;
    }
    
    dirNom() {
      console.log(this.nom);
    }
  }
  
  const persona = new Persona("Maria");
  persona.dirNom(); // Mostra per la consola: "Maria"
  

// Nivell 3
/* - Exercici 1:
Escriu una function creadora d'objectes que faci instàncies d'una classe abstracta. 
Invoca-la amb diferents definicions.*/



const crea_objetos = (propiedad1, propiedad2) => {
    return {
        propiedad1,
        propiedad2
    };
}
 

let objeto10 = crea_objetos('heavy', 'new');
console.log(objeto10);

let arbol = crea_objetos('small', 'green');
console.log(arbol);