import { Component, Input } from '@angular/core';
import { TitleStrategy } from '@angular/router';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css']
})
export class FrontPageComponent{

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
