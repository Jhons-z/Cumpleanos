import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private http = inject(HttpClient);

    // Llama a la función de Cloudflare
    async login(usuario: string, password: string): Promise<boolean> {
        try {
            const res: any = await firstValueFrom(
                this.http.post('/api/login', { usuario, password })
            );
            if (res.success) {
                localStorage.setItem('auth', res.token);
                return true;
            }
            return false;
        } catch (e) {
            return false;
        }
    }

    estaAutenticado(): boolean {
        return !!localStorage.getItem('auth');
    }
}