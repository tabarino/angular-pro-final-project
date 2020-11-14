import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, pluck } from 'rxjs/operators';
import { User } from 'src/auth/shared/models/user.model';

export interface State {
    user: User;
    [key: string]: any;
}

const state: State = {
    user: undefined
};

export class Store {
    private subject = new BehaviorSubject<State>(state);
    private store = this.subject.asObservable().pipe(distinctUntilChanged());

    get value() {
        return this.subject.value;
    }

    set(name: string, newState: any) {
        this.subject.next({
            ...this.value, [name]: newState
        });
    }

    select<T>(name: string): Observable<T> {
        return this.store.pipe(pluck(name));
    }
}
