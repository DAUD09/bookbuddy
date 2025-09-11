import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService) {}

  async onSignup() {
    this.errorMessage = '';
    this.successMessage = '';
    try {
      await this.authService.signup(this.email, this.password);
      this.successMessage = 'Signup successful! 🎉 You can now log in,';
      this.email = '';
      this.password = '';
    } catch (err: any) {
      this.errorMessage = err.errorMessage;
    }
  }
}
