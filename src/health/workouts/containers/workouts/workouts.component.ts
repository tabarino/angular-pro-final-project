import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Workout } from 'src/health/shared/models/workout.model';
import { WorkoutsService } from 'src/health/shared/services/workouts/workouts.service';
import { Store } from 'src/store/store';

@Component({
    selector: 'workouts',
    templateUrl: './workouts.component.html',
    styleUrls: ['./workouts.component.scss']
})
export class WorkoutsComponent implements OnInit, OnDestroy {
    workouts$: Observable<Workout[]>;
    subscription: Subscription;

    constructor(
        private store: Store,
        private workoutsService: WorkoutsService
    ) { }

    ngOnInit(): void {
        this.workouts$ = this.store.select<Workout[]>('workouts');
        this.subscription = this.workoutsService.workouts$.subscribe();
    }

    removeWorkout(event: Workout) {
        this.workoutsService.removeWorkout(event.id);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
