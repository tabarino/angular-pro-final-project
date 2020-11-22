import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ScheduleItem } from 'src/health/shared/models/scheduleItem.model';
import { ScheduleList } from 'src/health/shared/models/scheduleList.model';

@Component({
    selector: 'schedule-calendar',
    templateUrl: './schedule-calendar.component.html',
    styleUrls: ['./schedule-calendar.component.scss']
})
export class ScheduleCalendarComponent implements OnInit, OnChanges {
    @Input()
    set date(date: Date) {
        this.selectedDay = new Date(date.getTime());
    }
    @Input() items: ScheduleList;
    @Output() changeIt = new EventEmitter<Date>();
    selectedDayIndex: number;
    selectedDay: Date;
    selectedWeek: Date;
    sections = [
        { key: 'morning', name: 'Morning' },
        { key: 'lunch', name: 'Lunch' },
        { key: 'evening', name: 'Evening' },
        { key: 'snacks', name: 'Snacks and Drinks' },
    ];

    constructor() { }

    ngOnInit(): void {
    }

    ngOnChanges(): void {
        this.selectedDayIndex = this.getToday(this.selectedDay);
        this.selectedWeek = this.getStartOfWeek(new Date(this.selectedDay));
    }

    getSection(name: string): ScheduleItem {
        return this.items && this.items[name] || {};
    }

    onChange(weekOffset: number) {
        const startOfWeek = this.getStartOfWeek(new Date());
        const startDate = (
            new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate())
        );
        startDate.setDate(startDate.getDate() + (weekOffset * 7));
        this.changeIt.emit(startDate);
    }

    selectDay(index: number) {
        const selectedDay = new Date(this.selectedWeek);
        selectedDay.setDate(selectedDay.getDate() + index);
        this.changeIt.emit(selectedDay);
    }

    private getStartOfWeek(date: Date) {
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(date.setDate(diff));
    }

    private getToday(date: Date) {
        let today = date.getDay() - 1;
        if (today < 0) {
            today = 6;
        }
        return today;
    }
}
