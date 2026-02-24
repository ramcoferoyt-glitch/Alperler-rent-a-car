
import { Component, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarService } from '../../services/car.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center animate-fade-in gap-4">
        <div>
           <h1 class="text-3xl font-bold text-slate-900">Yönetim Paneli</h1>
           <div class="flex items-center mt-2 text-xs font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full w-fit">
              <span class="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Sistem & Veritabanı Aktif
           </div>
        </div>
        <div class="text-sm text-slate-500 font-medium">Hoşgeldin, <span class="text-slate-900 font-bold">Admin</span></div>
    </div>
    
    <!-- Quick Actions -->
    <div class="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <a routerLink="/admin/cars" class="bg-slate-900 hover:bg-slate-800 text-white p-4 rounded-xl shadow-md transition-all flex flex-col justify-between group cursor-pointer border border-slate-700 min-h-[120px]">
            <div class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-900 transition-colors mb-3">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
            </div>
            <div>
                <div class="font-bold text-xs text-slate-400 uppercase">Filo</div>
                <div class="font-bold text-lg">Araç Yönetimi</div>
            </div>
        </a>

        <a routerLink="/admin/reservations" class="bg-white hover:bg-slate-50 border border-slate-200 p-4 rounded-xl shadow-sm transition-all flex flex-col justify-between group cursor-pointer min-h-[120px]">
            <div class="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-green-500 group-hover:text-white transition-colors mb-3">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <div>
                <div class="font-bold text-xs text-slate-500 uppercase">Talep</div>
                <div class="font-bold text-lg text-slate-900">Rezervasyonlar</div>
            </div>
        </a>

        <a routerLink="/admin/blog" class="bg-white hover:bg-slate-50 border border-slate-200 p-4 rounded-xl shadow-sm transition-all flex flex-col justify-between group cursor-pointer min-h-[120px]">
            <div class="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors mb-3">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
            </div>
            <div>
                <div class="font-bold text-xs text-slate-500 uppercase">İçerik</div>
                <div class="font-bold text-lg text-slate-900">Blog & Haber</div>
            </div>
        </a>

        <a routerLink="/admin/partner-requests" class="bg-white hover:bg-slate-50 border border-slate-200 p-4 rounded-xl shadow-sm transition-all flex flex-col justify-between group cursor-pointer min-h-[120px]">
             <div class="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-colors mb-3">
                 <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
             </div>
             <div>
                 <div class="font-bold text-xs text-slate-500 uppercase">Başvuru</div>
                 <div class="font-bold text-lg text-slate-900">Araç Sahipleri</div>
             </div>
        </a>
        
        <div class="bg-amber-500 p-4 rounded-xl shadow-md flex flex-col justify-between text-slate-900 min-h-[120px]">
             <svg class="w-8 h-8 opacity-50 self-end" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
             <div>
                 <div class="font-bold text-xs opacity-75 uppercase">Toplam Ciro</div>
                 <div class="font-bold text-2xl">{{ estimatedRevenue() | number }} ₺</div>
            </div>
        </div>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
       <!-- Stats Column -->
       <div class="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
           <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div class="text-slate-500 text-xs font-bold uppercase mb-2">Toplam Rezervasyon</div>
              <div class="text-4xl font-bold text-slate-900">{{ reservationsCount() }}</div>
              <div class="mt-2 text-xs text-green-600 font-bold">▲ Geçen aya göre %12 artış</div>
           </div>
           <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div class="text-slate-500 text-xs font-bold uppercase mb-2">Bekleyen Onay</div>
              <div class="text-4xl font-bold text-amber-500">{{ pendingCount() }}</div>
              <div class="mt-2 text-xs text-slate-400">Aksiyon bekleniyor</div>
           </div>
           <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div class="text-slate-500 text-xs font-bold uppercase mb-2">Toplam Araç</div>
              <div class="text-4xl font-bold text-blue-600">{{ totalCars() }}</div>
              <div class="mt-2 text-xs text-slate-400">Kiralık ve Satılık Dahil</div>
           </div>
           <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div class="text-slate-500 text-xs font-bold uppercase mb-2">Toplam Ziyaretçi</div>
              <div class="text-4xl font-bold text-indigo-600">{{ visitCount() }}</div>
              <div class="mt-2 text-xs text-green-600 font-bold">● Canlı Sayaç</div>
           </div>
       </div>

       <!-- Weekly Revenue Chart (CSS) -->
       <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col">
           <h3 class="font-bold text-slate-700 mb-4">Haftalık Performans</h3>
           <div class="flex-1 flex items-end justify-between space-x-2 h-48 mt-4">
               <!-- Simulated Bars -->
               <div class="w-full bg-slate-100 rounded-t-lg relative group h-[40%] hover:bg-amber-200 transition-all">
                  <div class="absolute -top-6 w-full text-center text-xs font-bold opacity-0 group-hover:opacity-100">40%</div>
                  <div class="absolute -bottom-6 w-full text-center text-xs text-slate-400">Pzt</div>
               </div>
               <div class="w-full bg-slate-100 rounded-t-lg relative group h-[60%] hover:bg-amber-200 transition-all">
                   <div class="absolute -top-6 w-full text-center text-xs font-bold opacity-0 group-hover:opacity-100">60%</div>
                   <div class="absolute -bottom-6 w-full text-center text-xs text-slate-400">Sal</div>
               </div>
               <div class="w-full bg-slate-100 rounded-t-lg relative group h-[30%] hover:bg-amber-200 transition-all">
                   <div class="absolute -top-6 w-full text-center text-xs font-bold opacity-0 group-hover:opacity-100">30%</div>
                   <div class="absolute -bottom-6 w-full text-center text-xs text-slate-400">Çar</div>
               </div>
               <div class="w-full bg-slate-100 rounded-t-lg relative group h-[80%] hover:bg-amber-200 transition-all">
                   <div class="absolute -top-6 w-full text-center text-xs font-bold opacity-0 group-hover:opacity-100">80%</div>
                   <div class="absolute -bottom-6 w-full text-center text-xs text-slate-400">Per</div>
               </div>
               <div class="w-full bg-amber-500 rounded-t-lg relative group h-[95%] shadow-lg">
                   <div class="absolute -top-6 w-full text-center text-xs font-bold">95%</div>
                   <div class="absolute -bottom-6 w-full text-center text-xs text-slate-900 font-bold">Cum</div>
               </div>
               <div class="w-full bg-slate-100 rounded-t-lg relative group h-[70%] hover:bg-amber-200 transition-all">
                   <div class="absolute -top-6 w-full text-center text-xs font-bold opacity-0 group-hover:opacity-100">70%</div>
                   <div class="absolute -bottom-6 w-full text-center text-xs text-slate-400">Cmt</div>
               </div>
               <div class="w-full bg-slate-100 rounded-t-lg relative group h-[50%] hover:bg-amber-200 transition-all">
                   <div class="absolute -top-6 w-full text-center text-xs font-bold opacity-0 group-hover:opacity-100">50%</div>
                   <div class="absolute -bottom-6 w-full text-center text-xs text-slate-400">Paz</div>
               </div>
           </div>
           <div class="mt-8 text-center text-xs text-slate-400">Son 7 günlük rezervasyon yoğunluğu</div>
       </div>
    </div>

    <!-- Recent Activity -->
    <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
       <div class="px-6 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
          <h3 class="font-bold text-slate-900">Son Rezervasyon Hareketleri</h3>
          <a routerLink="/admin/reservations" class="text-xs font-bold text-amber-600 hover:underline">Tümünü Gör</a>
       </div>
       <div class="overflow-x-auto">
           <table class="w-full text-left whitespace-nowrap">
              <thead class="bg-slate-50 text-slate-500 text-xs uppercase">
                 <tr>
                    <th class="px-6 py-3">Müşteri</th>
                    <th class="px-6 py-3">Araç / Hizmet</th>
                    <th class="px-6 py-3">Tarih</th>
                    <th class="px-6 py-3">Durum</th>
                    <th class="px-6 py-3">Tutar</th>
                 </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                 @for (res of recentReservations(); track res.id) {
                    <tr class="hover:bg-slate-50 transition-colors">
                       <td class="px-6 py-4 font-bold text-slate-900">{{ res.customerName }}</td>
                       <td class="px-6 py-4">
                           <div class="font-medium">{{ res.itemName }}</div>
                           <div class="text-xs text-slate-400">{{ res.type }}</div>
                       </td>
                       <td class="px-6 py-4 text-slate-500 text-sm">{{ res.dateCreated | date:'dd.MM.yyyy' }}</td>
                       <td class="px-6 py-4">
                          <span [class]="res.status === 'APPROVED' ? 'bg-green-100 text-green-800' : (res.status === 'REJECTED' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800')" class="px-2 py-1 rounded-full text-xs font-bold">
                             {{ res.status === 'APPROVED' ? 'Onaylandı' : (res.status === 'REJECTED' ? 'Reddedildi' : 'Bekliyor') }}
                          </span>
                       </td>
                       <td class="px-6 py-4 font-bold">{{ res.totalPrice || res.basePrice | number }} ₺</td>
                    </tr>
                 } @empty {
                     <tr><td colspan="5" class="px-6 py-8 text-center text-slate-500">Henüz kayıt bulunmuyor.</td></tr>
                 }
              </tbody>
           </table>
       </div>
    </div>
  `
})
export class AdminDashboardComponent {
  carService = inject(CarService);
  
  reservations = this.carService.getReservations();
  cars = this.carService.getCars();
  saleCars = this.carService.getSaleCars();
  visitCount = this.carService.getVisitCount();

  reservationsCount = computed(() => this.reservations().length);
  
  pendingCount = computed(() => this.reservations().filter(r => r.status === 'PENDING').length);
  
  estimatedRevenue = computed(() => {
     return this.reservations()
       .filter(r => r.status !== 'REJECTED')
       .reduce((acc, curr) => acc + (curr.totalPrice || curr.basePrice || 0), 0);
  });

  totalCars = computed(() => this.cars().length + this.saleCars().length);

  recentReservations = computed(() => this.reservations().slice(0, 5));
}
