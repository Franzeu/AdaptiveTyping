import { Component, DoCheck, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit, DoCheck {
  @Input() testDone: boolean = false;
  @Input() timeDone: boolean = false;
  @Input() userInput!: String;
  @Input() target!: String;
  @Input() time!: number;
  wpm!: string;
  accuracy!: string;

  constructor() { }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    console.log(this.userInput);
    console.log(this.time);
    this.wpm = ((this.userInput.length / 5) / ((60 - this.time) / 60)).toFixed(2);
    let correct = 0;
    for (let i = 0; i < this.userInput.length; i++) {
      if (this.userInput[i] == this.target[i]) {
        correct += 1;
      }
    }

    this.accuracy = (correct / this.target.length * 100).toFixed(2);
  }
}
