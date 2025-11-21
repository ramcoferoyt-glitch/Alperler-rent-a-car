
import { Injectable, signal, computed } from '@angular/core';
import { Car } from '../models/car.model';
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
  expertReport?: string; // Değişen/Boya durumu
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
  content: string; // Full content
  image: string;
  readTime: string;
  date: string;
}

export interface BookingRequest {
  type: 'RENTAL' | 'TOUR' | 'SALE_INQUIRY';
  item: Car | SaleCar | Tour | null; // Store the full object
  itemName: string;
  image?: string;
  basePrice?: number; // Daily price or full price
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
  bookingRequest = signal<BookingRequest | null>(null);
  favoriteCars = signal<number[]>([]); // Store IDs of favorite cars

  // İstenilen Modeller ve Güncel Fiyatlar
  private cars: Car[] = [
    // --- SUV GRUBU ---
    {
      id: 1,
      brand: 'Nissan',
      model: 'Qashqai',
      type: 'SUV',
      transmission: 'Otomatik',
      fuel: 'Dizel',
      price: 4500,
      image: 'https://images.unsplash.com/photo-1599940824399-b87987ce0799?q=80&w=1000&auto=format&fit=crop',
      seats: 5,
      features: ['Cam Tavan', 'Geri Görüş', 'Start-Stop'],
      isAvailable: true
    },
    {
      id: 2,
      brand: 'Peugeot',
      model: '3008',
      type: 'SUV',
      transmission: 'Otomatik',
      fuel: 'Dizel',
      price: 4800,
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1000&auto=format&fit=crop',
      seats: 5,
      features: ['Hayalet Ekran', 'E-Toggle', 'Şerit Takip'],
      isAvailable: true
    },
    {
      id: 3,
      brand: 'Volkswagen',
      model: 'Tiguan',
      type: 'SUV',
      transmission: 'Otomatik',
      fuel: 'Benzin',
      price: 5200,
      image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=1000&auto=format&fit=crop',
      seats: 5,
      features: ['IQ.Light', 'Cam Tavan', 'Apple CarPlay'],
      isAvailable: false // Dolu
    },
    {
      id: 4,
      brand: 'Peugeot',
      model: '2008',
      type: 'SUV',
      transmission: 'Otomatik',
      fuel: 'Benzin',
      price: 4200,
      image: 'https://images.unsplash.com/photo-1628278236003-015c6d772499?q=80&w=1000&auto=format&fit=crop',
      seats: 5,
      features: ['3D Kokpit', 'Geri Görüş', 'LED Far'],
      isAvailable: true
    },

    // --- PİKAP (ARAZİ) GRUBU ---
    {
      id: 20,
      brand: 'Toyota',
      model: 'Hilux 4x4',
      type: 'Pickup',
      transmission: 'Otomatik',
      fuel: 'Dizel',
      price: 5500,
      image: 'https://images.unsplash.com/photo-1605218457336-92e4a6001a0d?q=80&w=1000&auto=format&fit=crop',
      seats: 5,
      features: ['Arazi Modu', 'Diferansiyel Kilidi', 'Güçlü Motor'],
      isAvailable: true
    },
    {
      id: 21,
      brand: 'Volkswagen',
      model: 'Amarok V6',
      type: 'Pickup',
      transmission: 'Otomatik',
      fuel: 'Dizel',
      price: 6000,
      image: 'https://images.unsplash.com/photo-1533558701576-23c65e0272fb?q=80&w=1000&auto=format&fit=crop',
      seats: 5,
      features: ['V6 Motor', 'Koltuk Isıtma', 'Off-Road'],
      isAvailable: true
    },
    {
      id: 22,
      brand: 'Ford',
      model: 'Ranger',
      type: 'Pickup',
      transmission: 'Otomatik',
      fuel: 'Dizel',
      price: 5800,
      image: 'https://images.unsplash.com/photo-1566008885218-90abf9200ddb?q=80&w=1000&auto=format&fit=crop',
      seats: 5,
      features: ['Wildtrak', '4x4', 'Sync Ekran'],
      isAvailable: false
    },

    // --- SEDAN GRUBU ---
    {
      id: 8,
      brand: 'Volkswagen',
      model: 'Passat',
      type: 'Sedan',
      transmission: 'Otomatik',
      fuel: 'Dizel',
      price: 5000,
      image: 'https://images.unsplash.com/photo-1541348263662-e068662d82af?q=80&w=1000&auto=format&fit=crop',
      seats: 5,
      features: ['Makam Aracı', 'Geniş İç Hacim', 'Konfor'],
      isAvailable: true
    },
    {
      id: 10,
      brand: 'Volkswagen',
      model: 'Jetta',
      type: 'Sedan',
      transmission: 'Otomatik',
      fuel: 'Benzin',
      price: 4000,
      image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?q=80&w=1000&auto=format&fit=crop',
      seats: 5,
      features: ['Ekonomik', 'Geniş Bagaj', 'DSG'],
      isAvailable: true
    },
    {
      id: 11,
      brand: 'Ford',
      model: 'Focus',
      type: 'Sedan',
      transmission: 'Otomatik',
      fuel: 'Dizel',
      price: 4100,
      image: 'https://images.unsplash.com/photo-1618605962310-51f78d5b6971?q=80&w=1000&auto=format&fit=crop',
      seats: 5,
      features: ['Yol Tutuş', 'Sessiz Kabin', 'Multimedya'],
      isAvailable: true
    },

    // --- HATCHBACK GRUBU ---
    {
      id: 5,
      brand: 'Volkswagen',
      model: 'Golf',
      type: 'Hatchback',
      transmission: 'Otomatik',
      fuel: 'Benzin',
      price: 4200,
      image: 'https://images.unsplash.com/photo-1533661171276-507935010789?q=80&w=1000&auto=format&fit=crop',
      seats: 5,
      features: ['Kompakt', 'Güvenli', 'Dijital Kadran'],
      isAvailable: true
    },
    {
      id: 6,
      brand: 'Hyundai',
      model: 'i20',
      type: 'Hatchback',
      transmission: 'Otomatik',
      fuel: 'Benzin',
      price: 3800,
      image: 'https://images.unsplash.com/photo-1617430026658-344f2d545de1?q=80&w=1000&auto=format&fit=crop',
      seats: 5,
      features: ['Pratik', 'Yakıt Cimrisi', 'Geri Görüş'],
      isAvailable: true
    },

    // --- VIP / MİNİBÜS ---
    {
      id: 15,
      brand: 'Mercedes-Benz',
      model: 'Vito VIP',
      type: 'Luxury',
      transmission: 'Otomatik',
      fuel: 'Dizel',
      price: 7500,
      image: 'https://images.unsplash.com/photo-1566704988768-f7210284e066?q=80&w=1000&auto=format&fit=crop',
      seats: 9,
      features: ['Şoförlü Hizmet', 'TV & Buzdolabı', 'Deri Koltuk'],
      isAvailable: true
    }
  ];

  private saleCars: SaleCar[] = [
    // PREMIUM ARAÇLAR
    {
      id: 101,
      brand: 'Mercedes-Benz',
      model: 'C 200 4MATIC AMG',
      year: 2023,
      km: 12000,
      price: 3650000,
      image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1000&auto=format&fit=crop',
      description: 'Hatasız, boyasız, sıfır ayarında. AMG paket, gece paketi.',
      features: ['Cam Tavan', 'Burmester', 'Otonom', '360 Kamera'],
      expertReport: 'Hatasız, Boyasız, Tramer Yok',
      transmission: 'Otomatik',
      fuel: 'Benzin'
    },
    {
      id: 102,
      brand: 'Volkswagen',
      model: 'Passat 1.5 TSI Business',
      year: 2022,
      km: 35000,
      price: 2150000,
      image: 'https://images.unsplash.com/photo-1518987048-93e29699e79a?q=80&w=1000&auto=format&fit=crop',
      description: 'Yetkili servis bakımlı, garantisi devam ediyor.',
      features: ['Keyless', 'CarPlay', 'LED Far', 'Tablet Ekran'],
      expertReport: 'Sol Ön Çamurluk Lokal Boyalı',
      transmission: 'Otomatik',
      fuel: 'Benzin'
    },
    {
      id: 105,
      brand: 'Toyota',
      model: 'Hilux 4x4 Adventure',
      year: 2023,
      km: 15000,
      price: 2450000,
      image: 'https://images.unsplash.com/photo-1605218457336-92e4a6001a0d?q=80&w=1000&auto=format&fit=crop',
      description: 'Arazi görmemiş, şehir içinde kullanılmış, aksesuarlı.',
      features: ['Kasa Havuzu', 'Roll Bar', 'Geri Görüş', 'Deri Koltuk'],
      expertReport: 'Hatasız, Boyasız',
      transmission: 'Otomatik',
      fuel: 'Dizel'
    },
    {
      id: 106,
      brand: 'Audi',
      model: 'A6 45 TFSI',
      year: 2021,
      km: 58000,
      price: 4200000,
      image: 'https://images.unsplash.com/photo-1606152421811-aa2dd521f1e0?q=80&w=1000&auto=format&fit=crop',
      description: 'Quattro S-Line, Matrix Far, Vakumlu Kapılar.',
      features: ['Matrix LED', 'Vakum', 'Hayalet', 'Navigasyon'],
      expertReport: 'Tampon Değişimi Kaynaklı 25.000 TL Tramer',
      transmission: 'Otomatik',
      fuel: 'Benzin'
    },
    // EKONOMİK / UYGUN FİYATLI ARAÇLAR (YENİ EKLENENLER)
    {
      id: 107,
      brand: 'Fiat',
      model: 'Egea 1.4 Fire Easy',
      year: 2020,
      km: 85000,
      price: 750000,
      image: 'https://images.unsplash.com/photo-1623206303446-39e48b254382?q=80&w=1000&auto=format&fit=crop',
      description: 'Aile aracı, yakıt cimrisi, bakımları tam.',
      features: ['Yokuş Kalkış', 'Klima', 'Bluetooth', 'ABS'],
      expertReport: 'Sol kapı boyalı, harici hatasız.',
      transmission: 'Manuel',
      fuel: 'Benzin'
    },
    {
      id: 108,
      brand: 'Renault',
      model: 'Clio 1.5 dCi Joy',
      year: 2019,
      km: 110000,
      price: 680000,
      image: 'https://images.unsplash.com/photo-1620591229456-146b315f5371?q=80&w=1000&auto=format&fit=crop',
      description: 'Şehir içi ideal, çok az yakar, masrafsız.',
      features: ['Start-Stop', 'Hız Sabitleme', 'LED Gündüz', 'Kartlı Sistem'],
      expertReport: 'Tavan hariç temizlik boyalı, şase podye orjinal.',
      transmission: 'Manuel',
      fuel: 'Dizel'
    },
    {
      id: 109,
      brand: 'Hyundai',
      model: 'i20 1.4 MPI Jump',
      year: 2021,
      km: 45000,
      price: 820000,
      image: 'https://images.unsplash.com/photo-1606237646992-35a0638c2325?q=80&w=1000&auto=format&fit=crop',
      description: 'Otomatik vites konforu, bayan kullanıcıdan, temiz.',
      features: ['Otomatik Vites', 'Park Sensörü', '4 Cam Otomatik', 'USB/AUX'],
      expertReport: 'Hatasız, Boyasız, Tramersiz.',
      transmission: 'Otomatik',
      fuel: 'Benzin'
    }
  ];

  // GÜNCELLENMİŞ TURLAR (Cilo, Sat, Oremar, Avaşin)
  private tours: Tour[] = [
    {
      id: 1,
      title: 'Cilo Dağları & Buzullar Zirvesi',
      duration: 'Tam Gün',
      price: 4500,
      description: 'Türkiye’nin en yüksek 2. zirvesi ve 4 mevsim erimeyen buzullarına efsanevi bir yolculuk.',
      highlights: ['Uludoruk Buzulları', 'Cennet-Cehennem Vadisi', 'Yayla Kahvaltısı'],
      image: 'https://picsum.photos/id/1036/800/600'
    },
    {
      id: 2,
      title: 'Sat Buzul Gölleri & Şelaleler',
      duration: 'Tam Gün',
      price: 4000,
      description: '3000 metre rakımda turkuaz rengi göllerin ve gürül gürül akan şelalelerin eşsiz manzarası.',
      highlights: ['Sat Gölleri', 'Doğa Yürüyüşü', 'Piknik', 'Fotoğraf Safari'],
      image: 'https://picsum.photos/id/1043/800/600'
    },
    {
      id: 3,
      title: 'Avaşin Kanyonu & Oremar (Dağlıca)',
      duration: 'Tam Gün',
      price: 4200,
      description: 'Avaşin suyunun serinliği ve Oremar bölgesinin bakir doğasında off-road macerası.',
      highlights: ['Oremar Vadisi', 'Avaşin Kanyonu', 'Kaya Mezarları', 'Yerel Lezzetler'],
      image: 'https://picsum.photos/id/1018/800/600'
    },
    {
      id: 4,
      title: 'Şemdinli Nehri & Tarihi Keşif',
      duration: 'Günübirlik',
      price: 3500,
      description: 'Tarihi Taş Köprü ve Nehri bölgesindeki manevi atmosferi keşfedin.',
      highlights: ['Taş Köprü', 'Kayme Sarayı', 'Bal & Ceviz Alışverişi'],
      image: 'https://picsum.photos/id/1040/800/600'
    }
  ];

  // GÜNCELLENMİŞ BLOG YAZILARI (15 ADET - GÜVEN VE HİKAYE ODAKLI)
  private blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Cilo Dağları'nda Bir Masal: Buzullara Yolculuk",
      summary: "Yüksekova'nın saklı cenneti Cilo Dağları ve Cennet-Cehennem Vadisi gezi rehberi.",
      image: "https://picsum.photos/id/1036/1200/800",
      readTime: "6 dk okuma",
      date: "25 Mayıs 2024",
      content: `
        <p class="mb-4 text-lg">Yüksekova, sadece bir şehir değil, doğanın en cömert davrandığı coğrafyalardan biridir. Cilo Dağları, Türkiye'nin en yüksek ikinci zirvesi olan Uludoruk'a ev sahipliği yapar. Dört mevsim erimeyen buzulları, rengarenk çiçeklerle kaplı <strong>Cennet-Cehennem Vadisi</strong> ile ziyaretçilerine unutulmaz anlar yaşatır.</p>
        <h3 class="text-2xl font-bold text-slate-900 mt-6 mb-4">Nasıl Gidilir?</h3>
        <p class="mb-4">Cilo Dağları'na ulaşım zorlu arazi şartları gerektirir. Alperler Rent A Car olarak, 4x4 arazi araçlarımızla (Toyota Hilux, VW Amarok) sizi güvenle bu zirvelere taşıyoruz. Özellikle yaz aylarında düzenlenen festivallerle bölge tam bir cazibe merkezine dönüşmektedir.</p>
        <h3 class="text-2xl font-bold text-slate-900 mt-6 mb-4">Görülmesi Gerekenler</h3>
        <ul class="list-disc pl-6 space-y-2 mb-4">
            <li><strong>Mergan Yaylası:</strong> Buzullara giden yolun başlangıcı.</li>
            <li><strong>Buzul Gölleri:</strong> Turkuaz renkli sularıyla büyüleyici.</li>
            <li><strong>Buzul Mağaraları:</strong> Doğanın binlerce yılda oluşturduğu sanat eserleri.</li>
        </ul>
        <p>Bu eşsiz deneyimi yaşarken yanınızda Alperler ailesinin güvencesini hissedeceksiniz.</p>
      `
    },
    {
      id: 2,
      title: "Hüznün ve Güzelliğin Çiçeği: Ters Lale",
      summary: "Hakkari'nin simgesi, ağlayan gelin 'Ters Lale'yi görmeniz için en iyi zamanlar.",
      image: "https://picsum.photos/id/200/1200/800",
      readTime: "4 dk okuma",
      date: "10 Nisan 2024",
      content: `
        <p class="mb-4 text-lg">Dünyada eşi benzeri az bulunan, halk arasında 'Ağlayan Gelin' olarak bilinen <strong>Ters Lale</strong>, Hakkari dağlarının en kıymetli hazinesidir. Her yıl sadece 15-20 gün hayatta kalan bu nadide çiçek, doğanın bize sunduğu kısa ama büyüleyici bir görsel şölendir.</p>
        <p class="mb-4">İlkbaharın gelişiyle birlikte Yüksekova ve Şemdinli dağlarında boy gösteren Ters Laleleri görmek için dünyanın dört bir yanından fotoğrafçılar gelmektedir. Alperler Rent A Car ile konforlu bir yolculuk yaparak, bu endemik bitkiyi doğal ortamında fotoğraflayabilirsiniz.</p>
        <p class="font-bold italic">Doğayı korumak ve bu güzelliği gelecek nesillere aktarmak hepimizin görevidir.</p>
      `
    },
    {
      id: 3,
      title: "Neden Alperler Rent A Car? Bir Aile Sözü.",
      summary: "Bizi diğerlerinden ayıran sadece araçlarımız değil, size verdiğimiz 'Aile Sözü'dür.",
      image: "https://picsum.photos/id/300/1200/800",
      readTime: "3 dk okuma",
      date: "01 Ocak 2024",
      content: `
        <p class="mb-4 text-lg">Araç kiralama sektörü genellikle soğuk ve mesafelidir. Ancak Alperler Rent A Car'da durum farklıdır. Biz, <strong>İshak Alper</strong> ve <strong>Ferhat Alper</strong> önderliğinde, Hicran Hanım'ın titizliğiyle yönetilen büyük bir aileyiz.</p>
        <p class="mb-4">Bir aracın anahtarını size teslim ettiğimizde, sadece bir metal yığını değil, kendi ailemizin bir ferdini emanet eder gibi davranırız. Araçlarımızın bakımı, temizliği ve güvenliği, kendi çocuklarımızı taşıyacakmışız gibi yapılır.</p>
        <p class="mb-4">Yolda kaldığınızda, bir sorununuz olduğunda karşınızda bir çağrı merkezi değil, doğrudan bizi, yani ailenizi bulursunuz. Bu yüzden sloganımız: <strong>'Hayallerinizin Yol Arkadaşı'</strong>.</p>
      `
    },
    {
      id: 4,
      title: "Sat Buzul Gölleri: Gökyüzünün Yeryüzündeki Aynası",
      summary: "3000 metrede kamp yapmanın ve yıldızlara dokunmanın büyüsü.",
      image: "https://picsum.photos/id/400/1200/800",
      readTime: "5 dk okuma",
      date: "15 Temmuz 2024",
      content: `
        <p class="mb-4 text-lg">Hakkari Cilo-Sat dağları silsilesinde yer alan Sat Gölleri, görenleri kendine hayran bırakan turkuaz rengiyle bilinir. Burası sadece bir manzara değil, ruhunuzu dinlendirebileceğiniz bir terapidir.</p>
        <p class="mb-4">Göllere ulaşım, off-road deneyimi gerektiren keyifli ama dikkatli olunması gereken bir yoldur. Filomuzdaki 4x4 araçlar (Amarok, Hilux, Ranger), bu yolların ustasıdır. Kendi aracınızla gelmek yerine, bölgeyi bilen ve aracına güvenen bir firmayla yola çıkmak, tatilinizi kabusa değil, anıya dönüştürür.</p>
      `
    },
    {
      id: 5,
      title: "Hakkari Mutfağı: Doğallığın Lezzete Dönüşümü",
      summary: "Yüksekova'ya gelip de yemeden dönmemeniz gereken yerel lezzetler.",
      image: "https://picsum.photos/id/500/1200/800",
      readTime: "4 dk okuma",
      date: "20 Ağustos 2024",
      content: `
        <p class="mb-4 text-lg">Hakkari mutfağı, dağların bereketiyle şekillenmiştir. Yüksekova'ya geldiğinizde mutlaka tatmanız gerekenler:</p>
        <ul class="list-disc pl-6 space-y-2 mb-4">
            <li><strong>Doğaba:</strong> Yöresel buğday ve etle yapılan eşsiz bir çorba.</li>
            <li><strong>Kepaye:</strong> Bağırsak dolması olarak bilinir, zahmetli ama çok lezzetlidir.</li>
            <li><strong>Otlu Peynir:</strong> Yüksekova yaylalarının şifalı otlarıyla hazırlanan kahvaltıların vazgeçilmezi.</li>
        </ul>
        <p>Şehri keşfederken, yerel lokantaları ziyaret etmeniz için size özel rota önerilerimiz her zaman hazırdır.</p>
      `
    },
    {
      id: 6,
      title: "Kışın Yüksekova'da Araç Kullanma Tüyoları",
      summary: "Karlı ve buzlu yollarda güvenli sürüş için altın değerinde tavsiyeler.",
      image: "https://picsum.photos/id/600/1200/800",
      readTime: "5 dk okuma",
      date: "10 Aralık 2023",
      content: `
        <p class="mb-4 text-lg">Yüksekova'da kış şartları çetin geçer. Alperler Rent A Car olarak araçlarımızı kışa %100 hazır hale getiririz (Kar lastikleri, antifriz bakımları). Ancak sürücü olarak sizin de dikkat etmeniz gerekenler var:</p>
        <ul class="list-disc pl-6 space-y-2 mb-4">
            <li>Ani fren ve gazdan kaçının.</li>
            <li>Takip mesafesini normalin iki katına çıkarın.</li>
            <li>Gizli buzlanmaya karşı köprü ve viyadüklerde yavaşlayın.</li>
        </ul>
        <p>Bizimle yola çıktığınızda, bagajınızda zincir ve çekme halatı gibi acil durum ekipmanlarının hazır olduğunu bilmenin huzurunu yaşarsınız.</p>
      `
    },
    {
      id: 7,
      title: "Düğün Konvoylarının Vazgeçilmezi: VIP Araçlar",
      summary: "En özel gününüzde konfor ve prestij bir arada.",
      image: "https://picsum.photos/id/700/1200/800",
      readTime: "3 dk okuma",
      date: "05 Eylül 2024",
      content: `
        <p class="mb-4 text-lg">Yüksekova düğünleri meşhurdur, kalabalıktır ve coşkuludur. Bu özel günde gelin ve damat için en prestijli araçları sunuyoruz. Siyah Mercedes Vito VIP araçlarımız veya lüks sedanlarımızla (Passat, Audi), konvoyun en göz alıcı aracı sizinki olacak.</p>
        <p>Şoförlü kiralama seçeneğimizle, damat beyin araba kullanma stresini alıyor, bu mutlu günün tadını çıkarmasını sağlıyoruz.</p>
      `
    },
    {
      id: 8,
      title: "Zap Vadisi: Manzaranın Kalbi",
      summary: "Hakkari'ye giden yol üzerinde sizi karşılayan muhteşem vadi.",
      image: "https://picsum.photos/id/800/1200/800",
      readTime: "4 dk okuma",
      date: "12 Mayıs 2024",
      content: `
        <p class="mb-4 text-lg">Zap Suyu, hırçınlığıyla bilinir. Zap Vadisi ise kıvrıla kıvrıla akan nehrin kenarında yükselen dağlarıyla büyüleyicidir. Yüksekova'dan Hakkari merkeze giderken bu vadiden geçersiniz.</p>
        <p>Yol kenarındaki tesislerde durup bir çay içmek, Zap'ın sesini dinlemek yolculuğun en güzel kısmıdır. Araçlarımızdaki panoramik cam tavan seçenekleri (Qashqai, Tiguan) ile bu manzarayı aracın içinden bile doyasıya yaşayabilirsiniz.</p>
      `
    },
    {
      id: 9,
      title: "Yüksekova Havalimanı Transfer Hizmetimiz",
      summary: "Uçaktan indiğiniz an sizi bekleyen konfor.",
      image: "https://picsum.photos/id/900/1200/800",
      readTime: "2 dk okuma",
      date: "01 Şubat 2024",
      content: `
        <p class="mb-4 text-lg">Selahaddin Eyyubi Havalimanı'na indiğinizde taksi arama veya valiz taşıma derdiniz olmasın. Alperler Rent A Car olarak, uçağınızın iniş saatini takip ediyor ve sizi kapıda karşılıyoruz.</p>
        <p>İster şoförlü transfer, ister aracınızı teslim alıp kendiniz sürme seçeneği. Bizim için önemli olan, Yüksekova'ya adım attığınız ilk andan itibaren kendinizi güvende hissetmenizdir.</p>
      `
    },
    {
      id: 10,
      title: "Oremar ve Avaşin: Doğanın En Bakir Hali",
      summary: "Sadece cesur gezginlerin keşfedebileceği saklı rotalar.",
      image: "https://picsum.photos/id/1000/1200/800",
      readTime: "6 dk okuma",
      date: "20 Haziran 2024",
      content: `
        <p class="mb-4 text-lg">Oremar (Dağlıca) bölgesi, yüksek dağların arasında kalmış, yeşilin ve suyun dans ettiği bir cennettir. Avaşin kanyonu boyunca yapacağınız yolculuk, size Türkiye'de değil, İsviçre Alplerinde olduğunuzu hissettirebilir.</p>
        <p>Bu bölgelere düzenlenen turlarımızda, bölgeyi avucunun içi gibi bilen kaptanımız <strong>Erkan Baykal</strong> rehberliğinde, güvenli ve keyifli bir keşif yapabilirsiniz.</p>
      `
    },
    {
      id: 11,
      title: "Erken Rezervasyon Neden Önemli?",
      summary: "Tatilinizi riske atmayın, aracınızı şimdiden ayırtın.",
      image: "https://picsum.photos/id/1011/1200/800",
      readTime: "3 dk okuma",
      date: "01 Mart 2024",
      content: `
        <p class="mb-4 text-lg">Yaz sezonunda ve bayramlarda Yüksekova'da araç bulmak neredeyse imkansız hale gelebilir. Gurbetçilerimizin gelişi ve düğün sezonunun açılmasıyla yoğunluk artar.</p>
        <p>Erken rezervasyon yaparak hem istediğiniz aracı garantilersiniz hem de %15'e varan indirimlerden faydalanırsınız. Planlı olmak, her zaman kazandırır.</p>
      `
    },
    {
      id: 12,
      title: "Hakkari'de Trekking ve Dağcılık",
      summary: "Adrenalin tutkunları için zirve rotaları.",
      image: "https://picsum.photos/id/1015/1200/800",
      readTime: "5 dk okuma",
      date: "15 Ağustos 2024",
      content: `
        <p class="mb-4 text-lg">Cilo Reşko ve Sümbül Dağı, dağcılar için birer mabettir. Profesyonel ekipman ve rehber gerektiren bu tırmanışlar için lojistik destek sağlıyoruz.</p>
        <p>Ekipmanlarınızı geniş bagajlı Pick-up araçlarımızla (Hilux, Ranger) ana kampa kadar taşıyabilirsiniz. Doğayla baş başa kalmak, insanın kendi içine yaptığı en güzel yolculuktur.</p>
      `
    },
    {
      id: 13,
      title: "İkinci El Araç Alırken Nelere Dikkat Etmeli?",
      summary: "Alperler Otomotiv güvencesiyle araç sahibi olmanın püf noktaları.",
      image: "https://picsum.photos/id/1025/1200/800",
      readTime: "4 dk okuma",
      date: "10 Ekim 2024",
      content: `
        <p class="mb-4 text-lg">Araç almak ciddi bir iştir. Boya, değişen, motor durumu derken kafanız karışabilir. Biz sattığımız her aracın arkasındayız.</p>
        <p>Şeffaf ekspertiz raporlarımız, satış sonrası desteğimiz ve takas imkanlarımızla, sizi hayalinizdeki araca kavuşturuyoruz. Galerimizde 'Sürpriz'e yer yok, 'Güven'e yer var.</p>
      `
    },
    {
      id: 14,
      title: "Yüksekova'nın Tarihi Taş Köprüleri",
      summary: "Şemdinli yolu üzerindeki asırlık şahitler.",
      image: "https://picsum.photos/id/1035/1200/800",
      readTime: "3 dk okuma",
      date: "22 Eylül 2024",
      content: `
        <p class="mb-4 text-lg">Şemdinli Taş Köprü ve Nehri bölgesindeki tarihi yapılar, geçmiş medeniyetlerin izlerini taşır. Fotoğrafçılar için harika kareler sunan bu lokasyonlar, günübirlik gezilerimizden biridir.</p>
        <p>Tarihin dokusuna dokunmak ve o atmosferi solumak için bir hafta sonunuzu ayırmanız yeterli.</p>
      `
    },
    {
      id: 15,
      title: "Alperler Ailesi Olarak Sosyal Sorumluluklarımız",
      summary: "Sadece ticaret değil, memleketimize değer katmak için çalışıyoruz.",
      image: "https://picsum.photos/id/1045/1200/800",
      readTime: "3 dk okuma",
      date: "29 Ekim 2024",
      content: `
        <p class="mb-4 text-lg">Yüksekova bizim evimiz. Kazandığımızı bu topraklara yatırıyor, yerel istihdama katkı sağlıyoruz. Öğrencilere verdiğimiz destekler, çevre temizliği etkinliklerimiz ve kültürel festivallere sponsorluklarımızla, şehrimize borcumuzu ödüyoruz.</p>
        <p>Bizi tercih ettiğinizde, sadece bir şirketle değil, bu şehrin gelişimine katkı sağlayan bir organizasyonla çalışmış oluyorsunuz.</p>
      `
    }
  ];

  private genAI: GoogleGenAI;
  
  constructor() {
    this.genAI = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  getCars() {
    return signal<Car[]>(this.cars);
  }

  getSaleCars() {
    return signal<SaleCar[]>(this.saleCars);
  }

  getTours() {
    return signal<Tour[]>(this.tours);
  }

  getBlogPosts() {
    return signal<BlogPost[]>(this.blogPosts);
  }

  getBlogPost(id: number) {
    return this.blogPosts.find(p => p.id === id);
  }

  setBookingRequest(request: BookingRequest) {
    this.bookingRequest.set(request);
  }

  getBookingRequest() {
    return this.bookingRequest();
  }

  clearBookingRequest() {
    this.bookingRequest.set(null);
  }

  toggleFavorite(id: number) {
    this.favoriteCars.update(favs => {
      if (favs.includes(id)) {
        return favs.filter(f => f !== id);
      } else {
        return [...favs, id];
      }
    });
  }

  isFavorite(id: number) {
    return this.favoriteCars().includes(id);
  }

  getFavoriteCount = computed(() => this.favoriteCars().length);

  async getAIRecommendation(userQuery: string): Promise<string> {
    if (!process.env.API_KEY) {
      return "Üzgünüm, şu an bağlantı kurulamıyor. Lütfen telefonla bizi arayın: 0537 959 48 51";
    }
    
    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const prompt = `
        Sen Yüksekova Alperler Rent A Car asistanısın.
        İletişim: 0537 959 48 51.
        Adres: Hakkari Yüksekova Merkez.
        Soru: "${userQuery}"
        Kısa ve net cevap ver. Turlarımız (Cilo, Sat, Oremar, Avaşin) ve araçlarımız hakkında bilgi ver.
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      return "Lütfen 0537 959 48 51 numarasından bize ulaşın.";
    }
  }
}
