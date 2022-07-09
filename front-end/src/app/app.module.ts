import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button'

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


@NgModule({
  declarations: [
    AppComponent,
    DisplayTextboxComponent,
    TypingTextboxComponent,
    HeaderComponent,
    LoginButtonComponent,
    TimerComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
