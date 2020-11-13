import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { AuthModule } from '../auth/auth.module';
import { AppComponent } from './containers/app/app.component';
import { Store } from '../store/store';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AuthModule,
        AppRoutingModule
    ],
    providers: [
        Store
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
