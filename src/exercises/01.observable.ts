import { Observable } from "rxjs";

export const run = () => {

    const myObservable = new Observable<string>(subcriber => {
        subcriber.next('Hello World');
        subcriber.complete();
    });

    myObservable.subscribe({
        next: data => console.log(data),
        error: err => console.error(err),
        complete: () => console.log('Observable completado!'),
    });

}
