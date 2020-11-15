import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Meal } from 'src/health/shared/models/meal.model';

@Component({
    selector: 'meal-form',
    templateUrl: './meal-form.component.html',
    styleUrls: ['./meal-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MealFormComponent implements OnInit {
    @Output() create = new EventEmitter<Meal>();
    form = this.fb.group({
        name: ['', Validators.required],
        ingredients: this.fb.array([''])
    });

    constructor(
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {
    }

    get required() {
        return (
            this.form.get('name').hasError('required') &&
            this.form.get('name').touched
        );
    }

    get ingredients() {
        return this.form.get('ingredients') as FormArray;
    }

    addIngredient() {
        this.ingredients.push(new FormControl(''));
    }

    removeIngredient(index: number) {
        this.ingredients.removeAt(index);
    }

    createMeal() {
        if (this.form.valid) {
            this.create.emit(this.form.value);
        }
    }
}
