import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
@Component({
  selector: 'app-lin-header',
  templateUrl: './lin-header.component.html',
  styleUrls: ['./lin-header.component.css']
})
export class LinHeaderComponent implements OnInit {
  title: string = "AdaptiveTyping"
  icon: string = "⌨️"
  
  constructor(public authService: AuthService) {}
  ngOnInit(): void {
  }

}
