import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { WorkoutsRoutingModule } from './workouts-routing.module';
import { WorkoutsComponent } from './containers/workouts/workouts.component';

@NgModule({
    declarations: [
        WorkoutsComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        WorkoutsRoutingModule
    ]
})
export class WorkoutsModule { }
