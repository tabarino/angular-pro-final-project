import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleComponent } from './containers/schedule/schedule.component';
import { ScheduleCalendarComponent } from './components/schedule-calendar/schedule-calendar.component';
import { ScheduleControlsComponent } from './components/schedule-controls/schedule-controls.component';
import { ScheduleDaysComponent } from './components/schedule-days/schedule-days.component';

@NgModule({
    declarations: [
        ScheduleComponent,
        ScheduleCalendarComponent,
        ScheduleControlsComponent,
        ScheduleDaysComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ScheduleRoutingModule
    ]
})
export class ScheduleModule { }
