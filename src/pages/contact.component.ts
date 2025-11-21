
import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarService, BookingRequest } from '../services/car.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-slate-50 pt-28 pb-20 font-sans">
       <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <!-- CHECKOUT FLOW (Only if booking exists) -->
          @if (bookingData()) {
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
                 
                 <!-- Left: Car Details & Price Summary -->
                 <div class="lg:col-span-1 space-y-6">
                    <div class="bg-white border border-amber-500 rounded-xl shadow-2xl overflow-hidden sticky top-32">
                        <div class="bg-amber-500 text-slate-900 py-4 px-6 font-bold text-sm uppercase tracking-widest flex justify-between items-center">
                           <span>Rezervasyon Özeti</span>
                           <button (click)="clearBooking()" class="text-slate-900 hover:bg-white/20 rounded p-1 transition-colors" title="İptal Et">
                               <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                           </button>
                        </div>
                        
                        <div class="relative h-48">
                           <img [src]="bookingData()?.image" class="w-full h-full object-cover">
                           <div class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
                               <h3 class="text-white font-bold text-xl">{{ bookingData()?.itemName }}</h3>
                           </div>
                        </div>
                        
                        <div class="p-6 space-y-4">
                           <!-- Rental Specific: Date Selection & Calculator -->
                           @if(bookingData()?.type === 'RENTAL') {
                               <div class="space-y-4">
                                   <div>
                                       <label class="text-xs font-bold text-slate-500 uppercase block mb-1">Alış Tarihi</label>
                                       <input type="date" [(ngModel)]="startDate" (change)="calculatePrice()" class="w-full bg-slate-50 border border-slate-200 rounded p-2 text-sm font-bold focus:ring-2 focus:ring-amber-500 outline-none">
                                   </div>
                                   <div>
                                       <label class="text-xs font-bold text-slate-500 uppercase block mb-1">Dönüş Tarihi</label>
                                       <input type="date" [(ngModel)]="endDate" (change)="calculatePrice()" class="w-full bg-slate-50 border border-slate-200 rounded p-2 text-sm font-bold focus:ring-2 focus:ring-amber-500 outline-none">
                                   </div>

                                   <div class="bg-slate-50 p-4 rounded border border-slate-100 space-y-2 text-sm">
                                       <div class="flex justify-between text-slate-600">
                                           <span>Günlük Fiyat:</span>
                                           <span>{{ bookingData()?.basePrice | number }} ₺</span>
                                       </div>
                                       <div class="flex justify-between text-slate-600">
                                           <span>Süre:</span>
                                           <span class="font-bold text-amber-600">{{ totalDays() }} Gün</span>
                                       </div>
                                       <div class="border-t border-slate-200 pt-2 mt-2 flex justify-between items-center">
                                           <span class="font-bold text-slate-900 text-lg">TOPLAM:</span>
                                           <span class="font-bold text-slate-900 text-2xl">{{ totalPrice() | number }} ₺</span>
                                       </div>
                                   </div>
                               </div>
                           } @else {
                               <!-- Sale or Tour Price -->
                               <div class="flex justify-between items-center border-t border-slate-100 pt-4">
                                  <span class="text-xs uppercase font-bold text-slate-500">Tahmini Tutar</span>
                                  <div class="text-xl font-bold text-slate-900">{{ bookingData()?.basePrice | number }} ₺</div>
                               </div>
                           }
                        </div>
                    </div>
                 </div>

                 <!-- Right: Payment & Personal Info -->
                 <div class="lg:col-span-2">
                    <div class="bg-white p-8 rounded-xl shadow-lg border border-slate-200 relative">
                        
                        <!-- Success Overlay -->
                        @if (successMessage()) {
                          <div class="absolute inset-0 bg-white z-20 flex flex-col items-center justify-center text-center p-8 animate-fade-in rounded-xl">
                             <div class="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 text-3xl shadow-lg">
                                 <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                             </div>
                             <h3 class="text-3xl font-bold text-slate-900 mb-2">İşleminiz Başarılı!</h3>
                             <p class="text-slate-500 mb-8 text-lg max-w-md">{{ successMessage() }}</p>
                             <button (click)="resetForm()" class="px-8 py-4 bg-slate-900 text-white font-bold rounded-full hover:bg-amber-500 hover:text-slate-900 transition-colors uppercase tracking-widest text-sm shadow-lg">
                                 Yeni İşlem
                             </button>
                          </div>
                        }

                        <h2 class="font-serif text-2xl font-bold text-slate-900 mb-6 pb-4 border-b border-slate-100">
                           {{ bookingData()?.type === 'RENTAL' ? 'Rezervasyonu Tamamla' : 'İletişim Bilgileri' }}
                        </h2>

                        <form (submit)="processBooking($event)" class="space-y-8">
                           <!-- Personal Info -->
                           <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                 <label class="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-wider">Adınız</label>
                                 <input type="text" required [(ngModel)]="formName" name="name" class="w-full bg-slate-50 border border-slate-200 p-3 rounded focus:ring-2 focus:ring-amber-500 outline-none transition-all">
                              </div>
                              <div>
                                 <label class="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-wider">Soyadınız</label>
                                 <input type="text" required [(ngModel)]="formSurname" name="surname" class="w-full bg-slate-50 border border-slate-200 p-3 rounded focus:ring-2 focus:ring-amber-500 outline-none transition-all">
                              </div>
                              <div class="md:col-span-2">
                                 <label class="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-wider">Telefon Numarası</label>
                                 <input type="tel" required [(ngModel)]="formPhone" name="phone" placeholder="05XX XXX XX XX" class="w-full bg-slate-50 border border-slate-200 p-3 rounded focus:ring-2 focus:ring-amber-500 outline-none transition-all">
                              </div>
                           </div>

                           <!-- Payment Methods (Rental Only) -->
                           @if (bookingData()?.type === 'RENTAL') {
                               <div class="space-y-4">
                                   <label class="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-wider">Ödeme Yöntemi</label>
                                   
                                   <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                       <div (click)="paymentMethod.set('CREDIT_CARD')" [class]="paymentMethod() === 'CREDIT_CARD' ? 'border-amber-500 bg-amber-50 text-amber-900 ring-1 ring-amber-500' : 'border-slate-200 hover:border-slate-300'" class="border rounded-lg p-4 cursor-pointer transition-all flex flex-col items-center text-center">
                                           <svg class="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
                                           <span class="font-bold text-sm">Kredi Kartı</span>
                                       </div>
                                       <div (click)="paymentMethod.set('EFT')" [class]="paymentMethod() === 'EFT' ? 'border-amber-500 bg-amber-50 text-amber-900 ring-1 ring-amber-500' : 'border-slate-200 hover:border-slate-300'" class="border rounded-lg p-4 cursor-pointer transition-all flex flex-col items-center text-center">
                                           <svg class="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"/></svg>
                                           <span class="font-bold text-sm">Havale / EFT</span>
                                       </div>
                                       <div (click)="paymentMethod.set('OFFICE')" [class]="paymentMethod() === 'OFFICE' ? 'border-amber-500 bg-amber-50 text-amber-900 ring-1 ring-amber-500' : 'border-slate-200 hover:border-slate-300'" class="border rounded-lg p-4 cursor-pointer transition-all flex flex-col items-center text-center">
                                           <svg class="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                                           <span class="font-bold text-sm">Ofiste Öde</span>
                                       </div>
                                   </div>

                                   <!-- Payment Details Content -->
                                   <div class="bg-slate-50 p-6 rounded-lg border border-slate-200 mt-4">
                                       @if (paymentMethod() === 'CREDIT_CARD') {
                                           <div class="space-y-4 animate-fade-in">
                                               <h4 class="font-bold text-slate-900 mb-4">Kart Bilgileri (Simülasyon)</h4>
                                               <div>
                                                   <input type="text" placeholder="Kart Üzerindeki İsim" class="w-full p-3 border border-slate-300 rounded text-sm">
                                               </div>
                                               <div>
                                                   <input type="text" placeholder="Kart Numarası" class="w-full p-3 border border-slate-300 rounded text-sm">
                                               </div>
                                               <div class="grid grid-cols-2 gap-4">
                                                   <input type="text" placeholder="AA/YY" class="w-full p-3 border border-slate-300 rounded text-sm">
                                                   <input type="text" placeholder="CVC" class="w-full p-3 border border-slate-300 rounded text-sm">
                                               </div>
                                               <p class="text-xs text-slate-500 mt-2">* Bu bir demo ödemesidir. Kartınızdan çekim yapılmayacaktır.</p>
                                           </div>
                                       } @else if (paymentMethod() === 'EFT') {
                                           <div class="space-y-3 text-sm text-slate-700 animate-fade-in">
                                               <p class="font-bold text-amber-600">{{ config().companyName }}</p>
                                               <div class="bg-white p-3 rounded border">
                                                   <span class="block text-xs text-slate-400">Ziraat Bankası</span>
                                                   <span class="font-mono font-bold">TR12 0001 0002 0003 0004 0005 67</span>
                                               </div>
                                               <p>Lütfen açıklama kısmına <strong>AD SOYAD</strong> yazınız. Dekontu WhatsApp hattımıza iletiniz.</p>
                                           </div>
                                       } @else {
                                           <div class="text-center text-slate-700 animate-fade-in">
                                               <p class="mb-2">Rezervasyonunuz oluşturulacak, ödemeyi aracı teslim alırken ofisimizde nakit veya kart ile yapabilirsiniz.</p>
                                               <p class="font-bold text-green-600">Ön ödeme gerekmiyor.</p>
                                           </div>
                                       }
                                   </div>
                               </div>
                           }

                           <button type="submit" [disabled]="isSubmitting()" class="w-full py-4 bg-slate-900 hover:bg-amber-500 hover:text-slate-900 text-white font-bold uppercase tracking-widest transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed text-sm rounded">
                              {{ isSubmitting() ? 'İşleniyor...' : 'Onayla ve Bitir' }}
                           </button>
                        </form>
                    </div>
                 </div>
              </div>

          } @else {
              
              <!-- STANDARD CONTACT PAGE (No Booking) -->
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
                 
                 <!-- Left Column: Info & Map -->
                 <div class="space-y-8">
                    <!-- Info Box -->
                    <div class="bg-slate-900 text-white p-8 rounded-xl shadow-lg">
                       <h3 class="font-serif text-xl font-bold mb-6 text-amber-500">İletişim Bilgileri</h3>
                       <ul class="space-y-6">
                          <li class="flex items-start">
                             <svg class="w-5 h-5 text-amber-500 mr-4 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                             <span>{{ config().address }}</span>
                          </li>
                          <li class="flex items-center">
                             <svg class="w-5 h-5 text-amber-500 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                             <span class="text-lg font-bold">{{ config().phone }}</span>
                          </li>
                          <li class="flex items-center">
                             <svg class="w-5 h-5 text-amber-500 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                             <span>{{ config().email }}</span>
                          </li>
                       </ul>
                    </div>
                    
                    <!-- Map -->
                    <div class="bg-white p-2 rounded-xl shadow-lg h-[300px] overflow-hidden border border-slate-200">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50276.81582640637!2d44.26237087249756!3d37.55376989803086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40081211590d3409%3A0x972e3687221b8b2a!2zWcOca3Nla292YSwgSGFra2FyaQ!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                 </div>

                 <!-- Right Column: Contact Form -->
                 <div class="bg-white p-8 shadow-xl rounded-xl border-t-4 border-slate-900">
                    <h2 class="font-serif text-3xl font-bold text-slate-900 mb-2">Bize Ulaşın</h2>
                    <p class="text-slate-500 mb-8">Sorularınız veya talepleriniz için formu doldurun.</p>
                    
                    <form (submit)="processBooking($event)" class="space-y-6">
                       <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <input type="text" placeholder="Adınız" required [(ngModel)]="formName" name="name" class="w-full bg-slate-50 border border-slate-200 p-4 rounded-sm focus:ring-1 focus:ring-amber-500 outline-none transition-colors">
                           <input type="text" placeholder="Soyadınız" required [(ngModel)]="formSurname" name="surname" class="w-full bg-slate-50 border border-slate-200 p-4 rounded-sm focus:ring-1 focus:ring-amber-500 outline-none transition-colors">
                       </div>
                       <input type="tel" placeholder="Telefon" required [(ngModel)]="formPhone" name="phone" class="w-full bg-slate-50 border border-slate-200 p-4 rounded-sm focus:ring-1 focus:ring-amber-500 outline-none transition-colors">
                       <textarea rows="4" placeholder="Mesajınız" [(ngModel)]="formMessage" name="message" class="w-full bg-slate-50 border border-slate-200 p-4 rounded-sm focus:ring-1 focus:ring-amber-500 outline-none transition-colors"></textarea>
                       <button type="submit" class="w-full py-4 bg-slate-900 text-white font-bold uppercase tracking-widest shadow-lg hover:bg-amber-500 hover:text-slate-900 transition-colors rounded-sm">Gönder</button>
                    </form>
                 </div>
              </div>
          }
       </div>
    </div>
  `
})
export class ContactComponent implements OnInit {
  carService = inject(CarService);
  config = this.carService.getConfig();
  
  bookingData = signal<BookingRequest | null>(null);
  
  formName = '';
  formSurname = '';
  formPhone = '';
  formMessage = '';
  
  startDate = '';
  endDate = '';
  totalDays = signal(0);
  totalPrice = signal(0);
  paymentMethod = signal<'CREDIT_CARD' | 'EFT' | 'OFFICE'>('OFFICE');

  isSubmitting = signal(false);
  successMessage = signal('');

  ngOnInit() {
    const req = this.carService.getBookingRequest();
    if (req) {
      this.bookingData.set(req);
      if (req.startDate) this.startDate = req.startDate;
      if (req.endDate) this.endDate = req.endDate;
      this.calculatePrice();
    }
  }

  calculatePrice() {
    const req = this.bookingData();
    if (req && req.type === 'RENTAL' && this.startDate && this.endDate) {
        const start = new Date(this.startDate);
        const end = new Date(this.endDate);
        const timeDiff = end.getTime() - start.getTime();
        const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
        
        if (days > 0) {
            this.totalDays.set(days);
            this.totalPrice.set(days * (req.basePrice || 0));
        } else {
            this.totalDays.set(0);
            this.totalPrice.set(0);
        }
    }
  }

  clearBooking() {
    this.carService.clearBookingRequest();
    this.bookingData.set(null);
    this.formMessage = '';
    this.startDate = '';
    this.endDate = '';
  }

  processBooking(event: Event) {
    event.preventDefault();
    this.isSubmitting.set(true);

    const req = this.bookingData();

    const finalRequest: BookingRequest = req ? {
        ...req,
        customerName: `${this.formName} ${this.formSurname}`,
        customerPhone: this.formPhone,
        startDate: this.startDate,
        endDate: this.endDate,
        days: this.totalDays(),
        totalPrice: this.totalPrice() || req.basePrice
    } : {
        type: 'SALE_INQUIRY',
        item: null,
        itemName: 'İletişim Formu Mesajı',
        customerName: `${this.formName} ${this.formSurname}`,
        customerPhone: this.formPhone,
        basePrice: 0
    };
    
    this.carService.addReservation(finalRequest);

    setTimeout(() => {
      this.isSubmitting.set(false);
      if (req?.type === 'RENTAL') {
          const paymentText = this.paymentMethod() === 'CREDIT_CARD' ? 'Kredi Kartı ile ödeme alındı.' : (this.paymentMethod() === 'EFT' ? 'Havale bildirimi oluşturuldu.' : 'Ofiste ödeme seçildi.');
          this.successMessage.set(`Sayın ${this.formName} ${this.formSurname}, ${req.itemName} için rezervasyonunuz oluşturuldu. ${paymentText} Bizi tercih ettiğiniz için teşekkür ederiz.`);
      } else {
          this.successMessage.set(`Talebiniz başarıyla alındı. En kısa sürede ${this.formPhone} üzerinden dönüş yapacağız.`);
      }
    }, 1500);
  }

  resetForm() {
    this.formName = '';
    this.formSurname = '';
    this.formPhone = '';
    this.formMessage = '';
    this.clearBooking();
    this.successMessage.set('');
  }
}
