/* // SPRINT 1.3: Promises & Callback.

Descripció:
Una Promise és un objecte que representa la terminació o el fracàs d'una operació asíncrona. 
Una funció callback és una funció que es passa a una altra funció com un argument i s'invoca dins de la funció externa 
per completar algun tipus de rutina o acció. Conèixer-les bé és una de les bases importants per a la programació amb Node.

Utilitza l'intèrpret de node en tots els casos.*/



/* Nivell 1
- Exercici 1.1:
Crea una funció que retorni una Promise que invoqui la funció resolve() o reject() que rep. 
Invoca-la passant-li les dues funcions de manera que imprimeixin un missatge diferent depenent de si la Promise es resol o no.*/

function examplePromise(param) {
    return new Promise((resolve, reject) => {
      if (param) {
        resolve("Promise resoluted");
      } else {
        reject("Promise rejected");
      }
    });
  }
  
  examplePromise(true)
    .then((message) => console.log(message))
    .catch((message) => console.log(message));
    
  examplePromise(false)
    .then((message) => console.log(message))
    .catch((message) => console.log(message));
  

/* Nivell 1
- Exercici 1.2:
Crea una arrow function que rebi un paràmetre i una funció callback i li passi a la funció 
un missatge o un altre (que s'imprimirà per consola) en funció del paràmetre rebut.*/

const arrowCallback = (param, callback) => {
    if (param) {
      callback('El paràmetre és verdader');
    } else {
      callback('El paràmetre és fals');
    }
  };
  
  arrowCallback(true, (msg) => console.log(msg)); // Imprimeix 'El paràmetre és verdader'
  arrowCallback(false, (msg) => console.log(msg)); // Imprimeix 'El paràmetre és fals'
  


/* Nivell 2
- Exercici 1

Donats els objectes employees i salaries, crea una arrow function getEmployee() que retorni una Promise efectuant la cerca en l'objecte pel seu id.
let employees = [{
    id: 1,
    name: 'Linux Torvalds'
}, {
    id: 2,
    name: 'Bill Gates'
},{
    id: 3,
    name: 'Jeff Bezos'
}];
 
let salaries = [{
    id: 1,
    salary: 4000
}, {
    id: 2,
    salary: 1000
}, {
    id: 3,
    salary: 2000
}];
*/

let employees = [{
    id: 1,
    name: 'Linux Torvalds'
}, {
    id: 2,
    name: 'Bill Gates'
},{
    id: 3,
    name: 'Jeff Bezos'
}];
 
let salaries = [{
    id: 1,
    salary: 4000
}, {
    id: 2,
    salary: 1000
}, {
    id: 3,
    salary: 2000
}];

const getEmployee = (id) => {
  return new Promise((resolve, reject) => {
    const employee = employees.find(emp => emp.id === id);
    if (employee) {
      const salary = salaries.find(sal => sal.id === id);
      if (salary) {
        resolve(`${employee.name} has a salary of ${salary.salary}`);
      } else {
        reject('Salary not found');
      }
    } else {
      reject('Employee not found');
    }
  });
};

// Exemple d'ús
getEmployee(2)
  .then(res => console.log(res))
  .catch(err => console.error(err));



/* - Exercici 2
Crea una altra arrow function getSalary() similar a l'anterior que rebi com a paràmetre un objecte employee i retorni el seu salari.*/

let getSalary = (employee) => {
    return new Promise((resolve, reject) => {
      const salary = salaries.find(sal => sal.id === employee.id);
      if (salary) {
        resolve(salary.salary);
      } else {
        reject(`Salary not found for employee ${employee.name}`);
      }
    });
  }
  
  // Exemple d'ús
  getEmployee(1)
    .then(employee => getSalary(employee))
    .then(salary => console.log(`The employee's salary is ${salary}`))
    .catch(err => console.log(err));
  

/* - Exercici 3
Invoca la primera funció getEmployee() i després getSalary() niant l'execució de les dues promises 
de manera que es retorni per la consola el nom de l'empleat/da i el seu salari.*/

getEmployee(1)
  .then(employee => getSalary(employee))
  .then(salary => console.log(`L'empleat té un salari de ${salary} euros.`))
  .catch(error => console.log(error.message));


/* Nivell 3
- Exercici 1
Fixa un element catch a la invocació del nivell anterior que capturi qualsevol error i el mostri per la consola.*/

getEmployee(1)
    .then(employee => getSalary(employee))
    .then(salary => console.log(`El salari és ${salary}`))
    .catch(error => console.log(error));


    