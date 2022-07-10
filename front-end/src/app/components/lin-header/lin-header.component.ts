import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lin-header',
  templateUrl: './lin-header.component.html',
  styleUrls: ['./lin-header.component.css']
})
export class LinHeaderComponent implements OnInit {
  title: string = "AdaptiveTyping"
  icon: string = "⌨️"

  constructor() { }

  ngOnInit(): void {
  }

}
