import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { AuthService } from 'src/auth/shared/services/auth/auth.service';
import { Store } from 'src/store/store';
import { Workout } from '../../models/workout.model';
import * as dbUtils from '../db-utils';

@Injectable()
export class WorkoutsService {
    workouts$: Observable<Workout[]>;

    constructor(
        private store: Store,
        private db: AngularFirestore,
        private authService: AuthService
    ) {
        this.workouts$ = this.db.collection(
            'workouts', ref => ref.where('uid', '==', this.uid).orderBy('timestamp', 'desc')
        ).snapshotChanges().pipe(
            map(snaps => dbUtils.convertSnaps<Workout>(snaps)),
            tap(workouts => this.store.set('workouts', workouts))
        );
    }

    get uid() {
        return this.authService.user.uid;
    }

    getWorkout(id: string): Observable<Workout> {
        if (!id) {
            return of({} as Workout);
        }

        return this.store.select<Workout[]>('workouts').pipe(
            filter(Boolean),
            map((workouts: Workout[]) => workouts.find((workout: Workout) => workout.id === id))
        );
    }

    addWorkout(workout: Workout) {
        return this.db.collection('workouts').add({
            ...workout,
            uid: this.uid,
            timestamp: new Date().getTime()
        });
    }

    updateWorkout(id: string, workout: Workout) {
        this.db.doc(`workouts/${id}`).update(workout);
    }

    removeWorkout(id: string) {
        this.db.doc(`workouts/${id}`).delete();
    }
}
