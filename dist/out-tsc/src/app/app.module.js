var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './http-error.interceptor';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { MaterializeModule } from 'angular2-materialize';
import { NavigationComponent } from './navigation/navigation.component';
import { DocumentsComponent } from './documents/documents.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { environment } from '../environments/environment.prod';
import { UploadComponent } from './documents/upload/upload.component';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { DropdownModule } from 'primeng/dropdown';
import { ViewerComponent } from './documents/viewer/viewer.component';
const appRoutes = [
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
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
    },
];
let AppModule = class AppModule {
};
AppModule = __decorate([
    NgModule({
        declarations: [
            AppComponent,
            NavigationComponent,
            DocumentsComponent,
            ContactComponent,
            FooterComponent,
            HomeComponent,
            AboutComponent,
            UploadComponent,
            ViewerComponent
        ],
        imports: [
            RouterModule.forRoot(appRoutes, { enableTracing: false, relativeLinkResolution: 'legacy' }),
            BrowserModule,
            MaterializeModule,
            HttpClientModule,
            AngularFireModule.initializeApp(environment.firebaseConfig),
            AngularFireDatabaseModule,
            FormsModule,
            AccordionModule,
            BrowserAnimationsModule,
            ButtonModule,
            ToastModule,
            DropdownModule
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
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map