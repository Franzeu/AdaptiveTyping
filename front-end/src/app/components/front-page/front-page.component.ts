import { Component, Input } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css']
})
export class FrontPageComponent {
  @Input() target!: string;
  @Input() signalTimer!: boolean;
  @Input() done: boolean = false;
  @Input() userInput!: string;
  @Input() time!: number;

  constructor(private cdref: ChangeDetectorRef) {}
  // Suprreses a warning from the console. Doesn't break anything.
  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
  
  // Set the target string
  setTarget(target: string) {
    this.target = target;
  }

  // Set the timer to be sent to child component
  sendSignalTimer(signalTimer: boolean) {
      this.signalTimer = signalTimer;
  }

  // Signal the test being done to typing box component
  typingDone(userInput: string) {
    this.done = true;
    this.userInput = userInput;
  }

  // Signal the test being done to timer component
  timerDone(time: number) {
    this.done = true;
    this.time = time;
  }

  // Send input to child component
  transferInput(newInput: string) {
    this.userInput = newInput;
  }
}
