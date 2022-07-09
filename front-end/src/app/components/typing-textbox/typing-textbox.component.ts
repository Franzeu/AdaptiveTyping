import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { DisplayTextboxComponent } from '../display-textbox/display-textbox.component';

@Component({
  selector: 'app-typing-textbox',
  templateUrl: './typing-textbox.component.html',
  styleUrls: ['./typing-textbox.component.css']
})
export class TypingTextboxComponent implements OnInit, DoCheck {
  userInput: String = "";
  done: boolean = false;
  isEnabled: boolean = false;
  hasTestStarted:boolean = false;

  @Input() target!: String;
  @Input() timeDone: boolean = false;
  @Output() hasTestStartedEvent = new EventEmitter<boolean>();
  @Output() testDoneEvent = new EventEmitter<String>();

  constructor() { }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    if (this.timeDone) {
      this.isEnabled = true;
      this.testDoneEvent.emit(this.userInput);
    }
  }

  startTest() {
    this.done = false;
    this.hasTestStarted = true;
    this.hasTestStartedEvent.emit(this.hasTestStarted); 
  }

  updateInput(input: any) {
    this.userInput = input.value;
    if (this.userInput.length === this.target.length && !this.done) {
      this.testDoneEvent.emit(this.userInput);
      this.isEnabled = true;
    }
  }
}
