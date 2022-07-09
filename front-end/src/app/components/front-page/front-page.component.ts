import { Component, Input } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { ChangeDetectorRef, AfterContentChecked } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css']
})
export class FrontPageComponent {
  @Input() target!: String;
  @Input() signalTimer!: boolean;
  @Input() done: boolean = false;
  @Input() userInput!: String;
  @Input() time!: number;

  constructor(private cdref: ChangeDetectorRef) {}

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  start() {
    console.log("start");
  }

  setTarget(target: String) {
    this.target = target;
  }

  sendSignalTimer(signalTimer: boolean) {
      this.signalTimer = signalTimer;
  }

  typingDone(userInput: String) {
    this.done = true;
    this.userInput = userInput;
  }

  timerDone(time: number) {
    this.done = true;
    this.time = time;
  }
}
