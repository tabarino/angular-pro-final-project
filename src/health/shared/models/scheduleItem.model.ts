import { Meal } from './meal.model';
import { Workout } from './workout.model';

export interface ScheduleItem {
    id?: string;
    uid: string;
    section: string;
    meals: Meal[];
    workouts: Workout[];
    timestamp: number;
}
