import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtRequest } from 'src/app/models/jwtRequest';
import { JwtService } from 'src/app/service/jwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:"admin"
  password:"123"

  response:any;
  
  loginForm:FormGroup

   credentials: JwtRequest = {username: 'admin', password: '123'};

  

  constructor(private service: JwtService, private formBuilder: FormBuilder, private router:Router) { }

  ngOnInit(): void {
  
    this.createLoginForm();
    
  }
  

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      username: ['admin',   Validators.required],
      password: ['123', Validators.required],
     
    })
  }

  doLogin(){
    if(!this.loginForm.valid || this.loginForm.get('username')?.value !== 'admin' ){
      alert("Please check your all information")
      return;
     }
     
   this.credentials.username = this.loginForm.get('username')?.value
   this.credentials.password = this.loginForm.get('password')?.value; 
    let response= this.service.generateToken(this.credentials);
     console.log(response)
     response.subscribe((data: any) => {
       data = JSON.parse(data);
       localStorage.setItem('jwtToken', data.jwtToken);
       this.router.navigate(['upload']);
        //this.accessApi(data.jwtToken);
      });
  }
  

   accessApi(token:any){
   let response = this.service.upload(token);
   response.subscribe(data=>this.response=data);

   }

}
