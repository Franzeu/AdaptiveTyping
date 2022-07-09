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

  constructor(private wordService: WordsService) { }

  ngOnInit(): void {  
    this.wordService.getWords().subscribe((response) => {
      this.data = response;
      this.isLoaded = true;
      this.words = this.data.english.join(' ');
      this.displaySet.emit(this.words);
    });
  }

  /* ngDoCheck(): void {
    this.refresh();
  }

  refresh(): void {
    console.log(this.userInput);
  } */
}
