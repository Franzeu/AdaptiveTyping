import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DisplayTextboxComponent } from './components/display-textbox/display-textbox.component';
import { TypingTextboxComponent } from './components/typing-textbox/typing-textbox.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { TimerComponent } from './components/timer/timer.component';
import { ResultComponent } from './components/result/result.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordsComponent } from './components/forgot-passwords/forgot-passwords.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { FrontPageComponent } from './components/front-page/front-page.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';


import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';

// Auth service 
import { AuthService } from './shared/services/auth.service';
import { LinFrontPageComponent } from './components/lin-front-page/lin-front-page.component';
import { LinHeaderComponent } from './components/lin-header/lin-header.component';
import { UserDataComponent } from './components/user-data/user-data.component';
import { RefreshComponent } from './components/refresh/refresh.component';
import { LoutDisplayTextboxComponent } from './components/lout-display-textbox/lout-display-textbox.component';
import { LoutResultComponent } from './components/lout-result/lout-result.component';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    DisplayTextboxComponent,
    TypingTextboxComponent,
    HeaderComponent,
    LoginButtonComponent,
    TimerComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordsComponent,
    VerifyEmailComponent,
    FrontPageComponent,
    ResultComponent,
    LinFrontPageComponent,
    LinHeaderComponent,
    UserDataComponent,
    RefreshComponent,
    LoutDisplayTextboxComponent,
    LoutResultComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    NgChartsModule,
    MatFormFieldModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
