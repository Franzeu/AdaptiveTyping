import { Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { WordsService } from 'src/app/words.service';
import { Word } from 'src/app/Word';
import { outputAst } from '@angular/compiler';

@Component({
  selector: 'app-display-textbox',
  templateUrl: './display-textbox.component.html',
  styleUrls: ['./display-textbox.component.css']
})
export class DisplayTextboxComponent implements OnInit{
  data!: Word;
  words!: String;
  isLoaded: boolean = false;
  @Input() userInput!: String;
  @Output() displaySet = new EventEmitter();
  htmlStr: string = "";

  constructor(private wordService: WordsService) { }

  ngOnInit(): void {  
    this.wordService.getWords().subscribe((response) => {
      this.data = response;
      this.isLoaded = true;
      this.words = this.data.english.join(' ');
      this.displaySet.emit(this.words);
    
      for (let i = 0; i < this.words.length; i++) {
        let newSpan = "<span class='default'>" + this.words[i] + "</span>";
        this.htmlStr += newSpan;
      }
    });
  }

  ngDoCheck(): void {
    this.refresh();
  }

  refresh(): void {
    // Make sure variables are not undefined
    if (this.isLoaded && this.userInput !== undefined) {
      this.htmlStr = "";
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
