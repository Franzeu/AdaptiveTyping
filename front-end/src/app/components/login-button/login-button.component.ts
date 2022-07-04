import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.css']
})
export class LoginButtonComponent implements OnInit {
  text:string = "Login"
  constructor() { }

  ngOnInit(): void {
  }

}
