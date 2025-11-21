
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

  async login(username: string, pass: string): Promise<boolean> {
    // Simulate network delay for realism
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (!username || !pass) return false;

    // Normalize inputs
    const cleanUser = username.trim().toLowerCase();
    const cleanPass = pass.trim();

    // Credentials match the prompt requirements
    const VALID_EMAIL = 'ishak595@gmail.com';
    const VALID_PASS = 'i4h4k5a2p7r7';

    if (cleanUser === VALID_EMAIL && cleanPass === VALID_PASS) {
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
  
  async resetPassword(email: string): Promise<boolean> {
     await new Promise(resolve => setTimeout(resolve, 1500));
     // Simulate success for any valid looking email
     if(email && email.includes('@')) {
        return true;
     }
     return false;
  }
}
