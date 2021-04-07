import { Observable } from './Observable';
export class AlwaysObservable<T> extends Observable<T> {

    shouldValueUpdate() {
        return true;
    }


}