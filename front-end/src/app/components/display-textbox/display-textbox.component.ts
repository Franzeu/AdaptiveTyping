import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { WordsService } from 'src/app/words.service';
import { Word } from 'src/app/Word';
import { outputAst } from '@angular/compiler';

@Component({
  selector: 'app-display-textbox',
  templateUrl: './display-textbox.component.html',
  styleUrls: ['./display-textbox.component.css']
})
export class DisplayTextboxComponent implements OnInit {
  data!: Word;
  words!: String;
  @Output() displaySet = new EventEmitter();

  constructor(private wordService: WordsService) { }

  ngOnInit(): void {  
    this.wordService.getWords().subscribe((response) => {
      this.data = response;
      this.update();
    });
    this.update();
  }
  
  update() {
    this.words = this.data.english.join(' ');
    this.displaySet.emit(this.words);
  }

}
