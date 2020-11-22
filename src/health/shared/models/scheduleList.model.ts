import { ScheduleItem } from './scheduleItem.model';

export interface ScheduleList {
    morning?: ScheduleItem;
    lunch?: ScheduleItem;
    evening?: ScheduleItem;
    snacks?: ScheduleItem;
    [key: string]: any;
}
