import { Component, Input, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { DisplayTextboxComponent } from '../display-textbox/display-textbox.component';

@Component({
  selector: 'app-typing-textbox',
  templateUrl: './typing-textbox.component.html',
  styleUrls: ['./typing-textbox.component.css']
})
export class TypingTextboxComponent implements OnInit {
  userInput: string = "";
  targetInput: string = "the be of and a to in he have it that for they i with as not on you do but from or which one would all will there say who make when can more if";
  done: boolean = false;
  @Input() target!: String;
  
  constructor() { }

  ngOnInit(): void {
  }

  startTest() {
    this.done = false;
  }

  updateInput(input: any) {
    this.userInput = input.value;
    if (this.userInput === this.targetInput) {
      this.userInput = "";
      this.done = true;
      alert("test done");
    }
  }
}
