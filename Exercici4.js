//Entrega 1.4: 
//Async / Await

//Descripció
/*La finalitat de les funcions asíncrones és simplificar el comportament de l'ús síncron de Promises i realitzar algun comportament específic en un grup de Promises. De la mateixa manera que les Promises són semblants a les devolucions de crides estructurades, les funcions amb async/await s'assemblen a una combinació de generadors i promises.
Utilitza l'intèrpret de node en tots els casos.*/

//Nivell 1
//- Exercici 1
/*Crea una funció asíncrona que rebi un id d'empleat/da i imprimeixi per pantalla el nom de l'empleat/da i el seu salari, usant les funcions getEmployee() i getSalary() que has definit a la tasca anterior.*/

const getEmployee = async (id) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
      const data = await response.json();
      return data.name;
    } catch (error) {
      console.error(error);
    }
  };
  
  const getSalary = async (id) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}/todos`);
      const data = await response.json();
      const completedTasks = data.filter((task) => task.completed);
      const salary = completedTasks.length * 1000;
      return salary;
    } catch (error) {
      console.error(error);
    }
  };
  
  const printEmployeeData = async (id) => {
    try {
      const name = await getEmployee(id);
      const salary = await getSalary(id);
      console.log(`Employee name: ${name}, Salary: ${salary}`);
    } catch (error) {
      console.error(error);
    }
  };
  
  printEmployeeData(1);
  



//- Exercici 2
/*Crea una nova funció asíncrona que cridi a una altra que retorni una Promise que efectuï la seva funció resolve() després de 2 segons de la seva invocació.*/

const delay = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Resolved after 2 seconds");
      }, 2000);
    });
  };
  
  const asyncFunction = async () => {
    const result = await delay();
    console.log(result);
  };
  
  asyncFunction(); // Resolved after 2 seconds
  



//Nivell 2

//- Exercici 1
/*Crea una funció que retorni el doble del número que li passa com a paràmetre després de 2 segons.

Crea una altra funció que rebi tres números i calculi la suma dels seus dobles fent servir la funció anterior.*/

// Funció que retorna el doble del número després de 2 segons
function doubleAfterTwoSeconds(num) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(num * 2);
      }, 2000);
    });
  }
  
  // Funció que rep tres números i calcula la suma dels seus dobles fent servir la funció anterior
  async function sumDoubles(num1, num2, num3) {
    try {
      const double1 = await doubleAfterTwoSeconds(num1);
      const double2 = await doubleAfterTwoSeconds(num2);
      const double3 = await doubleAfterTwoSeconds(num3);
      const sum = double1 + double2 + double3;
      return sum;
    } catch (error) {
      console.log(error);
    }
  }
  
  // Exemple d'ús de la funció sumDoubles
  sumDoubles(1, 2, 3).then(result => {
    console.log(result); // hauria de mostrar 12 (2*1 + 2*2 + 2*3)
  }).catch(error => {
    console.log(error);
  });

  


//Nivell 3
//- Exercici 1
/*Força i captura tants errors com puguis dels nivells 1 i 2.*/

/*
// Nivell 1 - Exercici 1
async function printEmployeeSalary(id) {
    try {
      const employee = await getEmployee(id);
      const salary = await getSalary(employee);
      console.log(`Employee name: ${employee.name}, salary: ${salary}`);
    } catch (error) {
      console.log(error.message);
    }
  }
  
  // Nivell 1 - Exercici 2
  async function callAsyncFunction() {
    try {
      const result = await asyncFunction();
      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  }
  
  // Nivell 2 - Exercici 1
  function doubleAfterTwoSeconds(num) {
    return new Promise((resolve, reject) => {
      if (isNaN(num)) {
        reject(new Error('Parameter is not a number'));
      }
      setTimeout(() => {
        resolve(num * 2);
      }, 2000);
    });
  }
  
  // Nivell 2 - Exercici 2
  async function sumDoubles(num1, num2, num3) {
    try {
      const double1 = await doubleAfterTwoSeconds(num1);
      const double2 = await doubleAfterTwoSeconds(num2);
      const double3 = await doubleAfterTwoSeconds(num3);
      const sum = double1 + double2 + double3;
      return sum;
    } catch (error) {
      console.log(error.message);
    }
  }
  */
  // Exemples d'ús amb possibles errors

/*
  printEmployeeSalary(1); // OK
  printEmployeeSalary(100); // Error: Employee not found
  printEmployeeSalary('x'); // Error: Invalid parameter
  callAsyncFunction(); // OK
  callAsyncFunctionError(); // Error: Function not defined
*/  
  sumDoubles(1, 2, 3); // OK
  
  sumDoubles(1, 'x', 3); // Error: Parameter is not a number
  
  sumDoubles(1, 2); // Error: Parameter missing
  