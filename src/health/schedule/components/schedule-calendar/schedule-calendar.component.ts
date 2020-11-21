import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'schedule-calendar',
    templateUrl: './schedule-calendar.component.html',
    styleUrls: ['./schedule-calendar.component.scss']
})
export class ScheduleCalendarComponent implements OnInit {
    @Input() date: Date;

    constructor() { }

    ngOnInit(): void {
    }
}
