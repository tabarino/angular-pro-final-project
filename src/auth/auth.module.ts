import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { environment } from 'src/environments/environment';
import { SharedModule } from './shared/shared.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFirestoreModule,
        LoginModule,
        RegisterModule,
        SharedModule.forRoot(),
        AuthRoutingModule
    ]
})
export class AuthModule {
}
