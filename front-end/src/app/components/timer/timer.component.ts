import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  startTime: number = 60;
  interval: any;
  @Input() signalReceived!: boolean;
  
  constructor() { }

  ngOnInit(): void {
  }

  
  startTimer() {
    console.log(this.signalReceived);
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
