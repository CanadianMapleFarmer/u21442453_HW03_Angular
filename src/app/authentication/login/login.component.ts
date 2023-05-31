import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hasValidToken: boolean = false;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private data: DataService,
    public fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
    this.ValidToken();
  }

  async OnSubmit(): Promise<void> {
    let email = this.loginForm.get('email')?.value;
    let pass = this.loginForm.get('password')?.value;

    await this.data.Login(email, pass).subscribe(async (res) => {
      await console.log(res);
      if (res.status != 'error') {
        await localStorage.setItem('AuthToken', res.token);
        await window.location.reload();
        this.router.navigate(['/product']);
      } else {
        this.router.navigate(['/login']);
        this.snackBar.open('Login failed, please try again', 'Ok', {
          duration: 3000,
        });
      }
    });
  }

  async ValidToken(): Promise<void> {
    let currToken = localStorage.getItem('AuthToken');
    if (currToken == undefined || null || '') return;
    await this.data.CheckToken(currToken).subscribe((result) => {
      // console.log(result.tokenValid);
      this.hasValidToken = result.tokenValid;
      if (this.hasValidToken) {
        this.router.navigate(['']);
        this.router.navigate(['/product']);
      }
    });
  }
}
