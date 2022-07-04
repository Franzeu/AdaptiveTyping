import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-textbox',
  templateUrl: './display-textbox.component.html',
  styleUrls: ['./display-textbox.component.css']
})
export class DisplayTextboxComponent implements OnInit {
  randomWords:string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis fringilla viverra lacinia. Praesent sed mauris vitae neque ultrices malesuada. Praesent porttitor, dui et fringilla tempus, libero tortor luctus mi, eget auctor dolor neque et ante. In ac dignissim ipsum. Quisque lacus dolor, bibendum ut aliquam a, congue a nulla. Etiam auctor vel magna et consequat. Vivamus lacinia lacus in metus."
  // the be of and a to in he have it that for they i with as not on you do but from or which one would all will there say who make when can more if
  constructor() { }

  ngOnInit(): void {
  }
  
}
