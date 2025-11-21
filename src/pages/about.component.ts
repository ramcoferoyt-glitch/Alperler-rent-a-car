
import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NgOptimizedImage],
  template: `
    <div class="bg-white font-sans">
       <!-- Header -->
       <div class="relative bg-slate-900 h-[500px] flex items-center justify-center overflow-hidden">
          <div class="absolute inset-0">
            <img ngSrc="https://picsum.photos/id/1018/1920/800" fill priority alt="Alperler Kurumsal" class="object-cover opacity-30">
          </div>
          <div class="absolute inset-0 bg-gradient-to-t from-white via-transparent to-slate-900/90"></div>
          <div class="relative z-10 text-center px-4 animate-fade-in-up pt-20">
             <span class="bg-amber-500 text-slate-900 px-4 py-1 rounded-sm text-xs font-bold uppercase tracking-widest mb-6 inline-block shadow-[0_0_15px_rgba(245,158,11,0.6)]">
                Yüksekova'nın Güçlü Ailesi
             </span>
             <h1 class="font-serif text-5xl md:text-7xl font-bold text-slate-900 mb-4 text-white">AİLE BAĞLARINDAN<br>DOĞAN GÜÇ</h1>
          </div>
       </div>

       <!-- Founding Story -->
       <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div class="absolute -left-20 top-40 w-40 h-40 bg-amber-100 rounded-full opacity-50 blur-3xl"></div>
          
          <h2 class="text-amber-600 font-bold tracking-[0.2em] uppercase text-sm mb-4 text-center">Kuruluş Hikayesi</h2>
          <h3 class="font-serif text-4xl font-bold text-slate-900 mb-10 text-center">Bir Yeğenin İsmiyle<br>Büyüyen Marka</h3>
          
          <div class="prose prose-lg text-slate-600 leading-relaxed mx-auto text-justify">
             <p class="mb-6 first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-slate-900 first-letter:mr-2 float-none">
               Alperler Rent A Car, sıradan bir ticarethane değil, temelleri sevgi ve aile bağlarıyla atılmış bir hayalin gerçeğe dönüşmesidir. Bu hikaye, <strong>İshak Alper</strong> ve kardeşi <strong>Ferhat Alper</strong>'in, yeğenleri (Hicran Hanım'ın oğlu) <strong>Alper</strong>'in geleceğini inşa etme arzusuyla başlar.
             </p>
             <p class="mb-6">
               Ailenin birleştirici gücü olan Genel Müdürümüz <strong>Hicran Alper</strong>, bir anne şefkati ve disipliniyle şirketin operasyonlarını yönetirken, kurucumuz ve dayısı <strong>İshak Alper</strong> ise vizyoner kimliğiyle markayı bölgenin zirvesine taşımıştır. Şirketimiz, adını aldığı Alper'in enerjisi ve umudunu temsil eder.
             </p>
             <p class="mb-6">
               Bu büyük ailede herkes bir dişli gibi çalışır. <strong>Erkan Baykal</strong>, en zorlu yollarda direksiyon başındaki tecrübesiyle; <strong>Selim Alper</strong>, araçların teknik ve yazılım kusursuzluğuyla; <strong>İmran Alper</strong> ise güler yüzlü müşteri ilişkileriyle bu güven çemberini tamamlar.
             </p>
             <p>
               Bizim için her müşteri, Alperler ailesinin bir misafiridir. Yüksekova'nın zorlu coğrafyasında size sunduğumuz her araçta, bu büyük ailenin emeği ve güvencesi vardır.
             </p>
          </div>
       </div>

       <!-- Team Grid -->
       <div class="bg-slate-50 py-24 border-t border-slate-200">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div class="text-center mb-16">
                <h2 class="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-4">Yönetim ve Operasyon</h2>
                <p class="text-slate-500 max-w-2xl mx-auto">Profesyonel hizmet, aile sıcaklığı.</p>
             </div>

             <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                
                <!-- İshak Alper (Kurucu/Yönetici) -->
                <div class="bg-white p-8 rounded-sm shadow-lg border-t-4 border-slate-900 hover:border-amber-500 transition-all duration-300 text-center group">
                   <div class="w-32 h-32 bg-slate-200 rounded-full mx-auto mb-6 overflow-hidden border-4 border-white shadow-md">
                      <img ngSrc="https://picsum.photos/id/1062/200/200" width="200" height="200" alt="İshak Alper" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all">
                   </div>
                   <h3 class="font-bold text-2xl text-slate-900 font-serif">İshak Alper</h3>
                   <p class="text-amber-600 text-xs uppercase font-bold tracking-widest mb-2">Kurucu & Yön. Krl. Bşk.</p>
                   <p class="text-slate-500 text-sm">Pazarlama ve Strateji Dehası</p>
                </div>

                <!-- Hicran Alper (GM) -->
                <div class="bg-white p-8 rounded-sm shadow-lg border-t-4 border-slate-900 hover:border-amber-500 transition-all duration-300 text-center group">
                   <div class="w-32 h-32 bg-slate-200 rounded-full mx-auto mb-6 overflow-hidden border-4 border-white shadow-md">
                      <img ngSrc="https://picsum.photos/id/338/200/200" width="200" height="200" alt="Hicran Alper" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all">
                   </div>
                   <h3 class="font-bold text-2xl text-slate-900 font-serif">Hicran Alper</h3>
                   <p class="text-amber-600 text-xs uppercase font-bold tracking-widest mb-2">Genel Müdür</p>
                   <p class="text-slate-500 text-sm">Finans ve İdari Yönetim</p>
                </div>

                <!-- Ferhat Alper (Kurucu Ortak) -->
                <div class="bg-white p-8 rounded-sm shadow-lg border-t-4 border-slate-900 hover:border-amber-500 transition-all duration-300 text-center group">
                   <div class="w-32 h-32 bg-slate-200 rounded-full mx-auto mb-6 overflow-hidden border-4 border-white shadow-md">
                      <img ngSrc="https://picsum.photos/id/203/200/200" width="200" height="200" alt="Ferhat Alper" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all">
                   </div>
                   <h3 class="font-bold text-2xl text-slate-900 font-serif">Ferhat Alper</h3>
                   <p class="text-amber-600 text-xs uppercase font-bold tracking-widest mb-2">Kurucu Ortak</p>
                   <p class="text-slate-500 text-sm">Saha Operasyon & Şoför</p>
                </div>

                <!-- Erkan Baykal (Şoför) -->
                <div class="bg-white p-8 rounded-sm shadow-lg border-t-4 border-slate-900 hover:border-amber-500 transition-all duration-300 text-center group">
                   <div class="w-32 h-32 bg-slate-200 rounded-full mx-auto mb-6 overflow-hidden border-4 border-white shadow-md">
                      <img ngSrc="https://picsum.photos/id/1005/200/200" width="200" height="200" alt="Erkan Baykal" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all">
                   </div>
                   <h3 class="font-bold text-2xl text-slate-900 font-serif">Erkan Baykal</h3>
                   <p class="text-amber-600 text-xs uppercase font-bold tracking-widest mb-2">Transfer Uzmanı</p>
                   <p class="text-slate-500 text-sm">VIP Transfer & Kaptan Şoför</p>
                </div>

                 <!-- Selim Alper (Yazılım/Bakım) -->
                 <div class="bg-white p-8 rounded-sm shadow-lg border-t-4 border-slate-900 hover:border-amber-500 transition-all duration-300 text-center group">
                   <div class="w-32 h-32 bg-slate-200 rounded-full mx-auto mb-6 overflow-hidden border-4 border-white shadow-md">
                      <img ngSrc="https://picsum.photos/id/60/200/200" width="200" height="200" alt="Selim Alper" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all">
                   </div>
                   <h3 class="font-bold text-2xl text-slate-900 font-serif">Selim Alper</h3>
                   <p class="text-amber-600 text-xs uppercase font-bold tracking-widest mb-2">Teknik Sorumlu</p>
                   <p class="text-slate-500 text-sm">Yazılım & Araç Ön Bakım</p>
                </div>

                <!-- İmran Alper (Müşteri Hiz/Şoför) -->
                <div class="bg-white p-8 rounded-sm shadow-lg border-t-4 border-slate-900 hover:border-amber-500 transition-all duration-300 text-center group">
                   <div class="w-32 h-32 bg-slate-200 rounded-full mx-auto mb-6 overflow-hidden border-4 border-white shadow-md">
                      <img ngSrc="https://picsum.photos/id/91/200/200" width="200" height="200" alt="İmran Alper" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all">
                   </div>
                   <h3 class="font-bold text-2xl text-slate-900 font-serif">İmran Alper</h3>
                   <p class="text-amber-600 text-xs uppercase font-bold tracking-widest mb-2">Müşteri İlişkileri</p>
                   <p class="text-slate-500 text-sm">Rezervasyon & Transfer Şoförü</p>
                </div>

             </div>
          </div>
       </div>
    </div>
  `
})
export class AboutComponent {}
