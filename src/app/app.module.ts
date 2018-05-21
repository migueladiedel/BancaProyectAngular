import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { routes } from './app.routes';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthInterceptor, LoggingInterceptor } from './services/seguridad.service';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BLOG_COMPONENT } from './blog/blog.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoggerService } from '../banca-core/services/logger.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    HomeComponent,
    BLOG_COMPONENT,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot()
  ],
  providers: [
    LoggerService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true, },
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true, },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
