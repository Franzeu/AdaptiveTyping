import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from 'src/app/shared/services/user';
import { userStats } from 'src/app/shared/services/userStats';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NumberValueAccessor } from '@angular/forms';

const httpOptions = {
  headers: new HttpHeaders(
    {
      "Content-Type": "application/json",
    },
  )
}

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
  once: boolean = false;
  isLoaded: boolean = false;
  wpm!: string;
  accuracy!: string;
  numberWPM!: number;
  oldWPM!: number;
  oldAcc!: number;
  wpmImprovement!: string;
  accImprovement!: string;
  private userURL = 'http://localhost:4000/api/strusrdata';
  private statsURL = 'http://localhost:4000/api/gtusrdata';

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {
    // Make sure old user stats are read in
    this.getUserStats().subscribe((response) => {
      this.oldWPM = response.wpm;
      this.oldAcc = response.accuracy;
      console.log(this.oldWPM);
      console.log(this.oldAcc);
      this.isLoaded = true;
    });
  }

  ngDoCheck(): void {
    // Make sure this only happens after old data are read
    if (this.isLoaded) {
      this.wpm = ((this.userInput.length / 5) / ((60 - this.time) / 60)).toFixed(2);

      // Split string by white spaces
      const targetArray = this.target.split(/(\s+)/).filter( str => str.trim().length > 0)
      const inputArray = this.userInput.split(/(\s+)/).filter( str => str.trim().length > 0)
      const errorArray = [];
      var errorDictionary: { [key: string]: any } = {};

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

      // (new - old) / old
      this.wpmImprovement = ((Number(this.wpm) - this.oldWPM) / this.oldWPM * 100).toFixed(2);
      this.accImprovement = ((Number(this.accuracy) - this.oldAcc) / this.oldAcc * 100).toFixed(2);

      // Send new user data to database
      if (!this.once) {
        const wpmNum = Number(this.wpm);
        const accNum = Number(this.accuracy);
        // Sends an error dictionary to the backend. Key is the letter and the value is the amount of times the user misses the character.
        const user: userStats = { uid:this.authService.userData.uid, wpm:wpmNum, accuracy:accNum, errors:errorDictionary };
        this.updateData(user).subscribe(response => console.log(response));
        this.once = true;
      }
    }
  
  }

  updateData(user: userStats): Observable<userStats> {
    return this.http.post<userStats>(this.userURL, user, httpOptions);
  }

  getUserStats(): Observable<userStats>{
    const criteria = [ {uid: this.authService.userData.uid} ];
    return this.http.get<userStats>(this.statsURL + "/?criteria=" + encodeURIComponent( JSON.stringify(criteria)));
  }
}
