import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})

// Imports AuthService to the component
export class VerifyEmailComponent implements OnInit {
  title: string = "AdaptiveTyping"
  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(){
  }

}
