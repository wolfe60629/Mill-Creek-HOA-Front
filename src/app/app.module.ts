import { BrowserModule } from '@angular/platform-browser';
import { Injectable, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpErrorInterceptor } from './http-error.interceptor';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';

import { NavigationComponent } from './navigation/navigation.component';
import { DocumentsComponent } from './documents/documents.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { SiteScrollComponent } from './site-scroll/site-scroll.component';
import {environment} from '../environments/environment.prod';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AccordionModule } from 'primeng/accordion';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {DropdownModule} from 'primeng/dropdown';
import {TabViewModule} from 'primeng/tabview';
import { ViewerComponent } from './documents/viewer/viewer.component';
import {DocumentUploadComponent} from './documents/document-upload/document-upload';
import {MultiSelectModule} from 'primeng/multiselect';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {NgxExtendedPdfViewerModule} from 'ngx-extended-pdf-viewer';
import {ConfirmationService, MessageService} from 'primeng/api';
import {EventComponent} from './events/event.component';
import { AmenitiesComponent } from './amenities/amenities.component';
import { LoginComponent } from './login/login.component';
import {TokenInterceptor} from './services/TokenInterceptor';
import { LogoutComponent } from './logout/logout.component';
import {TableModule} from 'primeng/table';
import {ListboxModule} from 'primeng/listbox';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarComponent } from './events/calendar/calendar.component';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {CardModule} from 'primeng/card';
import {SidebarModule} from "primeng/sidebar";
import {DialogModule} from 'primeng/dialog';
import {TooltipModule} from "primeng/tooltip";
import { providePrimeNG } from 'primeng/config'
import Material from '@primeng/themes/material'
import { MatIcon } from '@angular/material/icon'
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu'
import { MatToolbar } from '@angular/material/toolbar'
import { MatIconButton } from '@angular/material/button'
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav'
import { MatListItem, MatNavList } from '@angular/material/list'
import { NgFor, NgIf } from '@angular/common'
import { ScrollRevealDirective } from './directives/scroll-reveal.directive';

const appRoutes: Routes = [
  { path: '', component: SiteScrollComponent, data: { title: 'Mill Creek Community | Home' } },
  { path: 'about', redirectTo: '', pathMatch: 'full' },
  { path: 'amenities', component: SiteScrollComponent, data: { title: 'Mill Creek Community | Amenities', section: 'amenities' } },
  { path: 'events', component: SiteScrollComponent, data: { title: 'Mill Creek Community | Events', section: 'events' } },
  { path: 'documents', component: SiteScrollComponent, data: { title: 'Mill Creek Community | Documents', section: 'documents' } },
  { path: 'contact', component: SiteScrollComponent, data: { title: 'Mill Creek Community | Contact', section: 'contact' } },
  { path: 'admin', redirectTo: '', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, data: { title: 'Mill Creek Community | Login' } },
  { path: 'logout', component: LogoutComponent, data: { title: 'Mill Creek Community | Logout' } },
  { path: '**', redirectTo: '', pathMatch: 'full', data: { title: '404 Page Not Found' } },
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DocumentsComponent,
    ContactComponent,
    FooterComponent,
    SiteScrollComponent,
    DocumentUploadComponent,
    ViewerComponent,
    EventComponent,
    AmenitiesComponent,
    LoginComponent,
    LogoutComponent,
    CalendarComponent,
    ScrollRevealDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,  // Ensure animations are loaded before PrimeNG components
    RouterModule.forRoot(appRoutes, {
      enableTracing: false,
      anchorScrolling: 'disabled',
      scrollOffset: [0, 72],
    }),
    FormsModule,
    AccordionModule,
    ButtonModule,
    ToastModule,
    DropdownModule,
    TabViewModule,
    MultiSelectModule,
    AutoCompleteModule,
    NgxExtendedPdfViewerModule,
    TableModule,
    ListboxModule,
    ConfirmDialogModule,
    FullCalendarModule,
    RadioButtonModule,
    ProgressSpinnerModule,
    CardModule,
    SidebarModule,
    DialogModule,
    TooltipModule,
    ReactiveFormsModule.withConfig({ callSetDisabledState: 'whenDisabledForLegacyCode' }),
    MatIcon,
    MatMenuTrigger,
    MatMenuItem,
    MatMenu,
    MatToolbar,
    MatIconButton,
    MatSidenav,
    MatNavList,
    MatSidenavContainer,
    MatListItem,
    NgFor,
    NgIf,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    MessageService,
    ConfirmationService,
    providePrimeNG({
      theme: {
        preset: Material,
        options: {
          //setting to a query that doesnt exist to disable
          darkModeSelector: '.dark',
        }
      }
    }),
    provideHttpClient(withInterceptorsFromDi()) // HttpClient setup with DI-based interceptors
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
