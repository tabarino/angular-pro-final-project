import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Meal } from 'src/health/shared/models/meal.model';
import { MealsService } from 'src/health/shared/services/meals.service';

@Component({
    selector: 'meal',
    templateUrl: './meal.component.html',
    styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit, OnDestroy {
    meal$: Observable<Meal>;
    subscription: Subscription;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private mealsService: MealsService
    ) { }

    ngOnInit(): void {
        this.subscription = this.mealsService.meals$.subscribe();
        this.meal$ = this.route.params.pipe(
            switchMap(param => this.mealsService.getMeal(param.id))
        );
    }

    backToMeals() {
        this.router.navigate(['/meals']);
    }

    async addMeal(event: Meal) {
        await this.mealsService.addMeal(event);
        this.backToMeals();
    }

    async updateMeal(event: Meal) {
        const id = this.route.snapshot.params.id;
        await this.mealsService.updateMeal(id, event);
        this.backToMeals();
    }

    async removeMeal() {
        const id = this.route.snapshot.params.id;
        await this.mealsService.removeMeal(id);
        this.backToMeals();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
