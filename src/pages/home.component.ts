
import { Component, inject, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CarService } from '../services/car.service';
import { Car } from '../models/car.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage, FormsModule],
  template: `
    <!-- Hero Section -->
    <div class="relative h-[85vh] min-h-[600px] flex flex-col items-center justify-center overflow-hidden group">
      <!-- Background Image -->
      <div class="absolute inset-0 z-0">
         <img ngSrc="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop" fill priority alt="Yüksekova Alperler" class="object-cover brightness-75">
         <div class="absolute inset-0 bg-black/40"></div>
      </div>
      
      <!-- Hero Content (User's Text) -->
      <div class="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center -mt-16">
        <div class="animate-fade-in-up space-y-6">
          <span class="inline-block py-2 px-4 md:px-6 bg-amber-500 text-slate-900 rounded-full text-xs md:text-sm font-extrabold tracking-wider uppercase mb-2 shadow-lg">
            Yüksekova'nın #1 Araç Kiralama Şirketi
          </span>
          
          <h1 class="font-serif text-4xl md:text-7xl font-bold text-white drop-shadow-lg leading-tight">
            HAYALLERİNİZİN<br>
            <span class="text-amber-400">YOL ARKADAŞI!</span>
          </h1>
          
          <p class="text-base md:text-xl text-white/95 max-w-3xl mx-auto font-medium drop-shadow-md leading-relaxed px-4">
            Yüksekova'da araç kiralama deneyiminizi bambaşka bir boyuta taşıyoruz. Dağların arasında kaybolurken, şehrin kalabalığında yol alırken ya da iş seyahatinizde güvenin, rahatlığın ve konforun adresi yanınızda.
          </p>

          <div class="pt-4">
              <button (click)="scrollToBooking()" class="bg-white text-slate-900 hover:bg-amber-500 hover:text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl transform hover:scale-105">
                  Hemen Rezervasyon Yap
              </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Booking Engine -->
    <div id="bookingArea" class="relative z-20 max-w-6xl mx-auto px-4 -mt-24 mb-16">
        <div class="bg-white rounded-xl shadow-2xl p-6 md:p-8 border-b-4 border-amber-500">
            <h3 class="text-slate-800 font-bold text-lg mb-6 flex items-center border-b border-slate-100 pb-4">
                <svg class="w-6 h-6 text-amber-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                Müsait Araçları Sorgula
            </h3>
            <form (submit)="searchCars($event)" class="grid grid-cols-1 md:grid-cols-5 gap-4">
                
                <!-- Hizmet Türü (Dropdown) -->
                <div class="space-y-1 md:col-span-1">
                    <label class="text-xs font-bold text-slate-500 uppercase tracking-wide">Kiralama Türü</label>
                    <div class="relative">
                        <select [(ngModel)]="serviceType" name="serviceType" class="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg px-3 py-3 focus:ring-2 focus:ring-amber-500 outline-none text-sm font-bold appearance-none cursor-pointer">
                            <option value="individual">Bireysel (Şoförsüz)</option>
                            <option value="driver">Şoförlü Tahsis</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>

                <div class="space-y-1 md:col-span-1">
                    <label class="text-xs font-bold text-slate-500 uppercase tracking-wide">Teslim Yeri</label>
                    <div class="relative">
                        <select [(ngModel)]="pickupLocation" name="location" class="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg px-3 py-3 focus:ring-2 focus:ring-amber-500 outline-none text-sm font-bold appearance-none cursor-pointer">
                            <option value="merkez">Yüksekova Merkez</option>
                            <option value="havalimani">Selahaddin Eyyubi Hvl.</option>
                            <option value="otogar">Otogar</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>
                <div class="space-y-1 md:col-span-1">
                    <label class="text-xs font-bold text-slate-500 uppercase tracking-wide">Alış Tarihi</label>
                    <input type="date" [(ngModel)]="pickupDate" name="startDate" class="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg px-3 py-3 focus:ring-2 focus:ring-amber-500 outline-none text-sm font-bold">
                </div>
                <div class="space-y-1 md:col-span-1">
                    <label class="text-xs font-bold text-slate-500 uppercase tracking-wide">Dönüş Tarihi</label>
                    <input type="date" [(ngModel)]="returnDate" name="endDate" class="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg px-3 py-3 focus:ring-2 focus:ring-amber-500 outline-none text-sm font-bold">
                </div>
                <div class="flex items-end md:col-span-1">
                    <button type="submit" class="w-full bg-slate-900 hover:bg-amber-500 hover:text-white text-white font-bold h-[46px] rounded-lg transition-all uppercase tracking-wider text-xs shadow-lg flex items-center justify-center">
                        ARAÇLARI LİSTELE
                        <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- Featured Vehicles -->
    <section class="py-16 bg-slate-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                <div>
                    <h2 class="text-3xl font-serif font-bold text-slate-900">Öne Çıkan Filomuz</h2>
                    <p class="text-slate-500 mt-2">SUV, Pikap ve Sedan seçenekleriyle her yola hazırız.</p>
                </div>
                <a routerLink="/fleet" class="inline-flex items-center text-slate-900 font-bold hover:text-amber-600 transition-colors border-b-2 border-amber-500 pb-1">
                    Tüm Araçları İncele <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </a>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                @for(car of featuredCars(); track car.id) {
                    <div class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group border border-slate-100 overflow-hidden relative" (click)="goToFleet(car.type)">
                        <div class="h-64 overflow-hidden relative bg-slate-100">
                             <img [src]="car.image" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500">
                             <div class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-900/90 to-transparent p-4 pt-12">
                                 <div class="flex justify-between items-end">
                                     <span class="text-white font-bold text-xl">{{car.brand}} {{car.model}}</span>
                                     <span class="bg-amber-500 text-slate-900 text-xs font-bold px-2 py-1 rounded">{{car.year}} Model</span>
                                 </div>
                             </div>
                        </div>
                        <div class="p-5">
                            <div class="flex justify-between items-center mb-4">
                                <span class="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">{{car.type}}</span>
                                <div class="text-right">
                                    <span class="block font-bold text-slate-900 text-xl">{{car.price}} ₺ <span class="text-xs text-slate-400 font-normal">/gün</span></span>
                                </div>
                            </div>
                            <div class="flex justify-between text-xs text-slate-500 border-t border-slate-100 pt-4 mb-4">
                                <span class="flex items-center font-medium"><svg class="w-4 h-4 mr-1 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg> {{car.seats}} Kişi</span>
                                <span class="flex items-center font-medium"><svg class="w-4 h-4 mr-1 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg> {{car.transmission}}</span>
                                <span class="flex items-center font-medium"><svg class="w-4 h-4 mr-1 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg> {{car.fuel}}</span>
                            </div>

                            <button (click)="rentCar($event, car)" class="w-full bg-slate-900 hover:bg-amber-500 hover:text-slate-900 text-white font-bold py-3 rounded transition-colors shadow-md flex items-center justify-center relative z-10">
                                Hemen Kirala
                                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                            </button>
                        </div>
                    </div>
                }
            </div>
        </div>
    </section>

    <!-- Why Us? (User's Specific Text) -->
    <section class="py-20 bg-slate-50 border-t border-slate-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-3xl mx-auto text-center mb-16">
                <h2 class="text-4xl font-serif font-bold text-slate-900 mb-6">Neden Alperler Rent A Car?</h2>
                <p class="text-lg text-slate-600 leading-relaxed">
                    İlk seferde değil, her seferde tercihiniz olmak için buradayız. Çünkü biz, sadece anahtar teslim etmiyoruz, size yepyeni bir deneyimin kapılarını aralıyoruz.
                </p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div class="text-center p-8 bg-white rounded-2xl hover:shadow-lg transition-all duration-300 group">
                    <div class="w-20 h-20 bg-slate-50 shadow-md text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                    </div>
                    <h3 class="font-bold text-xl text-slate-900 mb-3">Güven ve Kasko</h3>
                    <p class="text-slate-500 text-sm leading-relaxed">
                       Tam kaskolu, yetkili servis bakımlı araçlar. Sürpriz masraf yok, tam güvence var.
                    </p>
                </div>
                
                <div class="text-center p-8 bg-white rounded-2xl hover:shadow-lg transition-all duration-300 group">
                    <div class="w-20 h-20 bg-slate-50 shadow-md text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                         <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    </div>
                    <h3 class="font-bold text-xl text-slate-900 mb-3">7/24 Canlı Destek</h3>
                    <p class="text-slate-500 text-sm leading-relaxed">
                       Yolculuğunuzun her anında yanınızdayız. Bize 0537 959 48 51 numaralı hattan her an ulaşabilirsiniz.
                    </p>
                </div>

                <div class="text-center p-8 bg-white rounded-2xl hover:shadow-lg transition-all duration-300 group">
                    <div class="w-20 h-20 bg-slate-50 shadow-md text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    </div>
                    <h3 class="font-bold text-xl text-slate-900 mb-3">Konforlu Yolculuk</h3>
                    <p class="text-slate-500 text-sm leading-relaxed">
                       Her teslimat öncesi detaylı temizlik. Yeni model araçlarla maksimum konfor.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Partner (Rent Your Car) - Extended Form -->
    <section id="partnerForm" class="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="bg-slate-800/50 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <div>
                        <h2 class="font-serif text-3xl md:text-4xl font-bold text-white mb-6">Aracınızı Bize Kiralayın</h2>
                        <p class="text-slate-300 mb-8 text-lg leading-relaxed">
                            Aracınız yatarak değil, çalışarak kazandırsın. Alperler güvencesiyle aracınızı filomuza katın, düzenli gelir elde edin.
                        </p>
                        
                        <div class="bg-white/5 p-8 rounded-2xl border border-white/10 mb-6">
                            <h4 class="font-bold text-amber-400 text-xl mb-4 flex items-center">
                                <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                Başvuru Şartları
                            </h4>
                            <ul class="space-y-4">
                                <li class="flex items-center text-white font-bold text-lg">
                                    <span class="w-3 h-3 bg-red-500 rounded-full mr-4 shadow-[0_0_10px_red]"></span>
                                    En az 2018 Model olmalıdır.
                                </li>
                                <li class="flex items-center text-slate-300">
                                    <span class="w-2 h-2 bg-amber-500 rounded-full mr-4"></span>
                                    Ağır hasar kaydı bulunmamalıdır.
                                </li>
                                <li class="flex items-center text-slate-300">
                                    <span class="w-2 h-2 bg-amber-500 rounded-full mr-4"></span>
                                    Tüm bakımları yetkili serviste yapılmalıdır.
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="bg-white p-8 rounded-2xl shadow-xl text-slate-900">
                        <h3 class="font-bold text-2xl mb-6 text-slate-900 border-b pb-4">Araç Başvuru Formu</h3>
                        @if (rentCarFormSent()) {
                           <div class="bg-green-50 text-green-800 p-6 rounded-xl border border-green-200 text-center">
                               <div class="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                   <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                               </div>
                               <h4 class="font-bold text-lg mb-2">Başvurunuz Alındı!</h4>
                               <p>Uzman ekibimiz aracınızı inceleyip en kısa sürede size dönüş yapacaktır.</p>
                           </div>
                        } @else {
                           <form (submit)="submitRentCarForm($event)" class="space-y-4">
                              <div class="grid grid-cols-2 gap-4">
                                  <div class="space-y-1">
                                      <label class="text-xs font-bold text-slate-500 uppercase">Ad Soyad</label>
                                      <input type="text" required class="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500">
                                  </div>
                                  <div class="space-y-1">
                                      <label class="text-xs font-bold text-slate-500 uppercase">Telefon</label>
                                      <input type="tel" required placeholder="05XX..." class="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500">
                                  </div>
                              </div>

                              <div class="grid grid-cols-2 gap-4">
                                  <div class="space-y-1">
                                      <label class="text-xs font-bold text-slate-500 uppercase">Araç Marka/Model</label>
                                      <input type="text" placeholder="Örn: VW Passat" required class="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500">
                                  </div>
                                  <div class="space-y-1">
                                      <label class="text-xs font-bold text-slate-500 uppercase">Model Yılı</label>
                                      <select required class="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500">
                                          <option value="2024">2024</option>
                                          <option value="2023">2023</option>
                                          <option value="2022">2022</option>
                                          <option value="2021">2021</option>
                                          <option value="2020">2020</option>
                                          <option value="2019">2019</option>
                                          <option value="2018">2018</option>
                                      </select>
                                  </div>
                              </div>

                              <div class="space-y-1">
                                  <label class="text-xs font-bold text-slate-500 uppercase">Araç Kilometresi (KM)</label>
                                  <input type="number" placeholder="Örn: 50000" required class="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500">
                              </div>

                              <div class="space-y-1">
                                  <label class="text-xs font-bold text-slate-500 uppercase">Araç Fotoğrafları / Video</label>
                                  <div class="relative border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                                      <input type="file" multiple accept="image/*,video/*" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer">
                                      <div class="text-slate-500">
                                          <svg class="w-8 h-8 mx-auto mb-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                                          <span class="text-xs font-bold text-amber-600">Fotoğraf veya Video Yükle</span>
                                          <p class="text-[10px] mt-1">(Max 10 Dosya)</p>
                                      </div>
                                  </div>
                              </div>

                              <div class="space-y-1">
                                  <label class="text-xs font-bold text-slate-500 uppercase">Ek Açıklama / Notlar</label>
                                  <textarea rows="3" placeholder="Araç hakkında eklemek istedikleriniz..." class="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"></textarea>
                              </div>

                              <button type="submit" class="w-full bg-amber-500 text-white font-bold py-4 rounded-lg hover:bg-amber-600 transition-colors text-sm tracking-wider uppercase shadow-lg mt-2">
                                 Başvuruyu Gönder
                              </button>
                           </form>
                        }
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Campaigns (Bottom) -->
    <section class="bg-amber-500 py-12">
        <div class="max-w-7xl mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-900/10">
                <div class="p-4">
                    <span class="block text-4xl font-black text-slate-900 mb-1">%15</span>
                    <span class="text-sm font-bold uppercase tracking-wider text-slate-800 block">Erken Rezervasyon İndirimi</span>
                </div>
                <div class="p-4">
                    <span class="block text-4xl font-black text-slate-900 mb-1">7/24</span>
                    <span class="text-sm font-bold uppercase tracking-wider text-slate-800 block">Kesintisiz Yol Yardım</span>
                </div>
                <div class="p-4">
                    <span class="block text-4xl font-black text-slate-900 mb-1">ÜCRETSİZ</span>
                    <span class="text-sm font-bold uppercase tracking-wider text-slate-800 block">Havalimanı & Otogar Teslimat</span>
                </div>
            </div>
        </div>
    </section>

    <!-- Tours Section (Moved Here) -->
    <section class="py-16 bg-white border-t border-slate-100">
       <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
             <h2 class="text-3xl font-serif font-bold text-slate-900">Yüksekova Keşif Turları</h2>
             <p class="text-slate-500 mt-2">Cilo Dağları'ndan buzullara, eşsiz rotalar sizi bekliyor.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
             @for (tour of tours(); track tour.id) {
                <div class="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 group border border-slate-100 overflow-hidden flex flex-col">
                   <div class="h-56 overflow-hidden relative">
                      <img [src]="tour.image" [alt]="tour.title" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700">
                      <div class="absolute top-4 right-4 bg-amber-500 text-slate-900 font-bold text-xs px-3 py-1 rounded-full shadow-lg">
                         {{tour.duration}}
                      </div>
                   </div>
                   <div class="p-6 flex flex-col flex-grow">
                      <h3 class="text-xl font-serif font-bold text-slate-900 mb-2">{{tour.title}}</h3>
                      <p class="text-slate-500 text-sm mb-4">{{tour.description}}</p>
                      
                      <div class="space-y-2 mb-6">
                         @for (highlight of tour.highlights; track highlight) {
                            <div class="flex items-center text-xs font-bold text-slate-600">
                               <svg class="w-4 h-4 text-amber-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                               {{highlight}}
                            </div>
                         }
                      </div>

                      <div class="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                         <span class="text-2xl font-bold text-slate-900">{{tour.price}} ₺</span>
                         <button (click)="bookTour(tour)" class="bg-slate-900 text-white hover:bg-amber-500 hover:text-slate-900 px-4 py-2 rounded font-bold text-xs uppercase tracking-wider transition-colors">
                            Rezervasyon
                         </button>
                      </div>
                   </div>
                </div>
             }
          </div>
       </div>
    </section>
  `
})
export class HomeComponent {
  carService = inject(CarService);
  router = inject(Router);
  rentCarFormSent = signal(false);

  // Signals
  tours = this.carService.getTours();
  featuredCars = signal<Car[]>(this.carService.getCars()().filter(c => c.type === 'SUV' || c.type === 'Pickup' || c.brand === 'Volkswagen').slice(0, 3));

  // Booking Engine Signals
  pickupLocation = 'merkez';
  pickupDate = '';
  returnDate = '';
  serviceType = 'individual'; // Dropdown value

  searchCars(event: Event) {
    event.preventDefault();
    this.router.navigate(['/fleet'], {
      queryParams: {
        location: this.pickupLocation,
        start: this.pickupDate,
        end: this.returnDate,
        driver: this.serviceType === 'driver' ? 'true' : 'false'
      }
    });
  }

  goToFleet(type: string) {
    this.router.navigate(['/fleet'], { queryParams: { filter: type } }); 
  }

  bookTour(tour: any) {
    this.carService.setBookingRequest({
      type: 'TOUR',
      itemName: tour.title,
      image: tour.image,
      price: tour.price
    });
    this.router.navigate(['/contact']);
  }

  rentCar(event: Event, car: Car) {
    event.stopPropagation(); // Prevent parent click
    const request = {
      type: 'RENTAL' as const,
      item: car,
      itemName: `${car.brand} ${car.model}`,
      image: car.image,
      basePrice: car.price,
      startDate: this.pickupDate,
      endDate: this.returnDate
    };
    this.carService.setBookingRequest(request);
    this.router.navigate(['/contact']);
  }

  submitRentCarForm(event: Event) {
    event.preventDefault();
    // Simulate file upload processing
    this.rentCarFormSent.set(true);
  }

  scrollToBooking() {
    document.getElementById('bookingArea')?.scrollIntoView({ behavior: 'smooth' });
  }
}
