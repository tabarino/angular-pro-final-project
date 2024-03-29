import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'auth',
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'login' },
            {
                path: 'login',
                loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
            },
            {
                path: 'register',
                loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {
}
