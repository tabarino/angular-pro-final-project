import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ListItemComponent } from './components/list-item/list-item.component';
import { MealsService } from './services/meals/meals.service';
import { WorkoutsService } from './services/workouts/workouts.service';

@NgModule({
    declarations: [
        ListItemComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        AngularFirestoreModule
    ],
    exports: [
        ListItemComponent
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<any> {
        return {
            ngModule: SharedModule,
            providers: [
                MealsService,
                WorkoutsService
            ]
        };
    }
}
