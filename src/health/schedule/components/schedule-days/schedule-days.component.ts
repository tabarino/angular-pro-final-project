import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'schedule-days',
    templateUrl: './schedule-days.component.html',
    styleUrls: ['./schedule-days.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleDaysComponent implements OnInit {
    @Input() selected: number;
    @Output() selectIt = new EventEmitter<number>();
    days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

    constructor() { }

    ngOnInit(): void {
    }

    selectDay(index: number) {
        this.selectIt.emit(index);
    }
}
