import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MealsRoutingModule } from './meals-routing.module';
import { MealsComponent } from './containers/meals/meals.component';
import { SharedModule } from 'src/auth/shared/shared.module';

@NgModule({
    declarations: [
        MealsComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MealsRoutingModule,
        SharedModule
    ]
})
export class MealsModule { }
