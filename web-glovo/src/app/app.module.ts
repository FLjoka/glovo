import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApiKeyInterceptor } from '../app/interceptors/api-key-interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentesModule } from './componentes/componentes.module';
import { LoginComponent } from './login/login.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PruebasComponent } from './pruebas/pruebas.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ChartModule } from 'primeng/chart';
import { AdminPublicComponent } from './admin-public/admin-public.component';
import { RouterModule } from '@angular/router';
import { InvitationComponent } from './invitation/invitation.component';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PruebasComponent,
    ResetpasswordComponent,
    AdminPublicComponent,
    InvitationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentesModule,
    InputTextModule,
    ButtonModule,
    BrowserAnimationsModule,
    PasswordModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ProgressSpinnerModule,
    ChartModule,
    RouterModule,
    DropdownModule,
  ],
  exports: [],

  providers: [
    HttpClientModule,
    { provide: HTTP_INTERCEPTORS, useClass: ApiKeyInterceptor, multi: true },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
