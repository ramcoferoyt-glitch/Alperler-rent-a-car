
import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarService, FaqItem } from '../../services/car.service';
import { SiteConfig } from '../../models/site-config.model';

@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h1 class="text-3xl font-bold text-slate-900 mb-8">Genel Site Ayarları</h1>
    
    <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-8 max-w-4xl">
        
        @if(saveSuccess()) {
           <div class="bg-green-100 text-green-800 p-4 rounded-lg mb-6 text-center font-bold animate-fade-in">
               Ayarlar başarıyla kaydedildi ve web sitesinde güncellendi!
           </div>
        }

        <form (submit)="saveConfig($event)" class="space-y-8">
           
           <!-- Contact Info -->
           <div class="space-y-4">
              <h3 class="font-bold text-lg border-b pb-2 text-slate-700">İletişim Bilgileri</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                     <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Şirket Adı</label>
                     <input [(ngModel)]="formConfig.companyName" name="companyName" class="w-full p-3 bg-slate-50 border rounded font-bold">
                  </div>
                  <div>
                     <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Telefon</label>
                     <input [(ngModel)]="formConfig.phone" name="phone" class="w-full p-3 bg-slate-50 border rounded font-bold">
                  </div>
                  <div>
                     <label class="block text-xs font-bold text-slate-500 uppercase mb-1">E-Posta</label>
                     <input [(ngModel)]="formConfig.email" name="email" class="w-full p-3 bg-slate-50 border rounded">
                  </div>
                  <div>
                     <label class="block text-xs font-bold text-slate-500 uppercase mb-1">WhatsApp (Sadece Numara)</label>
                     <input [(ngModel)]="formConfig.whatsapp" name="whatsapp" class="w-full p-3 bg-slate-50 border rounded">
                  </div>
                  <div class="md:col-span-2">
                     <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Adres</label>
                     <input [(ngModel)]="formConfig.address" name="address" class="w-full p-3 bg-slate-50 border rounded">
                  </div>
              </div>
           </div>

           <!-- Social Media -->
           <div class="space-y-4">
              <h3 class="font-bold text-lg border-b pb-2 text-slate-700">Sosyal Medya Linkleri</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                     <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Instagram URL</label>
                     <input [(ngModel)]="formConfig.instagramUrl" name="instagram" class="w-full p-3 bg-slate-50 border rounded">
                  </div>
                  <div>
                     <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Twitter (X) URL</label>
                     <input [(ngModel)]="formConfig.twitterUrl" name="twitter" class="w-full p-3 bg-slate-50 border rounded">
                  </div>
                  <div>
                     <label class="block text-xs font-bold text-slate-500 uppercase mb-1">YouTube URL</label>
                     <input [(ngModel)]="formConfig.youtubeUrl" name="youtube" class="w-full p-3 bg-slate-50 border rounded">
                  </div>
                  <div>
                     <label class="block text-xs font-bold text-slate-500 uppercase mb-1">TikTok URL</label>
                     <input [(ngModel)]="formConfig.tiktokUrl" name="tiktok" class="w-full p-3 bg-slate-50 border rounded">
                  </div>
              </div>
           </div>

           <!-- Content -->
           <div class="space-y-4">
              <h3 class="font-bold text-lg border-b pb-2 text-slate-700">Site İçeriği</h3>
              <div>
                 <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Alt Bilgi (Footer) Yazısı</label>
                 <input [(ngModel)]="formConfig.footerText" name="footerText" class="w-full p-3 bg-slate-50 border rounded">
              </div>
              <div>
                 <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Hakkımızda Başlığı</label>
                 <input [(ngModel)]="formConfig.aboutTitle" name="aboutTitle" class="w-full p-3 bg-slate-50 border rounded font-bold">
              </div>
              <div>
                 <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Hakkımızda Metni</label>
                 <textarea [(ngModel)]="formConfig.aboutText" name="aboutText" rows="8" class="w-full p-3 bg-slate-50 border rounded"></textarea>
              </div>
           </div>

           <!-- FAQ Management -->
           <div class="space-y-4">
              <h3 class="font-bold text-lg border-b pb-2 text-slate-700">Sıkça Sorulan Sorular (SSS)</h3>
              
              <div class="space-y-4">
                  @for (faq of faqs(); track faq.id) {
                      <div class="bg-slate-50 p-4 rounded border border-slate-200">
                          <input [(ngModel)]="faq.question" [ngModelOptions]="{standalone: true}" (change)="updateFaq(faq)" class="w-full font-bold bg-transparent border-b border-slate-300 mb-2 focus:outline-none focus:border-amber-500" placeholder="Soru">
                          <textarea [(ngModel)]="faq.answer" [ngModelOptions]="{standalone: true}" (change)="updateFaq(faq)" rows="2" class="w-full bg-transparent text-sm text-slate-600 focus:outline-none" placeholder="Cevap"></textarea>
                          <div class="text-right mt-2">
                              <button type="button" (click)="deleteFaq(faq.id)" class="text-red-500 text-xs font-bold hover:underline">Sil</button>
                          </div>
                      </div>
                  }
              </div>

              <div class="bg-slate-50 p-4 rounded border border-slate-200 border-dashed">
                  <h4 class="font-bold text-sm text-slate-900 mb-2">Yeni Soru Ekle</h4>
                  <input [(ngModel)]="newFaq.question" name="newQuestion" class="w-full p-2 bg-white border rounded mb-2 text-sm" placeholder="Soru">
                  <textarea [(ngModel)]="newFaq.answer" name="newAnswer" rows="2" class="w-full p-2 bg-white border rounded mb-2 text-sm" placeholder="Cevap"></textarea>
                  <button type="button" (click)="addFaq()" class="bg-slate-900 text-white px-4 py-2 rounded text-xs font-bold hover:bg-amber-500 hover:text-slate-900 transition-colors">Ekle</button>
              </div>
           </div>

           <button type="submit" class="w-full py-4 bg-slate-900 hover:bg-amber-500 hover:text-slate-900 text-white font-bold rounded-lg uppercase tracking-widest transition-colors shadow-lg text-sm">
               Ayarları Kaydet ve Yayınla
           </button>

        </form>
    </div>
  `
})
export class AdminSettingsComponent {
  carService = inject(CarService);
  currentConfig = this.carService.getConfig();
  faqs = this.carService.getFaqs();
  
  formConfig: SiteConfig = { ...this.currentConfig() };
  saveSuccess = signal(false);
  
  newFaq: Partial<FaqItem> = {};

  constructor() {
    effect(() => {
      // Sync form when signal changes from outside (initial load)
      this.formConfig = { ...this.currentConfig() };
    });
  }

  saveConfig(event: Event) {
      event.preventDefault();
      this.carService.updateConfig(this.formConfig);
      this.saveSuccess.set(true);
      setTimeout(() => this.saveSuccess.set(false), 3000);
  }

  addFaq() {
      if(this.newFaq.question && this.newFaq.answer) {
          this.carService.addFaq(this.newFaq as FaqItem);
          this.newFaq = {};
      }
  }

  deleteFaq(id: number) {
      if(confirm('Silmek istediğinize emin misiniz?')) {
          this.carService.deleteFaq(id);
      }
  }

  updateFaq(faq: FaqItem) {
      this.carService.addFaq(faq);
  }
}
