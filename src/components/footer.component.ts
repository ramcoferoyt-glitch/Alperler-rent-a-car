
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="bg-slate-950 text-slate-400 pt-20 border-t border-slate-900 font-sans">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <!-- Brand Info -->
          <div class="col-span-1">
            <div class="flex items-center mb-6 group cursor-pointer" routerLink="/">
              <div class="w-10 h-10 bg-amber-500 text-slate-900 flex items-center justify-center font-serif font-bold text-xl mr-3 rounded-sm group-hover:bg-white transition-colors">A</div>
              <span class="text-2xl font-serif font-bold text-white tracking-tight group-hover:text-amber-500 transition-colors">ALPERLER</span>
            </div>
            <p class="text-slate-500 mb-8 leading-relaxed text-sm">
              Yüksekova'da güvenilir araç kiralama hizmetiyle hayallerinizin yol arkadaşı. Premium hizmet, güvenli yolculuk.
            </p>
          </div>

          <!-- Quick Links & Social Media -->
          <div>
            <h3 class="text-white font-bold uppercase tracking-wider text-xs mb-6 text-amber-500">Hızlı Linkler</h3>
            <ul class="space-y-3 text-sm mb-8">
              <li><a routerLink="/" class="hover:text-amber-500 transition-colors">Ana Sayfa</a></li>
              <li><a routerLink="/fleet" class="hover:text-amber-500 transition-colors">Araç Filosu</a></li>
              <li><a routerLink="/sales" class="hover:text-amber-500 transition-colors">2. El Galeri</a></li>
              <li><a routerLink="/about" class="hover:text-amber-500 transition-colors">Kurumsal</a></li>
              <li><a routerLink="/contact" class="hover:text-amber-500 transition-colors">İletişim</a></li>
            </ul>

            <!-- Social Media Icons (Updated) -->
            <div class="flex flex-wrap gap-3">
                <!-- WhatsApp -->
                <a href="https://wa.me/905379594851" target="_blank" aria-label="WhatsApp İletişim" class="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all duration-300 text-white shadow-md border border-slate-700">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                </a>
                
                <!-- Instagram -->
                <a href="https://instagram.com/" target="_blank" aria-label="Instagram Hesabımız" class="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all duration-300 text-white shadow-md border border-slate-700">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>

                <!-- X (Twitter) -->
                <a href="https://x.com/" target="_blank" aria-label="X (Twitter) Hesabımız" class="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 text-white shadow-md border border-slate-700">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>
                </a>

                <!-- YouTube -->
                <a href="https://youtube.com/" target="_blank" aria-label="YouTube Kanalımız" class="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300 text-white shadow-md border border-slate-700">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>

                <!-- TikTok -->
                <a href="https://tiktok.com/" target="_blank" aria-label="TikTok Hesabımız" class="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 text-white shadow-md border border-slate-700">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
                </a>
            </div>
          </div>

          <!-- Help Center -->
          <div>
            <h3 class="text-white font-bold uppercase tracking-wider text-xs mb-6 text-amber-500">Yardım Merkezi</h3>
            <ul class="space-y-3 text-sm">
              <li><a routerLink="/faq" class="hover:text-amber-500 transition-colors flex items-center">
                 <span class="mr-2">›</span> Sıkça Sorulan Sorular
              </a></li>
              <li><a routerLink="/blog" class="hover:text-amber-500 transition-colors flex items-center">
                 <span class="mr-2">›</span> Blog & Rehber
              </a></li>
              <li><a routerLink="/contact" class="hover:text-amber-500 transition-colors flex items-center">
                 <span class="mr-2">›</span> Öneri & Şikayet
              </a></li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h3 class="text-white font-bold uppercase tracking-wider text-xs mb-6 text-amber-500">Bize Ulaşın</h3>
            <ul class="space-y-4 text-sm">
              <li class="flex items-start">
                <svg class="w-5 h-5 text-slate-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                <span>Hakkari Yüksekova Merkez</span>
              </li>
              <li class="flex items-center">
                <svg class="w-5 h-5 text-slate-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                <a href="tel:05379594851" class="text-white font-bold hover:text-amber-500 transition-colors">0537 959 48 51</a>
              </li>
              <li class="flex items-center">
                 <svg class="w-5 h-5 text-slate-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                <span>info@alperlerrentacar.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <!-- Bottom Bar (Copyright) -->
        <div class="border-t border-slate-900 py-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600">
          <div class="flex space-x-6 mb-4 md:mb-0">
             <a routerLink="/legal/kvkk" class="hover:text-slate-400 transition-colors">KVKK</a>
             <a routerLink="/legal/privacy" class="hover:text-slate-400 transition-colors">Gizlilik Politikası</a>
             <a routerLink="/legal/cookies" class="hover:text-slate-400 transition-colors">Çerez Politikası</a>
          </div>
          <p>&copy; 2024 Alperler Rent A Car. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}
