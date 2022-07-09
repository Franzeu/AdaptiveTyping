import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  startTime: number = 60;
  interval: any;
  
  constructor() { }

  ngOnInit(): void {
  }


  startTimer() {
    this.interval = setInterval(() => {
      if(this.startTime > 0) {
        this.startTime = this.startTime - 1;
      } 
      else {
        this.startTime = 60;
      }
    },1000)
  }
  
  
}
