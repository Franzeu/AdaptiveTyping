import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-refresh',
  templateUrl: './refresh.component.html',
  styleUrls: ['./refresh.component.css']
})
export class RefreshComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  // Refreshes the typing test page
  reloadCurrentPage() {
    window.location.reload();
  }

}
