import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  submitted: boolean;
    userName:any;
    isAuthenticated;
    myForm: any;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthServiceService,
    private toastr: ToastrService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  this.checkAuthentication();   
}

onSubmit() {
  this.submitted = true;
    if (this.loginForm.invalid) {
      return;
  }
  if(this.auth.login(this.loginForm.controls.userName.value,this.loginForm.controls.password.value)){
    this.toastr.success('successfully logged in');
    this.userName = this.auth.getUserName();
    this.router.navigate(['/admin/product-list']);
  } 
  else{
    this.toastr.error('Invalid Credential')
  }
   this.checkAuthentication();
   
}

checkAuthentication(){
  this.isAuthenticated = this.auth.isAuthenticated();
}
}
