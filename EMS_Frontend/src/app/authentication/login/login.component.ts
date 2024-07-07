import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { TokenService } from 'src/app/core/service/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private formBuilder: FormBuilder, private router: Router, private authenticationService: AuthenticationService, private tokenService: TokenService, private notificationService: NotificationService) { }

  form!: FormGroup;
  submitted = false;
  error: string | null = null;

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.authenticationService.login(this.form.value).subscribe({
      next: (response) => {
        this.tokenService.setToken(response.data);
        this.notificationService.showSuccess(response.message)
        this.router.navigate([''])
      },
      error: (error) => {
        this.error = error.error.message;
      }
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
}
