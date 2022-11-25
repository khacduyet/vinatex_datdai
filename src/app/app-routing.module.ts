import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {QuantriModule} from './quantri/quantri.module';
import {AuthGuard} from'./services/auth.guard';
const routes: Routes = [
  { path: '', redirectTo: 'quantri', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'quantri', loadChildren: () => import('./quantri/quantri.module').then(m=>m.QuantriModule) ,canActivate:[AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
