import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true,
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  errorLogin = false;

  // Formulario con validación: La contraseña debe empezar con mayúscula ^[A-Z]
  loginForm = this.fb.group({
    correo: ['', Validators.required], // Se muestra como correo, pero internamente es el usuario
    password: ['', [Validators.required, Validators.pattern('^[A-Z].*$')]]
  });

  async iniciarSesion() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { correo, password } = this.loginForm.value;
    const exito = await this.authService.login(correo!, password!);

    if (exito) {
      this.router.navigate(['/cumpleanos']);
    } else {
      this.errorLogin = true;
    }
  }
}
