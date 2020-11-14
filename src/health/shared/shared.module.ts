import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MealsService } from './services/meals.service';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        AngularFirestoreModule
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<any> {
        return {
            ngModule: SharedModule,
            providers: [
                MealsService
            ]
        };
    }
}
