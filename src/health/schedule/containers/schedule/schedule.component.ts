import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Meal } from 'src/health/shared/models/meal.model';
import { ScheduleItem } from 'src/health/shared/models/scheduleItem.model';
import { Workout } from 'src/health/shared/models/workout.model';
import { MealsService } from 'src/health/shared/services/meals/meals.service';
import { ScheduleService } from 'src/health/shared/services/schedule/schedule.service';
import { WorkoutsService } from 'src/health/shared/services/workouts/workouts.service';
import { Store } from 'src/store/store';

@Component({
    selector: 'schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, OnDestroy {
    date$: Observable<Date>;
    schedule$: Observable<ScheduleItem[]>;
    selected$: Observable<any>;
    list$: Observable<Meal[] | Workout[]>;
    subscriptions: Subscription[] = [];
    open = false;

    constructor(
        private store: Store,
        private mealsService: MealsService,
        private workoutsService: WorkoutsService,
        private scheduleService: ScheduleService
    ) { }

    ngOnInit(): void {
        this.date$ = this.store.select('date');
        this.schedule$ = this.store.select('schedule');
        this.selected$ = this.store.select('selected');
        this.list$ = this.store.select('list');

        this.subscriptions = [
            this.scheduleService.schedule$.subscribe(),
            this.scheduleService.selected$.subscribe(),
            this.scheduleService.list$.subscribe(),
            this.scheduleService.items$.subscribe(),
            this.mealsService.meals$.subscribe(),
            this.workoutsService.workouts$.subscribe()
        ];
    }

    changeDate(date: Date) {
        this.scheduleService.updateDate(date);
    }

    changeSection(event: any) {
        this.open = true;
        this.scheduleService.selectSection(event);
    }

    assignItem(items: string[]) {

        this.scheduleService.updateItems(items);

        this.closeAssign();
    }

    closeAssign() {
        this.open = false;
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}
