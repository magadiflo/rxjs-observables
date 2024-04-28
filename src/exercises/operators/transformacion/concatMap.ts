/**
 * concatMap
 * *********
 * Mantiene el orden relativo de los valores emitidos y 
 * espera a que cada observable secundario se complete
 * antes de pasar al siguiente.
 * 
 * El operador concatMap en RxJS es un operador que te permite mapear 
 * cada emisión de un observable a otro observable, y luego concatenar esas emisiones
 * en el orden en que fueron recibidas. Esto significa que cada observable resultante
 * debe completarse antes de que el siguiente comience a emitir valores.
 * 
 * Para entenderlo mejor, imagina que tienes un observable que emite elementos de una 
 * lista y quieres realizar una operación asíncrona para cada elemento de esa lista, 
 * pero debes asegurarte de que la operación se complete antes de pasar al siguiente 
 * elemento. concatMap es ideal para este escenario, ya que garantiza el orden de las 
 * emisiones y no permite que los observables resultantes se mezclen entre sí.
 */

import { concatMap, from } from "rxjs";

/**
 * Supongamos que tenemos una función que hace una solicitud HTTP para obtener 
 * los detallesde un usuario.
 * */
const getUserDetails = (user: string) => {
    // Esta función devuelve una promesa que resuelve con los detalles del usuario
    return new Promise(resolve => {
        // Simulamos una solicitud HTTP asíncrona con un retardo de 1 segundo
        setTimeout(() => {
            resolve(`Detalles del usuario ${user}`);
        }, 5000);
    });
};


// Creamos un observable que emite una lista de nombres de usuario
const usersObservable = from(['user1', 'user2', 'user3']);

const userDetailsObservable = usersObservable
    .pipe(
        concatMap(user => getUserDetails(user))
    );

export const operatorConcatMap = () => {

    userDetailsObservable
        .subscribe({
            next: data => console.log(data)
        });

}

/**
 * Resultado
 * *********
 * concatMap.ts:38 Detalles del usuario user1
 * concatMap.ts:38 Detalles del usuario user2
 * concatMap.ts:38 Detalles del usuario user3
 * 
 * Explicación
 * ***********
 * Hemos creamos la variable usersObservable que es un observable con tres elementos, es
 * decir, esta fuente de datos se va a emitir 3 veces, una vez por cada elemento: user1, user2
 * y user3.
 * 
 * Ahora, estamos utilizando dentro del pipe de la variable usersObservable el operador
 * concatMap. Este operador espera a que se resuelva el primer observable (el que viene con 
 * user1) para pasar al segundo observable (el del user2) y cuando termine el segundo pasará
 * al tercero (el del user3).
 * 
 * Otra ventaja del concatMap es que podemos acceder a los elementos que fluyen en ese momento
 * por el observable, en nuestro caso, el primer elemento que va a fluir será el user1.
 * Usaremos ese elemnto para hacer alguna acción, como por ejemplo el poder hacer una petición
 * HTTP, tal como se muestra nestro ejemplo. Otra acción que podría hacer es transformar
 * el elemento que ha fluido (user1) en otro tipo de dato, etc. es decir, no siempre se va a
 * realizar llamadas http, la acción también podría ser otra.
 * 
 * Entonces, en nuestro caso, con cada elemento que fluya a por el concatMap, estamos simulando
 * una llamada HTTP que demora 5 segundos en resolverse. Una vez que hayan pasado los 5 segundos
 * y se haya resuelto la simulación de la llamada HTTP, el valor de esa llamada pasa a la 
 * variable userDetailsObservable, variable que tiene a alguien suscrito. Finalmente, ese valor
 * es impreso en el console.log del next.
 * 
 * Habiendo finalizado la impresión del console.log(), pasamos recién al segundo elemento de
 * la fuente de datos usersObservable que es 'user2' y hacemos lo mismo que el elemento 'user1', 
 * así continuamos hasta finalizar todos los elementos de la fuente de dato usersObservable.
 * */

