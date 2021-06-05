import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
 {path: '', pathMatch: 'full', redirectTo: 'login' },
 {path: 'login', component:LoginComponent},
  {path:'admin', loadChildren:()=>import('./admin/admin.module').
    then(mod=>mod.AdminModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
