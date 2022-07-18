import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
@Component({
  selector: 'app-forgot-passwords',
  templateUrl: './forgot-passwords.component.html',
  styleUrls: ['./forgot-passwords.component.css']
})
export class ForgotPasswordsComponent implements OnInit {
  title: string = "AdaptiveTyping"
  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {
  }

}
