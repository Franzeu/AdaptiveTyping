import { Component, DoCheck, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from 'src/app/shared/services/user';
import { userStats } from 'src/app/shared/services/userStats';
import { Observable } from 'rxjs';
import { ChartConfiguration, ChartDataset, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, DoCheck {
  title: string = "AdaptiveTyping"
  wpm!: number;
  accuracy!: number;
  pastWPM: any[] = [];
  pastAcc: any[] = [];
  topMistakes: string[] = [];
  avgWPM: number = 0;
  avgAcc: number = 0;
  avgWPMStr!: string;
  avgAccStr!: string;
  isLoaded: boolean = false;
  statsOnce: boolean = false;
  mistakesOnce: boolean = false;
  private statsURL = 'http://localhost:4000/api/gtusrdata';
  private errorsURL = 'http://localhost:4000/api/mistakes'

  constructor(public authService: AuthService, private http: HttpClient) {}

  public lineChartDataWPM: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'WPM',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(20,130,199,0.8)'
      }
    ]
  };
  public lineChartDataAcc: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Accuracy',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(46,136,82,0.65)'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  public lineChartLegend = true;

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    // Get user stats from back-end
    if (!this.statsOnce && this.authService.userData !== undefined) {
      this.getUserStats().subscribe((response) => {
        this.pastWPM = response.pastWpm;
        this.pastAcc = response.pastAcc;
        this.avgWPM = 0;
        this.avgAcc = 0;
        
        // Calculate avg wpm and acc
        if (this.pastWPM !== undefined) {
          for (let entry of this.pastWPM) {
          
          this.avgWPM += entry;
          }
          this.avgWPM /= this.pastWPM.length;
        }
        
        if (this.pastAcc !== undefined) {
          for (let entry of this.pastAcc) {
          
          this.avgAcc += entry;
          }
          this.avgAcc /= this.pastAcc.length;
        }

        // Set to display
        this.avgWPMStr = this.avgWPM.toFixed(2);
        this.avgAccStr = this.avgAcc.toFixed(2);

        // Set x and y axis of charts
        const wpmArr: number[] = [];
        for (let i = 0; i < this.pastWPM.length; i++) {
          wpmArr.push(i);
        }
        this.lineChartDataWPM.labels = wpmArr;
        this.lineChartDataWPM.datasets[0].data = this.pastWPM;

        const accArr: number[] = [];
        for (let i = 0; i < this.pastAcc.length; i++) {
          accArr.push(i);
        }
        this.lineChartDataAcc.labels = accArr;
        this.lineChartDataAcc.datasets[0].data = this.pastAcc;

        this.statsOnce = true;
        this.isLoaded = true;
      });
    }

    if (!this.mistakesOnce && this.authService.userData !== undefined) {
      // Appends user errors from response to topMistakes variable
      this.getUserError().subscribe((response) => {
         for(let i = 0; i < response.errors.length; i++){
           this.topMistakes.push(response.errors[i][0]);
         }
         console.log(this.topMistakes);
      });
      
      this.mistakesOnce = true;
    }

  }
  // Obtains user stats from backend using get request
  getUserStats(): Observable<userStats>{
    const criteria = [ {uid: this.authService.userData.uid} ];
    return this.http.get<userStats>(this.statsURL + "/?criteria=" + encodeURIComponent( JSON.stringify(criteria)));
  }  

  // Obtains errors array from backend using get request
  getUserError(): Observable<any>{
    return this.http.get<any>(this.errorsURL + "/" + this.authService.userData.uid);
  }
  

}
