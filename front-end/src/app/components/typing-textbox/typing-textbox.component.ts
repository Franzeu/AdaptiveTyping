import { Component, DoCheck, EventEmitter, Input, OnInit, Output, Directive, HostListener  } from '@angular/core';

@Component({
  selector: 'app-typing-textbox',
  templateUrl: './typing-textbox.component.html',
  styleUrls: ['./typing-textbox.component.css']
})

export class TypingTextboxComponent implements OnInit, DoCheck {
  userInput: string = "";
  done: boolean = false;
  isEnabled: boolean = false;
  hasTestStarted:boolean = false;

  @Input() target!: string;
  @Input() timeDone: boolean = false;
  @Output() hasTestStartedEvent = new EventEmitter<boolean>();
  @Output() testDoneEvent = new EventEmitter<string>();
  @Output() newInputEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    // If timer is done, typing box needs to be done
    if (this.timeDone) {
      this.isEnabled = true;
      this.testDoneEvent.emit(this.userInput);
    }
  }

  // Start test and send signal of starting
  startTest() {
    this.done = false;
    this.hasTestStarted = true;
    this.hasTestStartedEvent.emit(this.hasTestStarted); 
  }

  // Update input on every user input
  updateInput(input: any) {
    this.userInput = input.value;
    // Emit inputs to other components
    this.newInputEvent.emit(this.userInput);
    // Check whether test is done
    if (this.userInput.length === this.target.length && !this.done) {
      this.testDoneEvent.emit(this.userInput);
      this.isEnabled = true;
    }
  }

}
