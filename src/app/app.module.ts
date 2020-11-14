import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from '../auth/auth.module';
import { HealthModule } from 'src/health/health.module';
import { AppComponent } from './containers/app/app.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppNavComponent } from './components/app-nav/app-nav.component';
import { Store } from '../store/store';

@NgModule({
    declarations: [
        AppComponent,
        AppHeaderComponent,
        AppNavComponent
    ],
    imports: [
        BrowserModule,
        AuthModule,
        HealthModule,
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
