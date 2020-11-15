import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Meal } from 'src/health/shared/models/meal.model';
import { MealsService } from 'src/health/shared/services/meals.service';
import { Store } from 'src/store/store';

@Component({
    selector: 'meals',
    templateUrl: './meals.component.html',
    styleUrls: ['./meals.component.scss']
})
export class MealsComponent implements OnInit, OnDestroy {
    meals$: Observable<Meal[]>;
    subscription: Subscription;

    constructor(
        private store: Store,
        private mealsService: MealsService
    ) { }

    ngOnInit(): void {
        this.meals$ = this.store.select<Meal[]>('meals');
        this.subscription = this.mealsService.meals$.subscribe();
    }

    removeMeal(event: Meal) {
        this.mealsService.removeMeal(event.id);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
