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
  numberWPM !: number;
  

  constructor() { }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    console.log(this.userInput);
    console.log(this.time);
    this.wpm = ((this.userInput.length / 5) / ((60 - this.time) / 60)).toFixed(2);

    const targetArray = this.target.split(" ");
    const inputArray = this.userInput.split(" ");
    console.log(targetArray);
    console.log(inputArray);
    const errorArray = [];

    for (let i = 0; i < targetArray.length; i++) {
      if (targetArray[i] !== inputArray[i]) {
        for (let x = 0; x < targetArray[i].length; x++){
          if (targetArray[i][x] !== inputArray[i][x]) {
            errorArray.push(targetArray[i][x]);
            
          }
        }
      }
    }
    console.log(errorArray);

    this.accuracy = ((targetArray.length - errorArray.length) / targetArray.length * 100).toFixed(2);
  }
}
