import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from 'src/auth/shared/services/auth/auth.service';
import { Store } from 'src/store/store';
import { Meal } from '../models/meal.model';
import { convertSnapsDocItems } from './db-utils';

@Injectable()
export class MealsService {
    meals$: Observable<Meal[]>;

    constructor(
        private store: Store,
        private db: AngularFirestore,
        private authService: AuthService
    ) {
        this.meals$ = this.db.doc(`meals/${ this.uid }`).snapshotChanges().pipe(
            map(snaps => convertSnapsDocItems<Meal>(snaps)),
            tap(meals => this.store.set('meals', meals))
        );
    }

    get uid() {
        return this.authService.user.uid;
    }
}
