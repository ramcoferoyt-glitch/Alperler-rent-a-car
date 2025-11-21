import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-gemini-advisor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="fixed bottom-6 right-6 z-40 font-sans">
      <!-- Toggle Button -->
      @if (!isOpen()) {
        <button (click)="toggleChat()" class="bg-slate-900 hover:bg-blue-900 text-white rounded-full p-4 shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center group border-2 border-white/10">
          <div class="relative">
             <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
             <span class="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"></span>
          </div>
          <span class="font-bold tracking-wide pr-2">Canlı Destek</span>
        </button>
      }

      <!-- Chat Interface -->
      @if (isOpen()) {
        <div class="bg-white rounded-2xl shadow-2xl w-80 sm:w-96 overflow-hidden border border-slate-200 flex flex-col max-h-[500px] transition-all duration-300 animate-fade-in-up">
          <!-- Header -->
          <div class="bg-slate-900 p-4 flex justify-between items-center shadow-md">
            <div class="flex items-center text-white">
               <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3 shadow-sm border-2 border-slate-800 relative">
                 <span class="text-slate-900 font-extrabold text-lg">A</span>
                 <span class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
               </div>
               <div>
                 <h3 class="font-bold text-base">Alper AI</h3>
                 <p class="text-xs text-slate-400">Alperler Asistanı</p>
               </div>
            </div>
            <button (click)="toggleChat()" class="text-white/70 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          <!-- Messages -->
          <div class="flex-1 p-4 overflow-y-auto bg-slate-50 space-y-4 min-h-[350px]">
             <div class="flex items-start">
               <div class="bg-white border border-slate-200 text-slate-800 p-3 rounded-2xl rounded-tl-none text-sm max-w-[85%] shadow-sm">
                 <p class="font-semibold text-blue-900 text-xs mb-1">Alper AI</p>
                 Merhaba! Alperler Rent A Car'a hoş geldiniz. Size nasıl yardımcı olabilirim?
               </div>
             </div>

             @for (msg of messages(); track $index) {
               <div class="flex" [class.justify-end]="msg.isUser">
                 <div class="p-3 rounded-2xl text-sm max-w-[85%]" 
                      [class.bg-blue-900]="msg.isUser" 
                      [class.text-white]="msg.isUser"
                      [class.rounded-tr-none]="msg.isUser"
                      [class.bg-white]="!msg.isUser"
                      [class.text-slate-800]="!msg.isUser"
                      [class.shadow-sm]="!msg.isUser"
                      [class.border]="!msg.isUser"
                      [class.border-slate-200]="!msg.isUser"
                      [class.rounded-tl-none]="!msg.isUser">
                   @if(!msg.isUser) { <p class="font-semibold text-blue-900 text-xs mb-1">Alper AI</p> }
                   {{ msg.text }}
                 </div>
               </div>
             }

             @if (isLoading()) {
               <div class="flex items-center space-x-2 p-2">
                 <div class="w-2 h-2 bg-slate-600 rounded-full animate-bounce"></div>
                 <div class="w-2 h-2 bg-slate-600 rounded-full animate-bounce delay-75"></div>
                 <div class="w-2 h-2 bg-slate-600 rounded-full animate-bounce delay-150"></div>
               </div>
             }
          </div>

          <!-- Input -->
          <div class="p-3 bg-white border-t border-slate-100">
            <form (submit)="sendMessage($event)" class="flex gap-2">
              <input 
                type="text" 
                [(ngModel)]="currentInput" 
                name="userInput"
                placeholder="Bir şeyler yazın..." 
                class="flex-1 bg-slate-100 border-transparent focus:bg-white border focus:border-blue-500 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                [disabled]="isLoading()">
              <button 
                type="submit" 
                [disabled]="!currentInput || isLoading()"
                class="bg-slate-900 text-white p-2.5 rounded-full hover:bg-blue-900 disabled:opacity-50 transition-colors shadow-md">
                <svg class="w-5 h-5 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
              </button>
            </form>
          </div>
        </div>
      }
    </div>
  `
})
export class GeminiAdvisorComponent {
  carService = inject(CarService);
  isOpen = signal(false);
  messages = signal<{text: string, isUser: boolean}[]>([]);
  currentInput = '';
  isLoading = signal(false);

  toggleChat() {
    this.isOpen.update(v => !v);
  }

  async sendMessage(e: Event) {
    e.preventDefault();
    if (!this.currentInput.trim()) return;

    const userText = this.currentInput;
    this.messages.update(msgs => [...msgs, { text: userText, isUser: true }]);
    this.currentInput = '';
    this.isLoading.set(true);

    const response = await this.carService.getAIRecommendation(userText);
    
    this.messages.update(msgs => [...msgs, { text: response, isUser: false }]);
    this.isLoading.set(false);
  }
}