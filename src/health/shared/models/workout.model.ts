export interface Workout {
    id: string;
    uid: string;
    name: string;
    type: string; // endurance | strength
    endurance: any;
    strength: any;
    timestamp: number;
}
