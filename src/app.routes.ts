
import { Routes, CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './pages/home.component';
import { FleetComponent } from './pages/fleet.component';
import { SalesComponent } from './pages/sales.component';
import { AboutComponent } from './pages/about.component';
import { ContactComponent } from './pages/contact.component';
import { BlogDetailComponent } from './pages/blog-detail.component';
import { BlogListComponent } from './pages/blog-list.component';
import { FaqComponent } from './pages/faq.component';
import { LegalComponent } from './pages/legal.component';

// Admin Pages
import { AdminLoginComponent } from './pages/admin/admin-login.component';
import { AdminLayoutComponent } from './pages/admin/admin-layout.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard.component';
import { AdminCarsComponent } from './pages/admin/admin-cars.component';
import { AdminReservationsComponent } from './pages/admin/admin-reservations.component';
import { AdminBlogComponent } from './pages/admin/admin-blog.component';
import { AdminSettingsComponent } from './pages/admin/admin-settings.component';
import { AdminPartnerRequestsComponent } from './pages/admin/admin-partner-requests.component';
import { AdminToursComponent } from './pages/admin/admin-tours.component';

const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.isLoggedIn()) {
    return true;
  }
  return router.parseUrl('/admin/login');
};

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
  
  // Admin Routes
  { path: 'admin/login', component: AdminLoginComponent },
  { 
    path: 'admin', 
    component: AdminLayoutComponent,
    canActivate: [adminGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'cars', component: AdminCarsComponent },
      { path: 'reservations', component: AdminReservationsComponent },
      { path: 'sales', component: AdminCarsComponent }, // Reusing cars component with tab logic
      { path: 'tours', component: AdminToursComponent },
      { path: 'blog', component: AdminBlogComponent },
      { path: 'partner-requests', component: AdminPartnerRequestsComponent },
      { path: 'settings', component: AdminSettingsComponent }
    ]
  },
  
  { path: '**', redirectTo: '' }
];
