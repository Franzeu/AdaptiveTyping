import { Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { WordsService } from 'src/app/words.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Word } from 'src/app/Word';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-display-textbox',
  templateUrl: './display-textbox.component.html',
  styleUrls: ['./display-textbox.component.css']
})
export class DisplayTextboxComponent implements OnInit{
  data!: Word;
  words!: string;
  isLoaded: boolean = false;
  haveuid: boolean = false;
  htmlStr: string = "";
  once: boolean = false;
  @Input() userInput!: string;
  @Output() displaySet = new EventEmitter();

  constructor(private authService: AuthService, private http: HttpClient) { }

  ngOnInit(): void {  
  }

  ngDoCheck(): void {

     if (!this.once) {
      // Get display from back-end
      if (this.authService.userData !== undefined) {
        this.getText().subscribe((response) => {
          this.data = response;
          this.isLoaded = true;
          this.words = this.data.english.join(' ');
          // Send display string to other components
          this.displaySet.emit(this.words);
          // Wrap letters with span
          for (let i = 0; i < this.words.length; i++) {
            let newSpan = "<span class='default'>" + this.words[i] + "</span>";
            this.htmlStr += newSpan;
            
          }
        });
        this.once = true;
      }
       
     }
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
  // Obtains random text from backend 
  getText(): Observable<Word> {
      const apiURL = 'http://localhost:4000/api/randomtext/' + this.authService.userData.uid;
      return this.http.get<Word>(apiURL);
  }
}
