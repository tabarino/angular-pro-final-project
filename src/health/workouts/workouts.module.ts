import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { WorkoutsRoutingModule } from './workouts-routing.module';
import { SharedModule } from '../shared/shared.module';
import { WorkoutsComponent } from './containers/workouts/workouts.component';
import { WorkoutComponent } from './containers/workout/workout.component';
import { WorkoutFormComponent } from './components/workout-form/workout-form.component';

@NgModule({
    declarations: [
        WorkoutsComponent,
        WorkoutComponent,
        WorkoutFormComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        WorkoutsRoutingModule,
        SharedModule
    ]
})
export class WorkoutsModule { }
