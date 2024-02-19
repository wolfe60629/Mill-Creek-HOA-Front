var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
let ViewerComponent = class ViewerComponent {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
        this.showViewerModal = false;
        this.showViewerModalChange = new EventEmitter();
        this.manifestHtmlChange = new EventEmitter();
    }
    ngOnChanges(changes) {
        if (changes.manifestHtml) {
            this.src = this.updateSrc(changes.manifestHtml.currentValue);
            console.log(this.src.toString());
        }
    }
    ngOnInit() {
    }
    updateSrc(url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl('data:application/pdf;base64,' + url);
    }
};
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], ViewerComponent.prototype, "showViewerModal", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], ViewerComponent.prototype, "showViewerModalChange", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], ViewerComponent.prototype, "manifestHtml", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], ViewerComponent.prototype, "manifestHtmlChange", void 0);
ViewerComponent = __decorate([
    Component({
        selector: 'app-viewer',
        templateUrl: './viewer.component.html',
        styleUrls: ['./viewer.component.css']
    }),
    __metadata("design:paramtypes", [DomSanitizer])
], ViewerComponent);
export { ViewerComponent };
//# sourceMappingURL=viewer.component.js.map