
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn = signal<boolean>(false);

  constructor(private router: Router) {
    // Check local storage for persistence across reloads
    const storedAuth = localStorage.getItem('adminAuth');
    if (storedAuth === 'true') {
      this._isLoggedIn.set(true);
    }
  }

  get isLoggedIn() {
    return this._isLoggedIn.asReadonly();
  }

  login(username: string, pass: string): boolean {
    if (!username || !pass) return false;

    const cleanUser = username.trim().toLowerCase();
    const cleanPass = pass.trim();

    // Secure credentials
    if (cleanUser === 'admin' && cleanPass === 'Alperler2024') {
      this._isLoggedIn.set(true);
      localStorage.setItem('adminAuth', 'true');
      return true;
    }
    return false;
  }

  logout() {
    this._isLoggedIn.set(false);
    localStorage.removeItem('adminAuth');
    this.router.navigate(['/admin/login']);
  }
  
  // Simulated Password Reset
  resetPassword(email: string): string | null {
     if(email && email.includes('@')) {
        return 'Alperler2024'; // In a real app, this would email a token.
     }
     return null;
  }
}
