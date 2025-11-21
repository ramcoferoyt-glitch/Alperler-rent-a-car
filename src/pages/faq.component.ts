
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-slate-50 min-h-screen pt-28 pb-20 font-sans">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
           <h1 class="font-serif text-4xl font-bold text-slate-900 mb-4">Sıkça Sorulan Sorular</h1>
           <p class="text-slate-500">Aklınıza takılan tüm soruların cevapları burada.</p>
        </div>

        <div class="space-y-4">
           @for (faq of faqs; track $index) {
              <div class="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md group">
                 <button (click)="toggleFaq($index)" class="w-full flex justify-between items-center p-6 text-left focus:outline-none bg-white hover:bg-slate-50 transition-colors">
                    <span class="font-bold text-slate-900 text-lg group-hover:text-amber-600 transition-colors">{{ faq.question }}</span>
                    <span class="text-slate-400 transform transition-transform duration-300 bg-slate-100 rounded-full p-1" [class.rotate-180]="faq.isOpen">
                       <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                    </span>
                 </button>
                 <div class="bg-slate-50 text-slate-600 leading-relaxed overflow-hidden transition-all duration-300" 
                      [style.max-height]="faq.isOpen ? '500px' : '0'"
                      [style.opacity]="faq.isOpen ? '1' : '0'">
                    <div class="p-6 pt-0 border-t border-slate-100 mt-2">
                       {{ faq.answer }}
                    </div>
                 </div>
              </div>
           }
        </div>
      </div>
    </div>
  `
})
export class FaqComponent {
  faqs = [
    {
      question: "Araç kiralama için hangi belgeler gerekli?",
      answer: "Geçerli ehliyet, kimlik belgesi ve kredi kartı yeterlidir. Yabancı uyruklu müşterilerimiz için pasaport ve uluslararası ehliyet gereklidir.",
      isOpen: false
    },
    {
      question: "Minimum kiralama süresi nedir?",
      answer: "Minimum kiralama süremiz 1 gündür. Saatlik kiralama hizmetimiz bulunmamaktadır.",
      isOpen: false
    },
    {
      question: "Araçları başka şehirde teslim edebilir miyim?",
      answer: "Evet, ek ücret karşılığında farklı şehirlerde araç teslimi yapabilirsiniz. Detaylar için 0537 959 48 51 numaralı hattımızdan bizimle iletişime geçin.",
      isOpen: false
    },
    {
      question: "Hasar durumunda ne yapmalıyım?",
      answer: "Herhangi bir hasar durumunda derhal 0537 959 48 51 numaralı hattımızdan bizimle iletişime geçin. Kasko sigortamız kapsamında gerekli işlemler başlatılacaktır.",
      isOpen: false
    },
    {
      question: "Depozito (Provizyon) alıyor musunuz?",
      answer: "Evet, araç grubuna göre değişen miktarlarda kredi kartından provizyon alınmaktadır. Araç tesliminden sonra bu tutar iade edilir.",
      isOpen: false
    },
    {
      question: "Bilgilerimin güvenliği nasıl sağlanıyor?",
      answer: "Tüm kişisel bilgileriniz SSL şifreleme ile korunmakta ve KVKK kapsamında güvenli bir şekilde saklanmaktadır.",
      isOpen: false
    }
  ];

  toggleFaq(index: number) {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }
}
