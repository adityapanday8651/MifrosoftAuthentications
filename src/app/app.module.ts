import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import this for Angular Material
import { MatToolbarModule } from '@angular/material/toolbar'; // Import MatToolbarModule
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule if you use mat-button



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MsalGuardConfiguration, MsalInterceptorConfiguration, MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

const msalGuardConfig: MsalGuardConfiguration = {
  interactionType: InteractionType.Redirect, // or InteractionType.Popup
  authRequest: {
    scopes: ['user.read'],
    prompt: 'select_account' // Optional: customize the login experience
  }
};

const msalInterceptorConfig: MsalInterceptorConfiguration = {
  interactionType: InteractionType.Redirect, // or InteractionType.Popup
  protectedResourceMap: new Map([
    ['https://graph.microsoft.com/v1.0/me', ['user.read']]
  ])
};


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MsalModule.forRoot(new PublicClientApplication({
      auth: {
        clientId: '12345678-1234-1234-1234-123456789abc',
        authority: 'https://login.microsoftonline.com/common',
        redirectUri: 'http://localhost:4200'
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: isIE // set to true for IE 11
      }
    }), msalGuardConfig, msalInterceptorConfig)
  ],
  providers: [],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
