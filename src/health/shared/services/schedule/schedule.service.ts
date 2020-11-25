import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/auth/shared/services/auth/auth.service';
import { Store } from 'src/store/store';
import { ScheduleItem } from '../../models/scheduleItem.model';
import { ScheduleList } from '../../models/scheduleList.model';
import * as dbUtils from '../db-utils';

@Injectable()
export class ScheduleService {
    private date$ = new BehaviorSubject(new Date());
    private section$ = new Subject();
    schedule$: Observable<ScheduleItem[] | ScheduleList>;
    selected$ = this.section$.pipe(
        tap((next: any) => this.store.set('selected', next))
    );

    constructor(
        private store: Store,
        private db: AngularFirestore,
        private authService: AuthService
    ) {
        this.schedule$ = this.date$.pipe(
            tap((next: any) => this.store.set('date', next)),
            map((day: any) => {
                const startAt = (
                    new Date(day.getFullYear(), day.getMonth(), day.getDate())
                ).getTime();
                const endAt = (
                    new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1)
                ).getTime() - 1;

                return { startAt, endAt };
            }),
            switchMap(({ startAt, endAt }: any) => this.getSchedule(startAt, endAt)),
            map((data: ScheduleItem[]) => {
                const mapped: ScheduleList = {};

                for (const prop of data) {
                    if (!mapped[prop.section]) {
                        mapped[prop.section] = prop;
                    }
                }

                return mapped;
            }),
            tap(schedule => this.store.set('schedule', schedule))
        );
    }

    get uid() {
        return this.authService.user.uid;
    }

    updateDate(date: Date) {
        this.date$.next(date);
    }

    selectSection(event: any) {
        this.section$.next(event);
    }

    private getSchedule(startAt: number, endAt: number) {
        return this.db.collection('schedule', ref => {
            return ref
                .where('uid', '==', this.uid)
                .where('timestamp', '>=', startAt)
                .where('timestamp', '<=', endAt)
                .orderBy('timestamp');
        }).snapshotChanges().pipe(
            map(snaps => dbUtils.convertSnaps<ScheduleItem>(snaps))
        );
    }
}
