
import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

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
        <div class="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-line">
            {{ content() }}
        </div>
      </div>
    </div>
  `
})
export class LegalComponent implements OnInit {
  route = inject(ActivatedRoute);
  title = signal('');
  content = signal('');

  ngOnInit() {
      this.route.data.subscribe(data => {
          this.title.set(data['title']);
          this.setContent(data['type']);
          window.scrollTo(0,0);
      });
  }

  setContent(type: string) {
      if (type === 'kvkk') {
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
      }
  }
}
