import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { AuthService } from 'src/auth/shared/services/auth/auth.service';
import { Store } from 'src/store/store';
import { Meal } from '../models/meal.model';
import * as dbUtils from './db-utils';

@Injectable()
export class MealsService {
    meals$: Observable<Meal[]>;

    constructor(
        private store: Store,
        private db: AngularFirestore,
        private authService: AuthService
    ) {
        this.meals$ = this.db.collection(
            'meals', ref => ref.where('uid', '==', this.uid).orderBy('timestamp', 'desc')
        ).snapshotChanges().pipe(
            map(snaps => dbUtils.convertSnaps<Meal>(snaps)),
            tap(meals => this.store.set('meals', meals))
        );
    }

    get uid() {
        return this.authService.user.uid;
    }

    getMeal(id: string): Observable<Meal> {
        if (!id) {
            return of({} as Meal);
        }

        return this.store.select<Meal[]>('meals').pipe(
            filter(Boolean),
            map((meals: Meal[]) => meals.find((meal: Meal) => meal.id === id))
        );
    }

    addMeal(meal: Meal) {
        return this.db.collection('meals').add({
            ...meal,
            uid: this.uid,
            timestamp: new Date().getTime()
        });
    }

    updateMeal(id: string, meal: Meal) {
        this.db.doc(`meals/${id}`).update(meal);
    }

    removeMeal(id: string) {
        this.db.doc(`meals/${id}`).delete();
    }
}
