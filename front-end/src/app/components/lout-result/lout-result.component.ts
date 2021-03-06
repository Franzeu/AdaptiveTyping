import { Component, DoCheck, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lout-result',
  templateUrl: './lout-result.component.html',
  styleUrls: ['./lout-result.component.css']
})
export class LoutResultComponent implements OnInit, DoCheck {
  @Input() testDone: boolean = false;
  @Input() timeDone: boolean = false;
  @Input() userInput!: string;
  @Input() target!: string;
  @Input() time!: number;
  wpm!: string;
  accuracy!: string;
  numberWPM!: number;

  constructor() { }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    // Make sure this only happens after old data are read
      this.wpm = ((this.userInput.length / 5) / ((60 - this.time) / 60)).toFixed(2);

      // Split string by white spaces
      const targetArray = this.target.split(/(\s+)/).filter( str => str.trim().length > 0)
      const inputArray = this.userInput.split(/(\s+)/).filter( str => str.trim().length > 0)
      const errorArray = [];
      var errorDictionary: { [key: string]: any } = {};
      // Stores the mistakes that user makes on the typing test into a dictionary and array.
      for (let i = 0; i < targetArray.length && i < inputArray.length; i++) {
        if (targetArray[i] !== inputArray[i]) {
          for (let x = 0; x < targetArray[i].length; x++){
            if (targetArray[i][x] !== inputArray[i][x]) {
              // Checks if the letter is already in the errorDictionary. If it is, increment by 1, and if it isn't create a key/value
              if(errorDictionary.hasOwnProperty(targetArray[i][x])){
                errorDictionary[targetArray[i][x]] = errorDictionary[targetArray[i][x]] + 1;
              }
              else{
                errorDictionary[targetArray[i][x]] = 1;
              }
              errorArray.push(targetArray[i][x]);
            }
          }
        }
      }

      // Convert to a string without spaces
      let tempStr = targetArray.join("");
      // # of correct letter / # of letters
      this.accuracy = ((tempStr.length - errorArray.length) / tempStr.length * 100).toFixed(2);
  }
}
