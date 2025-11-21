
import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarService } from '../../services/car.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-admin-cars',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 animate-fade-in gap-4">
        <h1 class="text-3xl font-bold text-slate-900">Araç Yönetimi</h1>
        <div class="flex space-x-4 w-full md:w-auto">
            <button (click)="activeTab.set('RENTAL')" [class]="activeTab() === 'RENTAL' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600'" class="flex-1 md:flex-none px-4 py-2 rounded-lg font-bold shadow transition-colors text-center">Kiralık Filo</button>
            <button (click)="activeTab.set('SALES')" [class]="activeTab() === 'SALES' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600'" class="flex-1 md:flex-none px-4 py-2 rounded-lg font-bold shadow transition-colors text-center">Galeri (Satılık)</button>
        </div>
    </div>

    <!-- RENTAL CARS -->
    @if (activeTab() === 'RENTAL') {
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-fade-in">
            <div class="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
               <h3 class="font-bold text-slate-700">Kiralık Araç Listesi</h3>
               <button (click)="openForm()" class="bg-amber-500 text-white px-4 py-2 rounded text-sm font-bold hover:bg-amber-600 shadow-md transition-all">+ Yeni Araç Ekle</button>
            </div>
            
            <!-- Add/Edit Form Overlay -->
            @if (showForm()) {
               <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                  <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fade-in-up">
                     <div class="p-6 border-b border-slate-100 flex justify-between items-center">
                        <h4 class="font-bold text-xl text-slate-900">{{ isEditing ? 'Aracı Düzenle' : 'Yeni Araç Ekle' }}</h4>
                        <button (click)="closeForm()" class="text-slate-400 hover:text-red-500">
                           <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                        </button>
                     </div>
                     
                     <div class="p-6 space-y-6">
                        <!-- Image Upload Section -->
                        <div class="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-xl p-6 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer relative">
                           @if (currentCar.image) {
                              <img [src]="currentCar.image" class="h-48 object-contain rounded-lg shadow-md mb-4">
                              <button (click)="currentCar.image = ''" class="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow hover:bg-red-600">
                                 <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                              </button>
                           } @else {
                              <div class="text-center pointer-events-none">
                                 <svg class="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                 </svg>
                                 <p class="mt-1 text-sm text-slate-600 font-bold">Fotoğraf Seç veya Sürükle</p>
                                 <p class="text-xs text-slate-500">PNG, JPG, GIF (Max 5MB)</p>
                              </div>
                           }
                           <input type="file" (change)="onFileSelected($event)" accept="image/*" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer">
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div>
                              <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Marka</label>
                              <input [(ngModel)]="currentCar.brand" class="w-full p-3 border rounded-lg bg-slate-50 font-bold focus:ring-2 focus:ring-amber-500 outline-none">
                           </div>
                           <div>
                              <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Model</label>
                              <input [(ngModel)]="currentCar.model" class="w-full p-3 border rounded-lg bg-slate-50 font-bold focus:ring-2 focus:ring-amber-500 outline-none">
                           </div>
                           <div>
                              <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Kasa Tipi</label>
                              <select [(ngModel)]="currentCar.type" class="w-full p-3 border rounded-lg bg-slate-50 focus:ring-2 focus:ring-amber-500 outline-none">
                                 <option value="SUV">SUV</option>
                                 <option value="Sedan">Sedan</option>
                                 <option value="Pickup">Pickup</option>
                                 <option value="Hatchback">Hatchback</option>
                                 <option value="Luxury">Luxury</option>
                              </select>
                           </div>
                           <div>
                              <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Günlük Fiyat (TL)</label>
                              <input [(ngModel)]="currentCar.price" type="number" class="w-full p-3 border rounded-lg bg-slate-50 font-bold text-green-600 focus:ring-2 focus:ring-amber-500 outline-none">
                           </div>
                           <div>
                              <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Yakıt</label>
                              <select [(ngModel)]="currentCar.fuel" class="w-full p-3 border rounded-lg bg-slate-50">
                                 <option value="Dizel">Dizel</option>
                                 <option value="Benzin">Benzin</option>
                                 <option value="Hibrit">Hibrit</option>
                                 <option value="Elektrik">Elektrik</option>
                              </select>
                           </div>
                           <div>
                              <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Vites</label>
                              <select [(ngModel)]="currentCar.transmission" class="w-full p-3 border rounded-lg bg-slate-50">
                                 <option value="Otomatik">Otomatik</option>
                                 <option value="Manuel">Manuel</option>
                              </select>
                           </div>
                           
                           <div class="md:col-span-2">
                              <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Araç Durumu</label>
                              <div class="flex gap-4">
                                 <button (click)="currentCar.isAvailable = true" [class]="currentCar.isAvailable ? 'bg-green-500 text-white ring-2 ring-green-300' : 'bg-slate-100 text-slate-400'" class="flex-1 py-3 rounded-lg font-bold transition-all">
                                    Müsait
                                 </button>
                                 <button (click)="currentCar.isAvailable = false" [class]="!currentCar.isAvailable ? 'bg-red-500 text-white ring-2 ring-red-300' : 'bg-slate-100 text-slate-400'" class="flex-1 py-3 rounded-lg font-bold transition-all">
                                    Dolu / Kirada
                                 </button>
                              </div>
                           </div>
                        </div>
                     </div>
                     
                     <div class="p-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50 rounded-b-2xl">
                        <button (click)="closeForm()" class="px-6 py-2 text-slate-500 font-bold hover:text-slate-800 transition-colors">İptal</button>
                        <button (click)="saveCar()" class="px-6 py-2 bg-slate-900 text-white font-bold rounded-lg shadow-lg hover:bg-amber-500 hover:text-slate-900 transition-all">
                           {{ isEditing ? 'Değişiklikleri Kaydet' : 'Aracı Ekle' }}
                        </button>
                     </div>
                  </div>
               </div>
            }

            <div class="overflow-x-auto">
               <table class="w-full text-left whitespace-nowrap">
                  <thead class="bg-slate-100 text-slate-500 text-xs uppercase">
                     <tr>
                        <th class="px-6 py-3">Resim</th>
                        <th class="px-6 py-3">Marka/Model</th>
                        <th class="px-6 py-3">Tür</th>
                        <th class="px-6 py-3">Fiyat</th>
                        <th class="px-6 py-3">Durum</th>
                        <th class="px-6 py-3 text-right">İşlemler</th>
                     </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-100">
                     @for (car of cars(); track car.id) {
                        <tr class="hover:bg-slate-50 transition-colors group">
                           <td class="px-6 py-3">
                              <img [src]="car.image" class="w-16 h-12 object-cover rounded shadow-sm border border-slate-200">
                           </td>
                           <td class="px-6 py-3 font-bold text-slate-900">{{ car.brand }} {{ car.model }}</td>
                           <td class="px-6 py-3 text-sm text-slate-500">
                              <span class="bg-slate-100 px-2 py-1 rounded border">{{ car.type }}</span>
                           </td>
                           <td class="px-6 py-3 font-bold text-slate-900">{{ car.price }} ₺</td>
                           <td class="px-6 py-3">
                              <span [class]="car.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'" class="px-2 py-1 rounded text-xs font-bold inline-flex items-center">
                                 <span class="w-2 h-2 rounded-full mr-2" [class]="car.isAvailable ? 'bg-green-500' : 'bg-red-500'"></span>
                                 {{ car.isAvailable ? 'Müsait' : 'Dolu' }}
                              </span>
                           </td>
                           <td class="px-6 py-3 text-right space-x-2">
                              <button (click)="editCar(car)" class="bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded text-xs font-bold transition-colors">
                                 Düzenle
                              </button>
                              <button (click)="deleteCar(car.id)" class="bg-red-50 text-red-500 hover:bg-red-100 px-3 py-1.5 rounded text-xs font-bold transition-colors">
                                 Sil
                              </button>
                           </td>
                        </tr>
                     }
                  </tbody>
               </table>
            </div>
        </div>
    }

    <!-- SALES CARS TAB -->
    @if (activeTab() === 'SALES') {
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center animate-fade-in">
            <div class="bg-amber-50 inline-block p-6 rounded-full mb-4">
                <svg class="w-12 h-12 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-2">Galeri Modülü</h3>
            <p class="text-slate-500 max-w-md mx-auto">Satılık araç yönetimi Kiralık Filo ile aynı altyapıyı kullanır. Şu an demo amaçlı Kiralık Filo üzerinden işlem yapabilirsiniz.</p>
        </div>
    }
  `
})
export class AdminCarsComponent {
  carService = inject(CarService);
  toastService = inject(ToastService);
  cars = this.carService.getCars();
  saleCars = this.carService.getSaleCars();

  activeTab = signal<'RENTAL' | 'SALES'>('RENTAL');
  showForm = signal(false);
  isEditing = false;

  // Default Model
  defaultCar = {
     id: 0,
     brand: '', 
     model: '', 
     price: 0, 
     type: 'SUV', 
     image: '', 
     seats: 5, 
     features: ['Klima', 'Bluetooth', 'ABS'], 
     isAvailable: true, 
     fuel: 'Dizel', 
     transmission: 'Otomatik'
  };

  currentCar: any = { ...this.defaultCar };

  openForm() {
      this.isEditing = false;
      this.currentCar = { ...this.defaultCar, image: '' }; // Reset
      this.showForm.set(true);
  }

  closeForm() {
      this.showForm.set(false);
  }

  editCar(car: any) {
      this.isEditing = true;
      this.currentCar = { ...car }; // Clone to avoid direct mutation
      this.showForm.set(true);
  }

  // Handle File Selection and Convert to Base64
  onFileSelected(event: any) {
      const file = event.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
              this.currentCar.image = e.target.result; // Set Base64 string
          };
          reader.readAsDataURL(file);
      }
  }

  saveCar() {
      if (!this.currentCar.brand || !this.currentCar.model || !this.currentCar.price) {
          this.toastService.show('Lütfen Marka, Model ve Fiyat alanlarını doldurun.', 'error');
          return;
      }
      
      // If no image selected, use a placeholder based on type
      if (!this.currentCar.image) {
          this.currentCar.image = `https://source.unsplash.com/800x600/?${this.currentCar.type},car`;
      }

      this.carService.addCar(this.currentCar); // Handles both add and update
      this.toastService.show(this.isEditing ? 'Araç güncellendi.' : 'Yeni araç filoya eklendi.', 'success');
      this.closeForm();
  }

  deleteCar(id: number) {
      if(confirm('Bu aracı silmek istediğinize emin misiniz?')) {
          this.carService.deleteCar(id);
          this.toastService.show('Araç silindi.', 'info');
      }
  }
}
