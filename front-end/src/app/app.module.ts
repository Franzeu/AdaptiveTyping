import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DisplayTextboxComponent } from './components/display-textbox/display-textbox.component';
import { TypingTextboxComponent } from './components/typing-textbox/typing-textbox.component';

@NgModule({
  declarations: [
    AppComponent,
    DisplayTextboxComponent,
    TypingTextboxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
