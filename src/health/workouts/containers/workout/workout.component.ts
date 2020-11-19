import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Workout } from 'src/health/shared/models/workout.model';
import { WorkoutsService } from 'src/health/shared/services/workouts/workouts.service';

@Component({
    selector: 'workout',
    templateUrl: './workout.component.html',
    styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit, OnDestroy {
    workout$: Observable<Workout>;
    subscription: Subscription;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private workoutsService: WorkoutsService
    ) { }

    ngOnInit(): void {
        this.subscription = this.workoutsService.workouts$.subscribe();
        this.workout$ = this.route.params.pipe(
            switchMap(param => this.workoutsService.getWorkout(param.id))
        );
    }

    backToWorkouts() {
        this.router.navigate(['/workouts']);
    }

    async addWorkout(event: Workout) {
        await this.workoutsService.addWorkout(event);
        this.backToWorkouts();
    }

    async updateWorkout(event: Workout) {
        const id = this.route.snapshot.params.id;
        await this.workoutsService.updateWorkout(id, event);
        this.backToWorkouts();
    }

    async removeWorkout() {
        const id = this.route.snapshot.params.id;
        await this.workoutsService.removeWorkout(id);
        this.backToWorkouts();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
