import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import {LoginService} from './login.service'
import {User} from '../shared/models/user'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private loginService:LoginService,  private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  get form() { return this.loginForm.controls; }

  LoginCheck():void {

    let formData:User = {
      PKID:0,
      UserName:this.form.username.value,
      Password:this.form.password.value
    }

    console.log(formData);

    this.loginService.LoginFromAPI(formData)
    .subscribe(
      (data) => console.log(data),
      (err:any) => console.log(err)
    )
  }

}
