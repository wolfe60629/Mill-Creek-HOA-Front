var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Output } from '@angular/core';
import { DocumentsService } from './documents.service';
import { DomSanitizer } from '@angular/platform-browser';
let DocumentsComponent = class DocumentsComponent {
    constructor(documentsService, sanitizer) {
        this.documentsService = documentsService;
        this.sanitizer = sanitizer;
        this.tabOption = 0;
        this.documents = [];
        this.fileToUpload = null;
    }
    ngOnInit() {
        this.documentsService.getAllAsJson().then((jsonObject) => {
            // Get the document container
            const documentContainer = { docmap: jsonObject };
            // Add all documents in array
            for (const key in documentContainer.docmap) {
                this.documents.push(documentContainer.docmap[key]);
            }
            console.log(this.documents);
            // List of all categories
            this.listOfCategories = [...new Set(this.documents.map(document => document.category))];
        });
    }
    handleFileInput(files) {
        // Open Confirm Modal
        this.fileToUpload = files.item(0);
        this.showUploadModal = true;
    }
    showFile(base64) {
        if (base64) {
            this.mainfestHtml = base64;
            this.showViewerModal = true;
        }
    }
};
__decorate([
    Output(),
    __metadata("design:type", Boolean)
], DocumentsComponent.prototype, "showUploadModal", void 0);
DocumentsComponent = __decorate([
    Component({
        templateUrl: './documents.component.html',
        styleUrls: ['./documents.component.css'],
        providers: [DocumentsService],
    }),
    __metadata("design:paramtypes", [DocumentsService, DomSanitizer])
], DocumentsComponent);
export { DocumentsComponent };
//# sourceMappingURL=documents.component.js.map