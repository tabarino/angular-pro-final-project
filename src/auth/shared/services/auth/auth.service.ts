import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from 'src/store/store';
import { User } from '../../models/user.model';

@Injectable()
export class AuthService {
    auth$: Observable<firebase.default.User>;

    constructor(
        private store: Store,
        private af: AngularFireAuth
    ) {
        this.auth$ = this.af.authState.pipe(
            tap(next => {
                if (!next) {
                    this.store.set('user', null);
                    return;
                }

                const user: User = {
                    uid: next.uid,
                    email: next.email,
                    authenticated: true
                };

                this.store.set('user', user);
            })
        );
    }

    createUser(email: string, password: string) {
        return this.af.createUserWithEmailAndPassword(email, password);
    }

    loginUser(email: string, password: string) {
        return this.af.signInWithEmailAndPassword(email, password);
    }

    logoutUser() {
        return this.af.signOut();
    }
}
