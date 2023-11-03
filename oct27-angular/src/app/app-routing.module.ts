import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminScreenComponent } from './components/admin-screen/admin-screen.component';
import { UserScreenComponent } from './components/user-screen/user-screen.component';


const routes: Routes = [
  { path: 'admin-screen', component: AdminScreenComponent },
  { path: 'user-screen', component: UserScreenComponent },
  { path: '', redirectTo: 'admin-screen', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
