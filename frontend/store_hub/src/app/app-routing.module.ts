import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from './nav/sidenav/sidenav.component';
import { HeadernavComponent } from './nav/headernav/headernav.component';
import { DisputedComponent } from './dispute/disputed/disputed.component';
import { FormsComponent } from './form/forms/forms.component';
const routes: Routes = [
  { path: 'table', component: DisputedComponent},
  {path : 'form' , component:FormsComponent},

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
