import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from 'src/app/shared/services/user';
import { userStats } from 'src/app/shared/services/userStats';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

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
  wpm!: string;
  accuracy!: string;
  numberWPM !: number;
  oldWPM !: number;
  private userURL = 'http://localhost:4000/api/strusrdata';
  private statsURL = 'http://localhost:4000/api/gtusrdata';

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {
    this.getUserStats().subscribe((response) => {
      this.oldWPM = response.wpm;
    });
  }

  ngDoCheck(): void {
    this.wpm = ((this.userInput.length / 5) / ((60 - this.time) / 60)).toFixed(2);

    const targetArray = this.target.split(/(\s+)/).filter( str => str.trim().length > 0)
    const inputArray = this.userInput.split(/(\s+)/).filter( str => str.trim().length > 0)
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
    

    this.accuracy = ((targetArray.length - errorArray.length) / targetArray.length * 100).toFixed(2);
    if (!this.once) {
      const wpmNum = Number(this.wpm);
      const accNum = Number(this.accuracy);
      const user: userStats = { uid:this.authService.userData.uid, wpm:wpmNum, accuracy:accNum };
      this.updateData(user).subscribe(response => console.log(response));
      this.once = true;
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
