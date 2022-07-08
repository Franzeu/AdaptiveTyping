import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordsComponent } from './components/forgot-passwords/forgot-passwords.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

//front page components
import { FrontPageComponent } from './components/front-page/front-page.component';
import { DisplayTextboxComponent } from './components/display-textbox/display-textbox.component';
//import { TypingTextboxComponent } from './components/typing-textbox/typing-textbox.component';
////import { HeaderComponent } from './components/header/header.component';
//import { TimerComponent } from './components/timer/timer.component';
//import { LoginButtonComponent } from './components/login-button/login-button.component';

//route guard
import { AuthGuard } from './shared/guard/auth.guard';
const routes: Routes = [
  //{ path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  
  //{ path: '', redirectTo: '/front-page', pathMatch: 'full' },
  {path: '',component: FrontPageComponent},
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordsComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
