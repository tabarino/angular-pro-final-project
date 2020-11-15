import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Meal } from 'src/health/shared/models/meal.model';
import { MealsService } from 'src/health/shared/services/meals.service';

@Component({
    selector: 'meal',
    templateUrl: './meal.component.html',
    styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit {
    constructor(
        private router: Router,
        private mealsService: MealsService
    ) { }

    ngOnInit(): void {
    }

    async addMeal(event: Meal) {
        await this.mealsService.addMeal(event);
        this.backToMeals();
    }

    backToMeals() {
        this.router.navigate(['/meals']);
    }
}
