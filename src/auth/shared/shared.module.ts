import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedRoutingModule } from './shared-routing.module';
import { AuthFormComponent } from './components/auth-form/auth-form.component';

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
}
