import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SidenavComponent } from './nav/sidenav/sidenav.component';
import { HeadernavComponent } from './nav/headernav/headernav.component';
import { DisputedComponent } from './dispute/disputed/disputed.component';
import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsComponent } from './form/forms/forms.component'; // Import FormsComponent here
import { ReactiveFormsModule } from '@angular/forms';  // Import ReactiveFormsModule

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    HeadernavComponent,
    DisputedComponent,
    FormsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
     
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
