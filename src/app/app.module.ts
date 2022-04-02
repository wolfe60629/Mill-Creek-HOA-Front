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


const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: 'Home' },
  },
  {
    path: 'about',
    component: AboutComponent,
    data: { title: 'About me' },
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
    RequestViewerComponent
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
    NgxExtendedPdfViewerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
