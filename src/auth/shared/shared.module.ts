import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedRoutingModule } from './shared-routing.module';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { AuthService } from './services/auth/auth.service';

@NgModule({
    declarations: [
        AuthFormComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedRoutingModule
    ],
    exports: [
        AuthFormComponent
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<any> {
        return {
            ngModule: SharedModule,
            providers: [
                AuthService
            ]
        };
    }
}
