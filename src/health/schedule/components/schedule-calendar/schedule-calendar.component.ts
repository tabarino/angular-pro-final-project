import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'schedule-calendar',
    templateUrl: './schedule-calendar.component.html',
    styleUrls: ['./schedule-calendar.component.scss']
})
export class ScheduleCalendarComponent implements OnInit {
    @Output() changeIt = new EventEmitter<Date>();
    selectedDay: Date;

    constructor() { }

    ngOnInit(): void {
    }

    @Input()
    set date(date: Date) {
        this.selectedDay = new Date(date.getTime());
    }

    onChange(weekOffset: number) {
        const startOfWeek = this.getStartOfWeek(new Date());
        const startDate = (
            new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate())
        );
        startDate.setDate(startDate.getDate() + (weekOffset * 7));
        this.changeIt.emit(startDate);
    }

    private getStartOfWeek(date: Date) {
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(date.setDate(diff));
    }
}
