import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
        private router: Router,
        private authService: AuthService,
    ) { }

    ngOnInit(): void {
        this.subscription = this.authService.auth$.subscribe();
        this.user$ = this.store.select<User>('user');
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    async onLogout() {
        await this.authService.logoutUser();
        this.router.navigate(['/auth/login']);
    }
}
