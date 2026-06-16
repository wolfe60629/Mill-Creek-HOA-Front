import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-amenities',
    templateUrl: './amenities.component.html',
    styleUrls: ['./amenities.component.css'],
    standalone: false
})
export class AmenitiesComponent implements OnInit {
  visibleSidebar1 = false;
  visibleSidebar2 = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.visibleSidebar1 = params['poolRules'] === 'true';
      this.visibleSidebar2 = params['courtRules'] === 'true';
    });
  }

  openCourtRules(): void {
    this.router.navigate([], {
      fragment: 'amenities',
      queryParams: { courtRules: 'true' },
      queryParamsHandling: 'merge',
    });
    this.visibleSidebar2 = true;
  }

  openPoolRules(): void {
    this.router.navigate([], {
      fragment: 'amenities',
      queryParams: { poolRules: 'true' },
      queryParamsHandling: 'merge',
    });
    this.visibleSidebar1 = true;
  }

  closeRules(): void {
    this.visibleSidebar1 = false;
    this.visibleSidebar2 = false;
    this.router.navigate([], {
      fragment: 'amenities',
      queryParams: { poolRules: null, courtRules: null },
      queryParamsHandling: 'merge',
    });
  }
}
