
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-slate-900 flex items-center justify-center font-sans px-4 relative overflow-hidden">
      <!-- Decorative circles -->
      <div class="absolute top-0 left-0 w-64 h-64 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div class="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      
      <div class="bg-white p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-md relative z-10">
         <div class="text-center mb-8">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-slate-900 text-amber-500 rounded-lg font-serif font-bold text-3xl mb-4 shadow-lg border border-slate-800">A</div>
            <h2 class="text-2xl font-bold text-slate-900">Yönetici Girişi</h2>
            <p class="text-slate-500 text-sm">Güvenli Yönetim Paneli</p>
         </div>

         <!-- LOGIN FORM -->
         @if (!showForgotPass) {
             <form (submit)="onLogin($event)" class="space-y-6">
                <div>
                   <label class="block text-xs font-bold text-slate-600 uppercase mb-2">Kullanıcı Adı</label>
                   <input 
                     type="text" 
                     [(ngModel)]="username" 
                     (input)="clearError()" 
                     name="username" 
                     class="w-full p-4 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none font-bold text-slate-900 transition-all" 
                     placeholder="Kullanıcı adınızı giriniz"
                     autocomplete="username">
                </div>
                <div>
                   <label class="block text-xs font-bold text-slate-600 uppercase mb-2">Şifre</label>
                   <input 
                     type="password" 
                     [(ngModel)]="password" 
                     (input)="clearError()" 
                     name="password" 
                     class="w-full p-4 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none font-bold text-slate-900 transition-all" 
                     placeholder="••••••"
                     autocomplete="current-password">
                </div>

                @if (errorMsg()) {
                  <div class="bg-red-50 text-red-600 text-sm p-4 rounded-lg border border-red-200 text-center font-bold flex items-center justify-center animate-shake">
                     <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                     {{ errorMsg() }}
                  </div>
                }

                <button type="submit" class="w-full py-4 bg-slate-900 hover:bg-amber-500 hover:text-slate-900 text-white font-bold rounded-lg transition-all uppercase tracking-widest shadow-lg flex justify-center items-center group">
                   Giriş Yap
                   <svg class="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </button>
             </form>

             <div class="mt-6 flex justify-between items-center text-sm">
                <button (click)="toggleForgot()" class="text-slate-500 hover:text-slate-800 font-semibold">Şifremi Unuttum</button>
                <a href="/" class="text-slate-400 hover:text-slate-600">← Siteye Dön</a>
             </div>
         } @else {
             <!-- FORGOT PASS FORM -->
             <div class="space-y-6 animate-fade-in">
                 <div class="text-center text-sm text-slate-600">
                    <p>Lütfen kayıtlı e-posta adresinizi girin. Size yeni şifre oluşturma talimatı göndereceğiz.</p>
                 </div>
                 <div>
                     <label class="block text-xs font-bold text-slate-600 uppercase mb-2">E-Posta Adresi</label>
                     <input 
                       type="email" 
                       [(ngModel)]="resetEmail" 
                       class="w-full p-4 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none font-bold text-slate-900" 
                       placeholder="ornek@mail.com">
                 </div>
                 
                 @if(resetMsg()) {
                    <div class="bg-green-50 text-green-700 p-4 rounded border border-green-200 text-center text-sm font-bold">
                       {{ resetMsg() }}
                    </div>
                 }

                 <button (click)="doReset()" class="w-full py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg transition-all uppercase tracking-widest shadow-lg">
                    Şifre Sıfırla
                 </button>
                 
                 <button (click)="toggleForgot()" class="w-full py-2 text-slate-500 hover:text-slate-800 font-bold text-sm">
                    Giriş Ekranına Dön
                 </button>
             </div>
         }
      </div>
    </div>
  `
})
export class AdminLoginComponent {
  authService = inject(AuthService);
  router = inject(Router);

  username = '';
  password = '';
  errorMsg = signal('');
  
  showForgotPass = false;
  resetEmail = '';
  resetMsg = signal('');

  clearError() {
    this.errorMsg.set('');
  }

  onLogin(e: Event) {
    e.preventDefault();
    
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.errorMsg.set('Hatalı kullanıcı adı veya şifre!');
    }
  }

  toggleForgot() {
      this.showForgotPass = !this.showForgotPass;
      this.resetMsg.set('');
  }

  doReset() {
      const newPass = this.authService.resetPassword(this.resetEmail);
      if(newPass) {
          this.resetMsg.set(`Şifreniz sıfırlandı. Geçici Şifreniz: ${newPass}`);
      } else {
          this.errorMsg.set('Geçersiz e-posta adresi.');
      }
  }
}
