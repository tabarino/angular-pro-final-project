import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Meal } from 'src/health/shared/models/meal.model';
import { Workout } from 'src/health/shared/models/workout.model';

@Component({
    selector: 'schedule-assign',
    templateUrl: './schedule-assign.component.html',
    styleUrls: ['./schedule-assign.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleAssignComponent implements OnInit {
    private selected: string[] = [];
    @Input() section: any;
    @Input() list: Meal[] | Workout[];
    @Output() update = new EventEmitter<any>();
    @Output() cancel = new EventEmitter<any>();

    constructor() { }

    ngOnInit(): void {
        this.selected = [
            ...this.section.assigned
        ];
    }

    toggleItem(name: string) {
        if (this.exists(name)) {
            this.selected = this.selected.filter(item => item !== name);
        } else {
            this.selected = [...this.selected, name];
        }
    }

    getRoute(name: string) {
        return [
            `../${name}/new`
        ];
    }

    exists(name: string) {
        // tslint:disable-next-line: no-bitwise
        return !!~this.selected.indexOf(name);
    }

    updateAssign() {
        this.update.emit({
            [this.section.type]: this.selected
        });
    }

    cancelAssign() {
        this.cancel.emit();
    }
}
