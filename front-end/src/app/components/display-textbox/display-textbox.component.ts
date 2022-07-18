import { Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { WordsService } from 'src/app/words.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Word } from 'src/app/Word';
import { getAuth } from 'firebase/auth';
import { outputAst } from '@angular/compiler';
import { Observable, of} from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-display-textbox',
  templateUrl: './display-textbox.component.html',
  styleUrls: ['./display-textbox.component.css']
})
export class DisplayTextboxComponent implements OnInit{
  data!: Word;
  words!: String;
  isLoaded: boolean = false;
  haveuid: boolean = false;
  @Input() userInput!: String;
  @Output() displaySet = new EventEmitter();
  htmlStr: string = "";
  once: boolean = false;

  constructor(private wordService: WordsService, private authService: AuthService, private http: HttpClient) { }

  ngOnInit(): void {  
    //this.getID();
    console.log('init');
    console.log(this.authService.userData);
    
    /* if (this.authService.userData !== undefined) {
      this.getText().subscribe((response) => {
        this.once = true;
        this.data = response;
        this.isLoaded = true;
        this.words = this.data.english.join(' ');
        this.displaySet.emit(this.words);
        console.log("inside");
      
        for (let i = 0; i < this.words.length; i++) {
          let newSpan = "<span class='default'>" + this.words[i] + "</span>";
          this.htmlStr += newSpan;
          
        }
      });
    } */
      
  }

  ngDoCheck(): void {

     if (!this.once) {
      if (this.authService.userData !== undefined) {
        this.getText().subscribe((response) => {
          this.data = response;
          this.isLoaded = true;
          this.words = this.data.english.join(' ');
          this.displaySet.emit(this.words);
          console.log("inside");
        
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
    //console.log('display uid? ' + this.authService.userData);

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

/*   getID(): void{
    const auth = getAuth();
    const user = auth.currentUser;
    const usrid = this.authService.userData.uid;
    this.haveuid = true;
    console.log('user uid? ' + usrid);
  } */

  getText(): Observable<Word> {
      const apiURL = 'http://localhost:4000/api/randomtext/' + this.authService.userData.uid;
      console.log(apiURL);
      return this.http.get<Word>(apiURL);
  }
}
