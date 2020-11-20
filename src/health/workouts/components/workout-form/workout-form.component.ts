import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Workout } from 'src/health/shared/models/workout.model';

@Component({
    selector: 'workout-form',
    templateUrl: './workout-form.component.html',
    styleUrls: ['./workout-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkoutFormComponent implements OnInit, OnChanges {
    @Input() workout: Workout;
    @Output() create = new EventEmitter<Workout>();
    @Output() update = new EventEmitter<Workout>();
    @Output() remove = new EventEmitter<Workout>();
    toggled = false;
    exists = false;
    form = this.fb.group({
        name: ['', Validators.required],
        type: 'strength',
        strength: this.fb.group({
            reps: 0,
            sets: 0,
            weight: 0
        }),
        endurance: this.fb.group({
            distance: 0,
            duration: 0
        })
    });

    constructor(
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.workout && this.workout.name) {
            this.exists = true;
            const value = this.workout;
            this.form.patchValue(value);
        }
    }

    get required() {
        return (
            this.form.get('name').hasError('required') &&
            this.form.get('name').touched
        );
    }

    get placeholder() {
        return `e.g. ${this.form.get('type').value === 'strength' ? 'Benchpress' : 'Treadmill'}`;
    }

    createWorkout() {
        if (this.form.valid) {
            this.create.emit(this.form.value);
        }
    }
    updateWorkout() {
        if (this.form.valid) {
            this.update.emit(this.form.value);
        }
    }

    removeWorkout() {
        this.remove.emit(this.form.value);
    }

    toggle() {
        this.toggled = !this.toggled;
    }
}
