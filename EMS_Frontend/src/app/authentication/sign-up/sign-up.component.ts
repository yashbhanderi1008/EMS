import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { NotificationService } from 'src/app/core/service/notification.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  constructor(private formBuilder: FormBuilder, private router: Router, private authenticationService: AuthenticationService, private notificationService: NotificationService) { }

  form!: FormGroup;
  submitted = false;
  error: string | null = null;

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$')]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);
    

    this.authenticationService.signUp(this.form.value).subscribe({
      next: (res) => {
        this.notificationService.showSuccess(res.message)
        this.router.navigate(['/login'])
      },
      error: (error) => {
        this.error = error.message
      }
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
}
