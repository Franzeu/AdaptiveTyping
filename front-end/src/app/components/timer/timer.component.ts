import { Component, OnInit, Input, DoCheck, Output, EventEmitter } from '@angular/core';

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
  @Input() testDone: boolean = false;
  @Output() endTimeEvent = new EventEmitter<number>();
  
  constructor() { }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    if (this.signalReceived && !this.started) {
      this.startTimer();
      this.started = true;
    }
    if (this.testDone || this.startTime === 0) {
      clearInterval(this.id);
      this.endTimeEvent.emit(this.startTime);
    }
  }
  
  startTimer() {
    this.id = this.interval = setInterval(() => {
      if(this.startTime > 0) {
        this.startTime = this.startTime - 1;
      } 
    },1000)
  }
  
  
}
