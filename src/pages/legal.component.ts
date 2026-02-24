
import { Component, inject, OnInit, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-legal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white min-h-screen pt-28 pb-20 font-sans">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-8 pb-4 border-b border-slate-200">
            {{ title() }}
        </h1>
        <div class="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-line" [innerHTML]="content()">
        </div>
        
        <div class="mt-8 text-center">
            <button (click)="close()" class="bg-slate-900 text-white px-6 py-2 rounded-lg font-bold hover:bg-slate-700 transition-colors">Kapat</button>
        </div>
      </div>
    </div>
  `
})
export class LegalComponent implements OnInit {
  route = inject(ActivatedRoute);
  uiService = inject(UiService);
  title = signal('');
  content = signal('');

  constructor() {
      effect(() => {
          const type = this.uiService.legalType();
          if (type) {
              this.setContent(type);
          }
      });
  }

  ngOnInit() {
      this.route.data.subscribe(data => {
          if (data['type']) {
             this.title.set(data['title']);
             this.setContent(data['type']);
             window.scrollTo(0,0);
          }
      });
  }

  close() {
      this.uiService.openLegal(null as any); // Close overlay
  }

  setContent(type: string) {
      if (type === 'kvkk') {
          this.title.set('KVKK Aydınlatma Metni');
          this.content.set(`
            <strong>KİŞİSEL VERİLERİN KORUNMASI KANUNU (KVKK) AYDINLATMA METNİ</strong>

            Alperler Rent A Car olarak, kişisel verilerinizin güvenliğine en üst düzeyde önem veriyoruz. 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında, veri sorumlusu sıfatıyla sizleri aydınlatmak isteriz.

            <strong>1. İşlenen Kişisel Verileriniz</strong>
            Adınız, soyadınız, T.C. kimlik numaranız, ehliyet bilgileriniz, telefon numaranız, adresiniz ve ödeme bilgileriniz hizmetlerimizin ifası amacıyla işlenmektedir.

            <strong>2. Veri İşleme Amacı</strong>
            - Araç kiralama sözleşmelerinin düzenlenmesi,
            - Yasal yükümlülüklerin (Emniyet bildirimleri vb.) yerine getirilmesi,
            - Fatura düzenlenmesi ve muhasebe işlemleri,
            - Müşteri memnuniyeti ve destek süreçlerinin yönetilmesi.

            <strong>3. Verilerin Aktarımı</strong>
            Kişisel verileriniz, yasal zorunluluklar (Emniyet Genel Müdürlüğü, Vergi Daireleri) dışında üçüncü şahıslarla asla paylaşılmamaktadır.

            <strong>4. Haklarınız</strong>
            KVKK'nın 11. maddesi uyarınca; verilerinizin işlenip işlenmediğini öğrenme, düzeltme talep etme ve silinmesini isteme haklarına sahipsiniz.
          `);
      } else if (type === 'privacy') {
          this.title.set('Gizlilik Politikası');
          this.content.set(`
            <strong>GİZLİLİK POLİTİKASI</strong>

            Alperler Rent A Car ("Şirket"), web sitesi ziyaretçilerinin ve müşterilerinin gizliliğini korumayı taahhüt eder.

            <strong>1. Bilgi Toplama</strong>
            Web sitemiz üzerinden yapılan rezervasyonlar ve iletişim formları aracılığıyla sağladığınız bilgiler, yalnızca talep ettiğiniz hizmeti sunmak amacıyla toplanır.

            <strong>2. Bilgi Güvenliği</strong>
            Şirketimiz, verilerinizi yetkisiz erişime, kayba veya ifşaya karşı korumak için endüstri standardı güvenlik önlemleri (SSL şifreleme vb.) kullanmaktadır.

            <strong>3. Üçüncü Taraf Bağlantıları</strong>
            Sitemiz, blog yazıları veya referanslar kapsamında üçüncü taraf web sitelerine bağlantılar içerebilir. Bu sitelerin gizlilik uygulamalarından Alperler Rent A Car sorumlu değildir.

            <strong>4. İletişim</strong>
            Gizlilik politikamızla ilgili sorularınız için info@alperlerrentacar.com adresinden bize ulaşabilirsiniz.
          `);
      } else if (type === 'cookies') {
          this.title.set('Çerez Politikası');
          this.content.set(`
            <strong>ÇEREZ (COOKIE) POLİTİKASI</strong>

            Web sitemizde, kullanıcı deneyiminizi geliştirmek ve sitenin verimli çalışmasını sağlamak amacıyla çerezler kullanılmaktadır.

            <strong>1. Çerez Nedir?</strong>
            Çerezler, ziyaret ettiğiniz web siteleri tarafından tarayıcınız aracılığıyla cihazınıza kaydedilen küçük metin dosyalarıdır.

            <strong>2. Kullanılan Çerez Türleri</strong>
            - <strong>Zorunlu Çerezler:</strong> Sitenin temel fonksiyonlarının çalışması için gereklidir (Örn: Rezervasyon süreci).
            - <strong>Analitik Çerezler:</strong> Ziyaretçi sayısını ve trafik kaynaklarını ölçmemize yarar. Bu veriler anonim olarak işlenir.

            <strong>3. Çerez Yönetimi</strong>
            Tarayıcı ayarlarınızı değiştirerek çerezleri reddetme veya silme hakkına sahipsiniz. Ancak bu durumda sitemizin bazı fonksiyonları düzgün çalışmayabilir.
          `);
      } else if (type === 'terms') {
          this.title.set('Kiralama Koşulları');
          this.content.set(`
            <strong>ARAÇ KİRALAMA KOŞULLARI</strong>

            <strong>1. Ehliyet ve Yaş Sınırı</strong>
            Ekonomik grup araçlar için en az 21 yaş ve 2 yıllık ehliyet, orta ve üst grup araçlar için en az 25 yaş ve 3 yıllık ehliyet gerekmektedir.

            <strong>2. Kiralama Süresi</strong>
            En az kiralama süresi 24 saattir. Gecikmelerde her saat için günlük ücretin 1/3'ü, 3 saati aşan gecikmelerde tam gün ücreti tahsil edilir.

            <strong>3. Ödeme ve Depozito</strong>
            Kiralama başlangıcında toplam kira bedeli tahsil edilir. Araç grubuna göre değişen tutarlarda kredi kartından provizyon (depozito) alınır.

            <strong>4. Yakıt Politikası</strong>
            Araçlar teslim edildiği yakıt seviyesinde iade alınır. Eksik yakıtla iade durumunda yakıt bedeli + %20 hizmet bedeli tahsil edilir.

            <strong>5. Sigorta ve Kasko</strong>
            Tüm araçlarımızda Rent A Car kaskosu bulunmaktadır. Ancak alkollü kullanım, rapor tutulmaması veya kasko kapsamı dışındaki durumlarda hasar bedeli kiracıya aittir.
          `);
      }
  }
}
