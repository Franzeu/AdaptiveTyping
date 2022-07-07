import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Input() target!: String;

  start() {
    console.log("start");
  }

  setTarget(target: String) {
    this.target = target;
    
  }
}
