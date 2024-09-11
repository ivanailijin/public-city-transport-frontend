import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './infrastructure/auth/jwt/jwt.interceptor';
import { AuthModule } from './infrastructure/auth/auth.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { LayoutModule } from './feature-modules/layout/layout.module';
import { StakeholdersModule } from './feature-modules/stakeholders/stakeholders.module';
import { TransportModule } from './feature-modules/transport/transport.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TicketsModule } from './feature-modules/tickets/tickets.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    FormsModule,
    SharedModule,
    HttpClientModule,
    LayoutModule,
    StakeholdersModule,
    TransportModule,
    ModalModule,
    ModalModule.forRoot(),
    TicketsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
