import { Component, OnInit } from '@angular/core';
import { WordsService } from 'src/app/words.service';
import { Word } from 'src/app/Word';

@Component({
  selector: 'app-display-textbox',
  templateUrl: './display-textbox.component.html',
  styleUrls: ['./display-textbox.component.css']
})
export class DisplayTextboxComponent implements OnInit {
  randomWords:string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus rhoncus tortor ullamcorper, aliquet tortor at, dictum ante. Cras interdum orci at nisl pellentesque tincidunt. Ut ornare non ligula ut porttitor. Etiam quis nulla id tellus pellentesque vulputate. Fusce vitae eros lorem. Nullam non rhoncus lectus, sit amet blandit dui. Donec sit amet justo aliquet, ultricies tortor at, dapibus tellus. Quisque."
  data!: Word;
  words!: String;

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
  }
}
