import { Component, OnInit, Input, OnChanges, SimpleChanges, DoCheck } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, DoCheck {
  startTime: number = 60;
  interval: any;
  id!: any;
  started: boolean = false;
  @Input() signalReceived!: boolean;
  
  constructor() { }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    if (this.signalReceived && !this.started) {
      this.startTimer();
      this.started = true;
    }
  }
  
  startTimer() {
    this.interval = setInterval(() => {
      if(this.startTime > 0) {
        this.startTime = this.startTime - 1;
      } 
    },1000)
  }
  
  
}
