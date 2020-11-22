import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ScheduleItem } from 'src/health/shared/models/scheduleItem.model';

@Component({
    selector: 'schedule-section',
    templateUrl: './schedule-section.component.html',
    styleUrls: ['./schedule-section.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleSectionComponent implements OnInit {
    @Input() name: string;
    @Input() section: ScheduleItem;
    @Output() selectIt = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit(): void {
    }

    onSelect(type: string, assigned: string[] = []) {
        const data = this.section;
        this.selectIt.emit({
            type,
            assigned,
            data
        });
    }
}
