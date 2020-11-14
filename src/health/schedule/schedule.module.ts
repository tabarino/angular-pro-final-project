import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleComponent } from './containers/schedule/schedule.component';

@NgModule({
    declarations: [
        ScheduleComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ScheduleRoutingModule
    ]
})
export class ScheduleModule { }
