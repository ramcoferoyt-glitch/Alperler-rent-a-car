
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { FleetComponent } from './pages/fleet.component';
import { SalesComponent } from './pages/sales.component';
import { AboutComponent } from './pages/about.component';
import { ContactComponent } from './pages/contact.component';
import { BlogDetailComponent } from './pages/blog-detail.component';
import { BlogListComponent } from './pages/blog-list.component';
import { FaqComponent } from './pages/faq.component';
import { LegalComponent } from './pages/legal.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'fleet', component: FleetComponent },
  { path: 'sales', component: SalesComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'blog', component: BlogListComponent },
  { path: 'blog/:id', component: BlogDetailComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'legal/kvkk', component: LegalComponent, data: { type: 'kvkk', title: 'KVKK Aydınlatma Metni' } },
  { path: 'legal/privacy', component: LegalComponent, data: { type: 'privacy', title: 'Gizlilik Politikası' } },
  { path: 'legal/cookies', component: LegalComponent, data: { type: 'cookies', title: 'Çerez Politikası' } },
  { path: '**', redirectTo: '' }
];
