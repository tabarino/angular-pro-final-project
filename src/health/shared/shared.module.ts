import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MealsService } from './services/meals.service';
import { ListItemComponent } from './components/list-item/list-item.component';

@NgModule({
    declarations: [
        ListItemComponent
    ],
    imports: [
        CommonModule,
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
                MealsService
            ]
        };
    }
}
