import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, pluck } from 'rxjs/operators';
import { User } from 'src/auth/shared/models/user.model';
import { Meal } from 'src/health/shared/models/meal.model';

export interface State {
    user: User;
    meals: Meal[];
    [key: string]: any;
}

const state: State = {
    user: undefined,
    meals: undefined
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
