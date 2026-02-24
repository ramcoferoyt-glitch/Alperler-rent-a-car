
import { Injectable, signal, computed } from '@angular/core';

export type Language = 'TR' | 'EN';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  // --- OVERLAY STATES ---
  isAboutOpen = signal(false);
  isContactOpen = signal(false);
  isLegalOpen = signal(false);
  legalType = signal<'kvkk' | 'privacy' | 'cookies' | 'terms'>('terms');

  // --- LANGUAGE STATE ---
  currentLang = signal<Language>('TR');

  // --- ACTIONS ---
  toggleAbout(isOpen: boolean) { this.isAboutOpen.set(isOpen); }
  toggleContact(isOpen: boolean) { this.isContactOpen.set(isOpen); }
  
  openLegal(type: 'kvkk' | 'privacy' | 'cookies' | 'terms') {
    this.legalType.set(type);
    this.isLegalOpen.set(true);
  }
  closeLegal() { this.isLegalOpen.set(false); }

  toggleLanguage() {
    this.currentLang.update(l => l === 'TR' ? 'EN' : 'TR');
  }

  // --- TRANSLATIONS ---
  // A simple dictionary for key UI elements
  private tr = {
    nav: { home: 'Ana Sayfa', fleet: 'Araç Filosu', sales: '2. El Satış', about: 'Hakkımızda', contact: 'İletişim', blog: 'Blog' },
    hero: { title: 'Yüksekova\'nın Lider Araç Kiralama Şirketi', subtitle: 'Güvenli, konforlu ve premium araç kiralama deneyimi.', cta: 'Hemen Kirala' },
    buttons: { close: 'Kapat', book: 'Rezervasyon Yap', details: 'Detaylar', call: 'Hemen Ara' },
    footer: { rights: 'Tüm hakları saklıdır.', support: '7/24 Canlı Destek' }
  };

  private en = {
    nav: { home: 'Home', fleet: 'Fleet', sales: 'Car Sales', about: 'About Us', contact: 'Contact', blog: 'Blog' },
    hero: { title: 'Leading Car Rental in Yüksekova', subtitle: 'Safe, comfortable and premium car rental experience.', cta: 'Rent Now' },
    buttons: { close: 'Close', book: 'Book Now', details: 'Details', call: 'Call Now' },
    footer: { rights: 'All rights reserved.', support: '24/7 Live Support' }
  };

  translations = computed(() => this.currentLang() === 'TR' ? this.tr : this.en);
}
