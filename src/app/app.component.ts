import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  title = 'msal-angular-app';
  isIframe = false;
  loginDisplay = false;

  constructor(private authService: MsalService) { }

  ngOnInit() {
    this.isIframe = window !== window.parent && !window.opener;
    this.setLoginDisplay();
  }

  login() {
    this.authService.loginRedirect();
  }

  logout() {
    this.authService.logout();
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }
}
