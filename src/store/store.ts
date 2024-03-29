import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, pluck } from 'rxjs/operators';
import { User } from 'src/auth/shared/models/user.model';
import { Meal } from 'src/health/shared/models/meal.model';
import { ScheduleItem } from 'src/health/shared/models/scheduleItem.model';
import { Workout } from 'src/health/shared/models/workout.model';

export interface State {
    user: User;
    meals: Meal[];
    workouts: Workout[];
    schedule: ScheduleItem[];
    selected: any;
    list: any;
    date: Date;
    [key: string]: any;
}

const state: State = {
    user: undefined,
    meals: undefined,
    workouts: undefined,
    schedule: undefined,
    selected: undefined,
    list: undefined,
    date: undefined
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
