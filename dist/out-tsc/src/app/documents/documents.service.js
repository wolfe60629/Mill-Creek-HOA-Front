var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/compat/database';
let DocumentsService = class DocumentsService {
    constructor(httpSvc, db) {
        this.httpSvc = httpSvc;
        this.db = db;
    }
    saveToStorage(doc) {
        const ref = this.db.list('uploaded_files');
        ref.push(doc).then(() => {
            console.log('Successfully Saved File: ' + doc.fileName);
        }, (error) => {
            console.log(error);
        });
    }
    getAllAsJson() {
        return this.db.list('uploaded_files').query.get().then(data => data.toJSON());
    }
};
DocumentsService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [HttpClient, AngularFireDatabase])
], DocumentsService);
export { DocumentsService };
//# sourceMappingURL=documents.service.js.map