
import { Injectable, signal, computed, effect } from '@angular/core';
import { Car } from '../models/car.model';
import { SiteConfig } from '../models/site-config.model';
import { GoogleGenAI } from "@google/genai";

export interface SaleCar {
  id: number;
  brand: string;
  model: string;
  year: number;
  km: number;
  price: number;
  image: string;
  description: string;
  features: string[];
  expertReport?: string;
  transmission: 'Otomatik' | 'Manuel';
  fuel: 'Benzin' | 'Dizel' | 'Hibrit';
}

export interface Tour {
  id: number;
  title: string;
  duration: string;
  price: number;
  description: string;
  highlights: string[];
  image: string;
}

export interface BlogPost {
  id: number;
  title: string;
  summary: string;
  content: string;
  image: string;
  readTime: string;
  date: string;
}

export interface BookingRequest {
  id?: string;
  status?: 'PENDING' | 'APPROVED' | 'REJECTED';
  dateCreated?: Date;
  customerName?: string;
  customerPhone?: string;
  
  type: 'RENTAL' | 'TOUR' | 'SALE_INQUIRY';
  item: Car | SaleCar | Tour | null;
  itemName: string;
  image?: string;
  basePrice?: number;
  totalPrice?: number;
  startDate?: string;
  endDate?: string;
  days?: number;
  withDriver?: boolean;
  pickupLocation?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarService {
  // --- STATE SIGNALS ---
  private _bookingRequest = signal<BookingRequest | null>(null);
  private _favoriteCars = signal<number[]>([]);
  private _visitCount = signal<number>(1250); // Start with a realistic base number
  
  // --- DATA STORE SIGNALS ---
  
  // 1. Site Configuration
  private _config = signal<SiteConfig>({
    companyName: 'Alperler Rent A Car',
    phone: '0537 959 48 51',
    email: 'info@alperlerrentacar.com',
    address: 'Hakkari Yüksekova Merkez',
    whatsapp: '905379594851',
    instagramUrl: 'https://instagram.com/',
    twitterUrl: 'https://x.com/',
    youtubeUrl: 'https://youtube.com/',
    tiktokUrl: 'https://tiktok.com/',
    aboutTitle: 'AİLE BAĞLARINDAN DOĞAN GÜÇ',
    aboutText: `Alperler Rent A Car, sıradan bir ticarethane değil, temelleri sevgi ve aile bağlarıyla atılmış bir hayalin gerçeğe dönüşmesidir. Bu hikaye, İshak Alper ve kardeşi Ferhat Alper'in, yeğenleri (Hicran Hanım'ın oğlu) Alper'in geleceğini inşa etme arzusuyla başlar.\n\nAilenin birleştirici gücü olan Genel Müdürümüz Hicran Alper, bir anne şefkati ve disipliniyle şirketin operasyonlarını yönetirken, kurucumuz ve dayısı İshak Alper ise vizyoner kimliğiyle markayı bölgenin zirvesine taşımıştır.`,
    footerText: "Yüksekova'da güvenilir araç kiralama hizmetiyle hayallerinizin yol arkadaşı. Premium hizmet, güvenli yolculuk."
  });

  // 2. Cars
  private _cars = signal<Car[]>([
    // SUV
    { id: 1, brand: 'Nissan', model: 'Qashqai', type: 'SUV', transmission: 'Otomatik', fuel: 'Dizel', price: 4500, image: 'https://images.unsplash.com/photo-1599940824399-b87987ce0799?q=80&w=1000&auto=format&fit=crop', seats: 5, features: ['Cam Tavan', 'Geri Görüş', 'Start-Stop'], isAvailable: true },
    { id: 2, brand: 'Peugeot', model: '3008', type: 'SUV', transmission: 'Otomatik', fuel: 'Dizel', price: 4800, image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1000&auto=format&fit=crop', seats: 5, features: ['Hayalet Ekran', 'E-Toggle', 'Şerit Takip'], isAvailable: true },
    { id: 3, brand: 'Volkswagen', model: 'Tiguan', type: 'SUV', transmission: 'Otomatik', fuel: 'Benzin', price: 5200, image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=1000&auto=format&fit=crop', seats: 5, features: ['IQ.Light', 'Cam Tavan', 'Apple CarPlay'], isAvailable: false },
    { id: 4, brand: 'Dacia', model: 'Duster', type: 'SUV', transmission: 'Manuel', fuel: 'Dizel', price: 3500, image: 'https://images.unsplash.com/photo-1621007947382-bb3c3968e3bb?q=80&w=1000&auto=format&fit=crop', seats: 5, features: ['Ekonomik', 'Geniş Bagaj', 'Yüksek Sürüş'], isAvailable: true },

    // Sedan
    { id: 5, brand: 'Volkswagen', model: 'Passat', type: 'Sedan', transmission: 'Otomatik', fuel: 'Dizel', price: 4200, image: 'https://images.unsplash.com/photo-1626847037657-fd3622613ce3?q=80&w=1000&auto=format&fit=crop', seats: 5, features: ['Makam Konforu', 'Deri Koltuk', 'Geniş İç Hacim'], isAvailable: true },
    { id: 6, brand: 'Toyota', model: 'Corolla', type: 'Sedan', transmission: 'Otomatik', fuel: 'Hibrit', price: 3800, image: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?q=80&w=1000&auto=format&fit=crop', seats: 5, features: ['Yakıt Cimrisi', 'Sessiz Sürüş', 'Güvenlik Paketi'], isAvailable: true },
    { id: 7, brand: 'Renault', model: 'Megane', type: 'Sedan', transmission: 'Otomatik', fuel: 'Dizel', price: 3600, image: 'https://images.unsplash.com/photo-1617469165786-8007ed3caa37?q=80&w=1000&auto=format&fit=crop', seats: 5, features: ['Tesla Ekran', 'Led Far', 'Sport Mod'], isAvailable: true },
    { id: 8, brand: 'Fiat', model: 'Egea Cross', type: 'Sedan', transmission: 'Manuel', fuel: 'Benzin', price: 2800, image: 'https://images.unsplash.com/photo-1655320609876-4c8e5644d184?q=80&w=1000&auto=format&fit=crop', seats: 5, features: ['Ekonomik', 'Şehir İçi', 'Apple CarPlay'], isAvailable: true },

    // Pickup
    { id: 9, brand: 'Toyota', model: 'Hilux 4x4', type: 'Pickup', transmission: 'Otomatik', fuel: 'Dizel', price: 5500, image: 'https://images.unsplash.com/photo-1605218457336-92e4a6001a0d?q=80&w=1000&auto=format&fit=crop', seats: 5, features: ['Arazi Modu', 'Diferansiyel Kilidi', 'Güçlü Motor'], isAvailable: true },
    { id: 10, brand: 'Ford', model: 'Ranger Wildtrak', type: 'Pickup', transmission: 'Otomatik', fuel: 'Dizel', price: 6000, image: 'https://images.unsplash.com/photo-1566008885218-90abf9200ddb?q=80&w=1000&auto=format&fit=crop', seats: 5, features: ['Off-Road', 'Isıtmalı Koltuk', '4x4 Çekiş'], isAvailable: true },
    { id: 11, brand: 'Mitsubishi', model: 'L200', type: 'Pickup', transmission: 'Manuel', fuel: 'Dizel', price: 5000, image: 'https://images.unsplash.com/photo-1598545534767-b589ee269027?q=80&w=1000&auto=format&fit=crop', seats: 5, features: ['Dayanıklı', 'Yük Taşıma', 'Yüksek Tork'], isAvailable: true },
    { id: 12, brand: 'Isuzu', model: 'D-Max', type: 'Pickup', transmission: 'Otomatik', fuel: 'Dizel', price: 5200, image: 'https://images.unsplash.com/photo-1632823469860-42137e0c092d?q=80&w=1000&auto=format&fit=crop', seats: 5, features: ['V-Cross', 'Deri Döşeme', 'Güvenlik Asistanı'], isAvailable: true },

    // Hatchback
    { id: 13, brand: 'Renault', model: 'Clio', type: 'Hatchback', transmission: 'Otomatik', fuel: 'Benzin', price: 3000, image: 'https://images.unsplash.com/photo-1635785137860-e8c603e73a2b?q=80&w=1000&auto=format&fit=crop', seats: 5, features: ['Pratik', 'Ekonomik', 'Kolay Park'], isAvailable: true },
    { id: 14, brand: 'Hyundai', model: 'i20', type: 'Hatchback', transmission: 'Otomatik', fuel: 'Benzin', price: 3100, image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=1000&auto=format&fit=crop', seats: 5, features: ['Sportif', 'Geniş Ekran', 'Şerit Takip'], isAvailable: true },
    { id: 15, brand: 'Volkswagen', model: 'Polo', type: 'Hatchback', transmission: 'Otomatik', fuel: 'Benzin', price: 3400, image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=1000&auto=format&fit=crop', seats: 5, features: ['Konforlu', 'DSG Şanzıman', 'Kaliteli İç Mekan'], isAvailable: true },
    { id: 16, brand: 'Peugeot', model: '208', type: 'Hatchback', transmission: 'Otomatik', fuel: 'Benzin', price: 3300, image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=1000&auto=format&fit=crop', seats: 5, features: ['i-Cockpit', 'Aslan Dişi Led', 'Kompakt'], isAvailable: true },
    
    // Luxury
    { id: 17, brand: 'Mercedes-Benz', model: 'E-Class', type: 'Luxury', transmission: 'Otomatik', fuel: 'Dizel', price: 8500, image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1000&auto=format&fit=crop', seats: 5, features: ['Makam Aracı', 'Masajlı Koltuk', 'Vakum Kapı'], isAvailable: true },
    { id: 18, brand: 'BMW', model: '520i', type: 'Luxury', transmission: 'Otomatik', fuel: 'Benzin', price: 8500, image: 'https://images.unsplash.com/photo-1555215695-3004980adade?q=80&w=1000&auto=format&fit=crop', seats: 5, features: ['M Sport', 'Harman Kardon', 'Laser Light'], isAvailable: true },
    { id: 19, brand: 'Audi', model: 'A6', type: 'Luxury', transmission: 'Otomatik', fuel: 'Dizel', price: 8200, image: 'https://images.unsplash.com/photo-1606152421811-991d589363bd?q=80&w=1000&auto=format&fit=crop', seats: 5, features: ['Quattro', 'Matrix Led', 'Çift Ekran'], isAvailable: true },
    { id: 21, brand: 'Volvo', model: 'S90', type: 'Luxury', transmission: 'Otomatik', fuel: 'Dizel', price: 8000, image: 'https://images.unsplash.com/photo-1619712068019-d10823490484?q=80&w=1000&auto=format&fit=crop', seats: 5, features: ['En Güvenli', 'Otonom Sürüş', 'Bowers & Wilkins'], isAvailable: true }
  ]);

  // 3. Sale Cars
  private _saleCars = signal<SaleCar[]>([
    { id: 101, brand: 'Mercedes-Benz', model: 'C 200 4MATIC AMG', year: 2023, km: 12000, price: 3650000, image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1000&auto=format&fit=crop', description: 'Hatasız, boyasız, sıfır ayarında. AMG paket, gece paketi.', features: ['Cam Tavan', 'Burmester', 'Otonom', '360 Kamera'], expertReport: 'Hatasız, Boyasız, Tramer Yok', transmission: 'Otomatik', fuel: 'Benzin' }
  ]);

  // 4. Blog Posts
  private _blogPosts = signal<BlogPost[]>([
    { id: 1, title: "Cilo Dağları'nda Bir Masal", summary: "Yüksekova'nın saklı cenneti Cilo Dağları ve Cennet-Cehennem Vadisi gezi rehberi.", image: "https://picsum.photos/id/1036/1200/800", readTime: "6 dk okuma", date: "25 Mayıs 2024", content: "<p>Yüksekova doğası...</p>" },
    { id: 2, title: "Ters Lale Zamanı", summary: "Hakkari'nin simgesi, ağlayan gelin 'Ters Lale'yi görmeniz için en iyi zamanlar.", image: "https://picsum.photos/id/200/1200/800", readTime: "4 dk okuma", date: "10 Nisan 2024", content: "<p>Ters Lale hakkında...</p>" }
  ]);

  // 5. Reservations
  private _reservations = signal<BookingRequest[]>([]);
  
  // 6. Tours
  private _tours = signal<Tour[]>([
    { id: 1, title: 'Cilo Dağları & Buzullar Zirvesi', duration: 'Tam Gün', price: 4500, description: 'Türkiye’nin en yüksek 2. zirvesi ve 4 mevsim erimeyen buzullarına efsanevi bir yolculuk.', highlights: ['Uludoruk Buzulları', 'Cennet-Cehennem Vadisi', 'Yayla Kahvaltısı'], image: 'https://picsum.photos/id/1036/800/600' },
    { id: 2, title: 'Sat Buzul Gölleri & Şelaleler', duration: 'Tam Gün', price: 4000, description: '3000 metre rakımda turkuaz rengi göllerin ve gürül gürül akan şelalelerin eşsiz manzarası.', highlights: ['Sat Gölleri', 'Doğa Yürüyüşü', 'Piknik', 'Fotoğraf Safari'], image: 'https://picsum.photos/id/1043/800/600' }
  ]);

  private genAI: GoogleGenAI;

  constructor() {
    this.genAI = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    this.loadFromStorage();

    // Increment Visit Counter
    this.incrementVisitCount();

    effect(() => localStorage.setItem('db_config', JSON.stringify(this._config())));
    effect(() => localStorage.setItem('db_cars', JSON.stringify(this._cars())));
    effect(() => localStorage.setItem('db_saleCars', JSON.stringify(this._saleCars())));
    effect(() => localStorage.setItem('db_blog', JSON.stringify(this._blogPosts())));
    effect(() => localStorage.setItem('db_reservations', JSON.stringify(this._reservations())));
    effect(() => localStorage.setItem('db_visits', this._visitCount().toString()));
  }

  private loadFromStorage() {
      const config = localStorage.getItem('db_config');
      if (config) this._config.set(JSON.parse(config));

      const cars = localStorage.getItem('db_cars');
      if (cars) {
         const parsedCars = JSON.parse(cars);
         if(parsedCars.length > 0) this._cars.set(parsedCars);
      }

      const saleCars = localStorage.getItem('db_saleCars');
      if (saleCars) this._saleCars.set(JSON.parse(saleCars));

      const blog = localStorage.getItem('db_blog');
      if (blog) this._blogPosts.set(JSON.parse(blog));
      
      const reservations = localStorage.getItem('db_reservations');
      if (reservations) this._reservations.set(JSON.parse(reservations));

      const visits = localStorage.getItem('db_visits');
      if(visits) this._visitCount.set(parseInt(visits));
  }

  private incrementVisitCount() {
     // Simple incrementer. In real app, use session storage to avoid incrementing on every refresh.
     if(!sessionStorage.getItem('session_active')) {
        sessionStorage.setItem('session_active', 'true');
        this._visitCount.update(c => c + 1);
     }
  }

  // --- PUBLIC GETTERS ---
  getConfig() { return this._config.asReadonly(); }
  getCars() { return this._cars.asReadonly(); }
  getSaleCars() { return this._saleCars.asReadonly(); }
  getTours() { return this._tours.asReadonly(); }
  getBlogPosts() { return this._blogPosts.asReadonly(); }
  getReservations() { return this._reservations.asReadonly(); }
  getBlogPost(id: number) { return this._blogPosts().find(p => p.id === id); }
  getVisitCount() { return this._visitCount.asReadonly(); }

  // --- ADMIN ACTIONS ---
  
  updateConfig(newConfig: SiteConfig) {
    this._config.set(newConfig);
  }

  // Car Management (Add or Update)
  addCar(car: Car) {
      this._cars.update(c => {
          if (car.id && c.find(x => x.id === car.id)) {
              // Update existing
              return c.map(x => x.id === car.id ? car : x);
          } else {
              // Add new
              return [{ ...car, id: Date.now() }, ...c];
          }
      });
  }
  deleteCar(id: number) {
      this._cars.update(cars => cars.filter(c => c.id !== id));
  }

  addSaleCar(car: SaleCar) {
      this._saleCars.update(c => [...c, { ...car, id: Date.now() }]);
  }
  deleteSaleCar(id: number) {
      this._saleCars.update(cars => cars.filter(c => c.id !== id));
  }

  addBlogPost(post: BlogPost) {
      this._blogPosts.update(posts => [{ ...post, id: Date.now() }, ...posts]);
  }
  deleteBlogPost(id: number) {
      this._blogPosts.update(posts => posts.filter(p => p.id !== id));
  }

  addReservation(req: BookingRequest) {
      const newRes: BookingRequest = {
          ...req,
          id: `RES-${Math.floor(Math.random() * 10000)}`,
          status: 'PENDING',
          dateCreated: new Date()
      };
      this._reservations.update(res => [newRes, ...res]);
  }
  updateReservationStatus(id: string, status: 'APPROVED' | 'REJECTED') {
      this._reservations.update(res => res.map(r => r.id === id ? { ...r, status } : r));
  }

  setBookingRequest(request: BookingRequest) { this._bookingRequest.set(request); }
  getBookingRequest() { return this._bookingRequest(); }
  clearBookingRequest() { this._bookingRequest.set(null); }
  
  toggleFavorite(id: number) {
    this._favoriteCars.update(favs => favs.includes(id) ? favs.filter(f => f !== id) : [...favs, id]);
  }
  isFavorite(id: number) { return this._favoriteCars().includes(id); }
  getFavoriteCount = computed(() => this._favoriteCars().length);

  async getAIRecommendation(userQuery: string): Promise<string> {
    if (!process.env.API_KEY) {
      return `Üzgünüm, şu an bağlantı kurulamıyor. Lütfen telefonla bizi arayın: ${this._config().phone}`;
    }
    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const prompt = `
        Sen ${this._config().companyName} asistanısın.
        İletişim: ${this._config().phone}.
        Adres: ${this._config().address}.
        Soru: "${userQuery}"
        Kısa ve net cevap ver.
      `;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      return `Lütfen ${this._config().phone} numarasından bize ulaşın.`;
    }
  }
}
