import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/auth/shared/models/user.model';
import { AuthService } from 'src/auth/shared/services/auth/auth.service';
import { Store } from 'src/store/store';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'angular-pro-final-project';
    user$: Observable<User>;
    subscription: Subscription;

    constructor(
        private store: Store,
        private authService: AuthService,
    ) { }

    ngOnInit(): void {
        this.subscription = this.authService.auth$.subscribe();
        this.user$ = this.store.select<User>('user');
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
