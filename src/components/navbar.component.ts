
import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="fixed top-0 z-50 w-full transition-all duration-300 bg-slate-900/95 backdrop-blur-md border-b border-white/5 shadow-2xl">
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20 md:h-24">
          <!-- Logo -->
          <div class="flex-shrink-0 flex items-center cursor-pointer group" routerLink="/">
            <div class="w-10 h-10 md:w-12 md:h-12 bg-amber-500 rounded-sm flex items-center justify-center mr-3 md:mr-4 shadow-[0_0_15px_rgba(245,158,11,0.3)] group-hover:bg-white transition-all duration-500">
              <span class="text-slate-900 font-serif text-2xl md:text-3xl italic font-bold group-hover:text-amber-500 transition-colors">A</span>
            </div>
            <div class="flex flex-col justify-center">
              <span class="font-serif font-bold text-xl md:text-2xl text-white tracking-tight leading-none group-hover:text-amber-500 transition-colors">ALPERLER</span>
              <span class="text-[0.5rem] md:text-[0.6rem] text-slate-400 font-bold tracking-[0.35em] uppercase mt-1 text-justify w-full">Rent A Car</span>
            </div>
          </div>

          <!-- Desktop Menu -->
          <div class="hidden lg:flex items-center space-x-8 lg:space-x-12">
            <a routerLink="/" routerLinkActive="text-amber-500 border-b-2 border-amber-500" [routerLinkActiveOptions]="{exact: true}" class="text-slate-300 hover:text-white font-medium text-xs uppercase tracking-widest transition-all duration-300 py-2">Ana Sayfa</a>
            <a routerLink="/fleet" routerLinkActive="text-amber-500 border-b-2 border-amber-500" class="text-slate-300 hover:text-white font-medium text-xs uppercase tracking-widest transition-all duration-300 py-2">Kiralık Filo</a>
            <a routerLink="/sales" routerLinkActive="text-amber-500 border-b-2 border-amber-500" class="text-amber-400 hover:text-amber-200 font-bold text-xs uppercase tracking-widest transition-all duration-300 py-2 flex items-center">
              <span class="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2 animate-pulse"></span>
              2. El Galeri
            </a>
            <a routerLink="/about" routerLinkActive="text-amber-500 border-b-2 border-amber-500" class="text-slate-300 hover:text-white font-medium text-xs uppercase tracking-widest transition-all duration-300 py-2">Kurumsal</a>
            <a routerLink="/contact" routerLinkActive="text-amber-500 border-b-2 border-amber-500" class="text-slate-300 hover:text-white font-medium text-xs uppercase tracking-widest transition-all duration-300 py-2">İletişim</a>
          </div>

          <!-- Right Side Icons -->
          <div class="hidden lg:flex items-center space-x-4">
             
             <!-- Fav Icon -->
             <div class="relative group cursor-pointer p-2">
                <svg class="w-6 h-6 text-slate-300 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                @if (favCount() > 0) {
                  <span class="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">{{ favCount() }}</span>
                }
             </div>

             <a routerLink="/fleet" class="bg-white hover:bg-amber-500 text-slate-900 px-6 py-3 rounded-sm font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg border border-transparent hover:border-amber-600 hover:shadow-amber-500/20 ml-2">
              Rezervasyon
            </a>
          </div>

          <!-- Mobile Menu Button -->
          <div class="lg:hidden flex items-center gap-4">
            <!-- Mobile Fav Icon -->
            <div class="relative group cursor-pointer" routerLink="/fleet">
                <svg class="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                @if (favCount() > 0) {
                  <span class="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-bold w-3 h-3 flex items-center justify-center rounded-full">{{ favCount() }}</span>
                }
            </div>

            <button (click)="toggleMenu()" class="text-white hover:text-amber-500 focus:outline-none p-2 transition-colors">
              <svg class="h-8 w-8" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                @if (!isMenuOpen()) {
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16" />
                } @else {
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
                }
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Menu Dropdown -->
      @if (isMenuOpen()) {
        <div class="lg:hidden bg-slate-900/98 backdrop-blur-xl border-t border-white/10 absolute w-full shadow-2xl z-40 h-[calc(100vh-80px)] animate-fade-in-down overflow-y-auto">
          <div class="px-6 py-8 space-y-6 flex flex-col items-center text-center">
            <a (click)="closeMenu()" routerLink="/" class="text-2xl font-serif text-slate-300 hover:text-amber-500 py-2 w-full border-b border-white/5">Ana Sayfa</a>
            <a (click)="closeMenu()" routerLink="/fleet" class="text-2xl font-serif text-slate-300 hover:text-amber-500 py-2 w-full border-b border-white/5">Kiralık Araçlar</a>
            <a (click)="closeMenu()" routerLink="/sales" class="text-2xl font-serif text-amber-500 font-bold py-2 w-full border-b border-white/5">2. El Galeri</a>
            <a (click)="closeMenu()" routerLink="/about" class="text-2xl font-serif text-slate-300 hover:text-amber-500 py-2 w-full border-b border-white/5">Kurumsal</a>
            <a (click)="closeMenu()" routerLink="/contact" class="text-2xl font-serif text-slate-300 hover:text-amber-500 py-2 w-full border-b border-white/5">İletişim</a>
            
            <div class="mt-8 w-full">
                <a (click)="closeMenu()" routerLink="/fleet" class="block w-full bg-amber-500 text-slate-900 font-bold py-4 rounded-lg shadow-lg text-lg uppercase tracking-widest">
                    Hemen Kirala
                </a>
            </div>
          </div>
        </div>
      }
    </nav>
  `
})
export class NavbarComponent {
  carService = inject(CarService);
  isMenuOpen = signal(false);
  
  favCount = this.carService.getFavoriteCount;

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }
}
