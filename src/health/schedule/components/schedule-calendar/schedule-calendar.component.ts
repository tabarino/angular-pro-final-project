import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
    selector: 'schedule-calendar',
    templateUrl: './schedule-calendar.component.html',
    styleUrls: ['./schedule-calendar.component.scss']
})
export class ScheduleCalendarComponent implements OnInit, OnChanges {
    @Output() changeIt = new EventEmitter<Date>();
    selectedDayIndex: number;
    selectedDay: Date;
    selectedWeek: Date;

    constructor() { }

    ngOnInit(): void {
    }

    ngOnChanges(): void {
        this.selectedDayIndex = this.getToday(this.selectedDay);
        this.selectedWeek = this.getStartOfWeek(new Date(this.selectedDay));
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
