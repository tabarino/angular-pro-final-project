import { ChangeDetectionStrategy, Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const TYPE_CONTROL_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => WorkoutTypeComponent),
    multi: true
};

@Component({
    selector: 'workout-type',
    templateUrl: './workout-type.component.html',
    styleUrls: ['./workout-type.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TYPE_CONTROL_ACCESSOR]
})
export class WorkoutTypeComponent implements OnInit, ControlValueAccessor {
    selectors = ['strength', 'endurance'];
    value: string;
    private onTouch: () => void;
    private onModelChange: (value: string) => void;

    constructor() { }

    ngOnInit(): void {
    }

    registerOnTouched(fn: () => void) {
        this.onTouch = fn;
    }

    registerOnChange(fn: () => void) {
        this.onModelChange = fn;
    }

    writeValue(value: string) {
        this.value = value;
    }

    setSelected(value: string) {
        this.value = value;
        this.onModelChange(value);
        this.onTouch();
    }
}
