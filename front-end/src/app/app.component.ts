import { Component, Input } from '@angular/core';
import { TitleStrategy } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Input() target!: String;
  @Input() signalTimer!: boolean;

  start() {
    console.log("start");
  }

  setTarget(target: String) {
    this.target = target;
    
  }

  sendSignalTimer(signalTimer: boolean) {
      this.signalTimer = signalTimer;
  }
}
