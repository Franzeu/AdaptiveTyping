import { Component, Input } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './lin-front-page.component.html',
  styleUrls: ['./lin-front-page.component.css']
})
export class LinFrontPageComponent {
  @Input() target!: string;
  @Input() signalTimer!: boolean;
  @Input() done: boolean = false;
  @Input() userInput!: string;
  @Input() time!: number;

  constructor(private cdref: ChangeDetectorRef, public authService: AuthService) {}
  
  // Suppress console warning.
  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  // Set target string at child component
  setTarget(target: string) {
    this.target = target;
  }

  // Update timer in child component
  sendSignalTimer(signalTimer: boolean) {
      this.signalTimer = signalTimer;
  }

  // Signal test done to typing box component
  typingDone(userInput: string) {
    this.done = true;
    this.userInput = userInput;
  }

  // Signal test done to timer component
  timerDone(time: number) {
    this.done = true;
    this.time = time;
  }

  // Send copy of input to child component
  transferInput(newInput: string) {
    this.userInput = newInput;
  }
}
