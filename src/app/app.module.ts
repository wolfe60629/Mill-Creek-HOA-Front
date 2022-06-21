import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { HttpErrorInterceptor } from './http-error.interceptor'

import { AppComponent } from './app.component'
import { RouterModule, Routes } from '@angular/router'
import { MaterializeModule } from 'angular2-materialize'

import { NavigationComponent } from './navigation/navigation.component'
import { DocumentsComponent } from './documents/documents.component'
import { ContactComponent } from './contact/contact.component'
import { AboutComponent } from './about/about.component'
import { FooterComponent } from './footer/footer.component'
import { HomeComponent } from './home/home.component'
import {environment} from '../environments/environment.prod';
import {FormsModule} from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {DropdownModule} from 'primeng/dropdown';
import { ViewerComponent } from './documents/viewer/viewer.component';
import { RequestsComponent } from './requests/requests.component';
import { RequestUploadComponent } from './requests/request-upload/request-upload.component';
import { RequestViewerComponent } from './requests/request-viewer/request-viewer.component';
import {DocumentUploadComponent} from './documents/document-upload/document-upload';
import {MultiSelectModule} from 'primeng/multiselect';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {NgxExtendedPdfViewerModule} from 'ngx-extended-pdf-viewer';
import {ConfirmationService, MessageService} from 'primeng/api';
import {AnnoncementComponent} from './announcements/annoncement.component';
import { AmenitiesComponent } from './amenities/amenities.component';
import { LoginComponent } from './login/login.component';
import {TokenInterceptor} from './services/TokenInterceptor';
import { AdminComponent } from './admin/admin.component';
import { LogoutComponent } from './logout/logout.component';
import {TableModule} from 'primeng/table';
import {ListboxModule} from 'primeng/listbox';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarComponent } from './announcements/calendar/calendar.component';
import { NewsletterUploadComponent } from './announcements/newsletter-upload/newsletter-upload.component';
import {RadioButtonModule} from 'primeng/radiobutton';


const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: 'Home' },
  },
  {
    path: 'about',
    component: AboutComponent,
    data: { title: 'About the Community' },
  },
  {
    path: 'admin',
    component: AdminComponent,
    data: { title: 'Admin PanelS' },
  },
  {
    path: 'documents',
    component: DocumentsComponent,
    data: { title: 'Documents' },
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: { title: 'Contact' },
  },
  {
    path: 'requests',
    component: RequestsComponent,
    data: { title: 'Requests' },
  },
  {
    path: 'announcements',
    component: AnnoncementComponent,
    data: { title: 'Announcements' },
  },
  {
    path: 'amenities',
    component: AmenitiesComponent,
    data: { title: 'Amenity Information' },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' },
  },
  {
    path: 'logout',
    component: LogoutComponent,
    data: { title: 'Logout' },
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DocumentsComponent,
    ContactComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    DocumentUploadComponent,
    ViewerComponent,
    RequestsComponent,
    RequestUploadComponent,
    RequestViewerComponent,
    AnnoncementComponent,
    AmenitiesComponent,
    LoginComponent,
    AdminComponent,
    LogoutComponent,
    CalendarComponent,
    NewsletterUploadComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, {enableTracing: false, relativeLinkResolution: 'legacy'}),
    BrowserModule,
    MaterializeModule,
    HttpClientModule,
    FormsModule,
    AccordionModule,
    BrowserAnimationsModule,
    ButtonModule,
    ToastModule,
    DropdownModule,
    MultiSelectModule,
    AutoCompleteModule,
    NgxExtendedPdfViewerModule,
    TableModule,
    ListboxModule,
    ConfirmDialogModule,
    FullCalendarModule,
    RadioButtonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    MessageService,
      ConfirmationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {

}
