import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordsComponent } from './components/forgot-passwords/forgot-passwords.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { LinFrontPageComponent } from './components/lin-front-page/lin-front-page.component';
import { AppComponent } from './app.component';

//front page components
import { FrontPageComponent } from './components/front-page/front-page.component';

//route guard
import { AuthGuard } from './shared/guard/auth.guard'

const routes: Routes = [
  
  {path: '', component: FrontPageComponent},
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'logged-in-front', component: LinFrontPageComponent },
  { path: 'forgot-password', component: ForgotPasswordsComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
