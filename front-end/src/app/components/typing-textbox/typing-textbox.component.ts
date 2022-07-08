import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { DisplayTextboxComponent } from '../display-textbox/display-textbox.component';

@Component({
  selector: 'app-typing-textbox',
  templateUrl: './typing-textbox.component.html',
  styleUrls: ['./typing-textbox.component.css']
})
export class TypingTextboxComponent implements OnInit {
  userInput: String = "";
  done: boolean = false;
  isEnabled: boolean = false;
  hasTestStarted:boolean = false;

  @Input() target!: String;
  @Output() hasTestStartedEvent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  startTest() {
    console.log("sending signal");
    this.done = false;
    this.hasTestStarted = true;
    this.hasTestStartedEvent.emit(this.hasTestStarted); 
  }

  updateInput(input: any) {
    console.log("target: %s", this.target);
    this.userInput = input.value;
    if (this.userInput.length === this.target.length) {
      this.userInput = "";
      this.target = "";
      this.isEnabled = true;
      this.done = true;
      alert("test done");
    }
  }
}
