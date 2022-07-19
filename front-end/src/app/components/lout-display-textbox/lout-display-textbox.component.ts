import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WordsService } from 'src/app/words.service';
import { Word } from 'src/app/Word';

@Component({
  selector: 'app-lout-display-textbox',
  templateUrl: './lout-display-textbox.component.html',
  styleUrls: ['./lout-display-textbox.component.css']
})
export class LoutDisplayTextboxComponent implements OnInit{
  data!: Word;
  words!: string;
  isLoaded: boolean = false;
  @Input() userInput!: string;
  @Output() displaySet = new EventEmitter();
  htmlStr: string = "";

  constructor(private wordService: WordsService) { }

  ngOnInit(): void {  
    // Get display text from backend
    this.wordService.getWords().subscribe((response) => {
      this.data = response;
      this.isLoaded = true;
      this.words = this.data.english.join(' ');
      // Send it to child components
      this.displaySet.emit(this.words);
    
      // Wrap span around each letter
      for (let i = 0; i < this.words.length; i++) {
        let newSpan = "<span class='default'>" + this.words[i] + "</span>";
        this.htmlStr += newSpan;
      }
    });
  }

  // Gets called when change happens
  ngDoCheck(): void {
    this.refresh();
  }

  refresh(): void {
    // Make sure variables are not undefined
    if (this.isLoaded && this.userInput !== undefined) {
      this.htmlStr = "";
        // Set class of span if right or wrong
        for (var i = 0; i < this.userInput.length; i++) {
          if(this.words[i] === this.userInput[i]) {
            let newSpan = "<span class='correct'>" + this.words[i] + "</span>";
            this.htmlStr += newSpan;
          }
          if (this.words[i] !== this.userInput[i]) {
            let newSpan = "<span class='incorrect'>" + this.words[i] + "</span>";
            this.htmlStr += newSpan;
          }
        }
        // For chars that hasnt been typed yet
        for (let j = i; j < this.words.length; j++) {
          let newSpan = "<span class='default'>" + this.words[j] + "</span>";
          this.htmlStr += newSpan
        }
    }
  }
}