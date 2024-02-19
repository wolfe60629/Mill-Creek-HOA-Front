var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Injectable, Input, Output } from '@angular/core';
import { DocumentsComponent } from '../documents.component';
import { ReplaySubject } from 'rxjs';
import { DocumentsService } from '../documents.service';
let UploadComponent = class UploadComponent {
    constructor(documentsComponent, documentsService) {
        this.documentsComponent = documentsComponent;
        this.documentsService = documentsService;
        this.documentName = '';
        this.description = '';
        this.category = {
            name: ''
        };
        this.categoryOptions = [{ name: 'Meeting Minutes' }, { name: 'Bi-laws' }];
    }
    ngOnInit() {
    }
    setShowUploadModal(bool) {
        this.documentsComponent.showUploadModal = bool;
    }
    onSubmit() {
        this.setShowUploadModal(false);
        this.convertFile(this.fileToUpload).subscribe((converted) => {
            this.documentsService.saveToStorage({
                name: this.documentName,
                fileName: this.fileToUpload.name,
                description: this.description,
                value: converted,
                category: this.category.name
            });
        });
    }
    convertFile(file) {
        const result = new ReplaySubject(1);
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = (event) => result.next(btoa(event.target.result.toString()));
        return result;
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], UploadComponent.prototype, "showUploadModal", void 0);
__decorate([
    Input(),
    __metadata("design:type", File)
], UploadComponent.prototype, "fileToUpload", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], UploadComponent.prototype, "documentName", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], UploadComponent.prototype, "description", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], UploadComponent.prototype, "category", void 0);
UploadComponent = __decorate([
    Injectable({ providedIn: 'root' }),
    Component({
        selector: 'app-upload',
        templateUrl: './upload.component.html',
        styleUrls: ['./upload.component.css']
    }),
    __metadata("design:paramtypes", [DocumentsComponent, DocumentsService])
], UploadComponent);
export { UploadComponent };
//# sourceMappingURL=upload.component.js.map