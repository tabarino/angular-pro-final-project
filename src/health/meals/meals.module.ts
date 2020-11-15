import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MealsRoutingModule } from './meals-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MealComponent } from './containers/meal/meal.component';
import { MealsComponent } from './containers/meals/meals.component';
import { MealFormComponent } from './components/meal-form/meal-form.component';

@NgModule({
    declarations: [
        MealsComponent,
        MealComponent,
        MealFormComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MealsRoutingModule,
        SharedModule
    ]
})
export class MealsModule { }
