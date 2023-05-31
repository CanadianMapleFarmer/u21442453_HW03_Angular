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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
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
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  async OnSubmit(): Promise<void> {
    let email = this.registerForm.get('email')?.value;
    let pass = this.registerForm.get('password')?.value;

    await this.data.Register(email, pass).subscribe(async (res) => {
      await console.log(res);
      if (res.succeeded == true) {
        this.router.navigate(['/login']);
        this.snackBar.open('Registered Successfully!', 'Ok', {
          duration: 3000,
        });
      } else {
        this.router.navigate(['/register']);
        this.snackBar.open('Registration failed, please try again.', 'Ok', {
          duration: 3000,
        });
      }
    });
  }
}
