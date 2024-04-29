import { delay, finalize, of, switchMap } from "rxjs";

/**
 ** switchMap
 ** *********
 ** Permite realizar una nueva suscripción a un observable
 ** cada vez que se emite un valor en el observable origen.
 ** útil para manejar solicitudes HTTP consecutivas.
 ** 
 ** Por supuesto. El operador switchMap en RxJS es un operador de mapeo que, 
 ** como su nombre indica, "cambia" al observable más reciente que se ha producido 
 ** a partir de un observable fuente. A diferencia de otros operadores de mapeo, 
 ** como concatMap o mergeMap, switchMap cancelará cualquier observación activa si 
 ** se recibe una nueva emisión del observable fuente, conmutando al último observable
 ** generado.
 ** 
 ** Esta característica de cancelación es particularmente útil en situaciones
 ** donde solo te interesa el resultado más reciente y quieres evitar el procesamiento 
 ** de resultados obsoletos o que ya no son relevantes.
 ** 
 ** El operador switchMap en RxJS es un operador de transformación que toma valores 
 ** emitidos por un observable fuente y los transforma en otros observables. Luego, empieza 
 ** a emitir valores del observable interno más reciente, cancelando cualquier observable 
 ** interno anterior. Este comportamiento hace que switchMap sea útil en escenarios donde
 **  solo te interesa el resultado más reciente de una secuencia de eventos, ignorando 
 ** las emisiones previas si llegan nuevas emisiones antes de completarse.
 ** 
 ** Beneficios de switchMap
 ** ***********************
 ** Cancelación automática: Al cambiar al observable más reciente, se cancelan 
 ** automáticamente los anteriores.
 ** 
 ** Control de recursos: Ideal para evitar el desperdicio de recursos en procesos 
 ** obsoletos o redundantes.
 ** 
 ** Efectividad en escenarios dinámicos: Muy útil para interfaces de usuario donde el 
 ** comportamiento del usuario puede cambiar rápidamente.
 ** 
 ** Ejemplo de Uso
 ** **************
 ** Un caso común para switchMap es cuando estás haciendo solicitudes HTTP para buscar datos. 
 ** Si el usuario inicia una nueva búsqueda antes de que la búsqueda anterior se complete,
 ** puedes usar switchMap para cancelar la solicitud anterior y comenzar con la nueva búsqueda.
 ** 
 ** **NOTA**
 ** ********
 ** Lo que se espera que el switchMap retorne es un Observable.
 */
const switched$ = of(1, 2, 3)
    .pipe(
        switchMap(value => of(value * 10)
            .pipe(
                finalize(() => console.log('Observable ya no emite datos!'))
            )
        )
    );


export const operatorSwitchMap = () => {
    switched$
        .subscribe({
            next: number => console.log(number),
        });
}

/**
 ** Resultado
 ** *********
 ** 10
 ** switchMap.ts:39 Observable ya no emite datos!
 ** switchMap.ts:47 20
 ** switchMap.ts:39 Observable ya no emite datos!
 ** switchMap.ts:47 30
 ** switchMap.ts:39 Observable ya no emite datos!
 ** 
 ** Analizando resultado
 ** ********************
 ** En tu ejemplo, parece que el observable fuente (of(1, 2, 3)) emite sus valores 
 ** secuencialmente y casi instantáneamente, y el observable interno (of(value * 10)) 
 ** también se completa inmediatamente. Esto significa que el observable interno 
 ** se completa antes de que llegue el siguiente valor del observable fuente, 
 ** y por eso no se cancela ninguna emisión.
 ** 
 ** En este ejemplo, cada valor del observable fuente se emite uno tras otro,
 ** y el observable interno se completa de inmediato. No hay tiempo para que switchMap cancele 
 ** el observable interno anterior antes de que llegue el siguiente valor del observable fuente.
 ** 
 ** 
 ** Comportamiento esperado
 ** ***********************
 ** En este caso, dado que los valores se emiten y completan rápidamente, switchMap no 
 ** cancela ningún observable interno. Cada valor del observable fuente es procesado 
 ** secuencialmente y, por tanto, verás que se emiten los tres valores transformados (10, 20, 30).
 ** 
 ** Si quisieras ver el comportamiento típico de switchMap, necesitarías un observable 
 ** interno que no se complete de inmediato, permitiendo así que switchMap tenga tiempo 
 ** para cancelar los observables internos anteriores si el observable fuente emite valores 
 ** rápidamente.
 */

const switchedExpected$ = of(1, 2, 3)
    .pipe(
        switchMap(value => of(value * 10)
            .pipe(
                delay(1000),
                finalize(() => console.log('Observable ya no emite datos!'))
            )
        )
    );


export const operatorSwitchMapExpected = () => {

    switchedExpected$
        .subscribe({
            next: number => console.log(number),
        });

}

/**
 ** Resultado
 ** *********
 ** (2)switchMap.ts:106 Observable ya no emite datos!
 ** switchMap.ts:116 30
 ** switchMap.ts:106 Observable ya no emite datos!
 ** 
 ** Analizando resultaodo
 ** *********************
 ** En este ejemplo, debido al delay(1000), el observable interno se retrasa y, por tanto, si el 
 ** observable fuente emite valores rápidamente, switchMap cancelará los observables internos anteriores. 
 ** En este caso, solo verías el último valor impreso (30).
 */