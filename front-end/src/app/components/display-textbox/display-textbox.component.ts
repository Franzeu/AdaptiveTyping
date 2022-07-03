import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-textbox',
  templateUrl: './display-textbox.component.html',
  styleUrls: ['./display-textbox.component.css']
})
export class DisplayTextboxComponent implements OnInit {
  randomWords:string = "the be of and a to in he have it that for they i with as not on you do but from or which one would all will there say who make when can more if "
  constructor() { }

  ngOnInit(): void {
  }
  
}
