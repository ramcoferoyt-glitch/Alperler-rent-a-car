
import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarService } from '../services/car.service';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Car } from '../models/car.model';

@Component({
  selector: 'app-fleet',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-slate-50 min-h-screen pt-28 pb-20 font-sans">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header -->
        <div class="text-center mb-10">
           <h1 class="text-4xl font-serif font-bold text-slate-900">Araç Filomuz</h1>
           <p class="text-slate-500 mt-2">Yüksekova yollarına uygun, güçlü ve konforlu araçlar.</p>
        </div>

        <!-- Filters & Sort -->
        <div class="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
             <!-- Type Filters -->
             <div class="flex flex-wrap justify-center gap-2">
                <button (click)="filterType.set('All')" [class]="filterType() === 'All' ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-slate-100'" class="px-5 py-2 rounded-full font-bold text-sm transition-all">Tümü</button>
                <button (click)="filterType.set('SUV')" [class]="filterType() === 'SUV' ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-slate-100'" class="px-5 py-2 rounded-full font-bold text-sm transition-all">SUV</button>
                <button (click)="filterType.set('Pickup')" [class]="filterType() === 'Pickup' ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-slate-100'" class="px-5 py-2 rounded-full font-bold text-sm transition-all">Pikap</button>
                <button (click)="filterType.set('Sedan')" [class]="filterType() === 'Sedan' ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-slate-100'" class="px-5 py-2 rounded-full font-bold text-sm transition-all">Sedan</button>
                <button (click)="filterType.set('Hatchback')" [class]="filterType() === 'Hatchback' ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-slate-100'" class="px-5 py-2 rounded-full font-bold text-sm transition-all">Ekonomik</button>
             </div>

             <!-- Sorting -->
             <div class="relative">
                 <select [(ngModel)]="sortOption" class="appearance-none bg-white border border-slate-200 text-slate-700 py-2 px-4 pr-8 rounded-full font-bold text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm cursor-pointer">
                     <option value="default">Önerilen Sıralama</option>
                     <option value="priceAsc">Fiyat: Artan</option>
                     <option value="priceDesc">Fiyat: Azalan</option>
                 </select>
                 <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                 </div>
             </div>
        </div>

        <!-- Driver Mode Indicator -->
        @if (withDriver()) {
            <div class="mb-8 bg-amber-50 border border-amber-200 p-4 rounded-lg text-center text-amber-900 font-bold flex items-center justify-center shadow-sm animate-fade-in">
                <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                Şoförlü Kiralama Seçeneği Aktif
                <button (click)="withDriver.set(false)" class="ml-4 text-xs underline text-amber-700 hover:text-amber-900">Kaldır</button>
            </div>
        }

        <!-- Car Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           @for (car of sortedCars(); track car.id) {
              <div class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col h-full group relative" [class.opacity-75]="!car.isAvailable">
                 
                 <!-- Availability Overlay if not available -->
                 @if (!car.isAvailable) {
                    <div class="absolute inset-0 z-20 bg-slate-900/60 flex items-center justify-center backdrop-blur-sm">
                        <span class="bg-red-600 text-white px-6 py-2 rounded-lg font-bold text-xl transform -rotate-12 shadow-2xl border-2 border-white">KİRALANDI</span>
                    </div>
                 }

                 <!-- Image -->
                 <div class="h-60 overflow-hidden relative bg-slate-200">
                    <img [src]="car.image" [alt]="car.model" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500">
                    
                    <!-- Badges -->
                    <div class="absolute top-4 left-4 flex gap-2">
                        <div class="bg-white/90 backdrop-blur px-3 py-1 rounded-sm text-xs font-bold uppercase shadow-sm text-slate-900">
                            {{car.fuel}}
                        </div>
                    </div>

                    <!-- Favorite Button -->
                    <button (click)="toggleFav($event, car.id)" class="absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-white/80 backdrop-blur flex items-center justify-center transition-all hover:scale-110 shadow-md">
                         @if (isFav(car.id)) {
                            <svg class="w-5 h-5 text-red-500 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                         } @else {
                            <svg class="w-5 h-5 text-slate-400 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                         }
                    </button>
                 </div>
                 
                 <!-- Content -->
                 <div class="p-6 flex flex-col flex-grow">
                    <div class="flex justify-between items-start mb-2">
                       <h3 class="text-xl font-bold text-slate-900 font-serif">{{car.brand}} <span class="font-normal">{{car.model}}</span></h3>
                       <div class="text-right">
                           <span class="block text-xl font-bold text-slate-900">{{car.price}} ₺ <span class="text-xs text-slate-400 font-normal">/gün</span></span>
                       </div>
                    </div>
                    
                    <div class="flex gap-3 text-xs text-slate-500 mb-4">
                        <span class="bg-slate-100 px-2 py-1 rounded border border-slate-200">{{car.transmission}}</span>
                        <span class="bg-slate-100 px-2 py-1 rounded border border-slate-200">{{car.seats}} Kişilik</span>
                        <span class="bg-slate-100 px-2 py-1 rounded border border-slate-200">{{car.type}}</span>
                    </div>
                    
                    <div class="space-y-1 mb-6">
                        @for (feat of car.features; track feat) {
                            <div class="flex items-center text-sm text-slate-600">
                                <svg class="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg> 
                                {{feat}}
                            </div>
                        }
                    </div>

                    <button (click)="rentCar(car)" 
                            [disabled]="!car.isAvailable"
                            class="mt-auto w-full bg-slate-900 hover:bg-amber-500 hover:text-slate-900 text-white font-bold py-3 rounded transition-colors shadow-lg flex justify-center items-center disabled:bg-slate-300 disabled:cursor-not-allowed disabled:text-slate-500">
                       <span>{{ !car.isAvailable ? 'Müsait Değil' : (withDriver() ? 'Şoförlü Kirala' : 'Hemen Kirala') }}</span>
                       @if(car.isAvailable) {
                           <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                       }
                    </button>
                 </div>
              </div>
           }
        </div>
      </div>
    </div>
  `
})
export class FleetComponent implements OnInit {
  carService = inject(CarService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  
  allCars = this.carService.getCars();
  filterType = signal('All');
  sortOption = signal('default'); // default, priceAsc, priceDesc
  
  startDate = '';
  endDate = '';
  withDriver = signal(false);

  sortedCars = computed(() => {
    let cars = this.allCars().filter(car => {
      return this.filterType() === 'All' || car.type === this.filterType();
    });

    if (this.sortOption() === 'priceAsc') {
       return cars.sort((a, b) => a.price - b.price);
    } else if (this.sortOption() === 'priceDesc') {
       return cars.sort((a, b) => b.price - a.price);
    }
    return cars;
  });

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['start']) this.startDate = params['start'];
      if (params['end']) this.endDate = params['end'];
      if (params['driver'] === 'true') this.withDriver.set(true);
      if (params['filter']) this.filterType.set(params['filter']);
    });
  }

  toggleFav(event: Event, id: number) {
    event.stopPropagation();
    this.carService.toggleFavorite(id);
  }

  isFav(id: number) {
    return this.carService.isFavorite(id);
  }

  rentCar(car: Car) {
    const request = {
      type: 'RENTAL' as const,
      item: car,
      itemName: `${car.brand} ${car.model} ${this.withDriver() ? '(Şoförlü)' : ''}`,
      image: car.image,
      basePrice: car.price, // Send daily price
      startDate: this.startDate,
      endDate: this.endDate,
      withDriver: this.withDriver()
    };

    this.carService.setBookingRequest(request);
    this.router.navigate(['/contact']);
  }
}
