import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './about.component.html',
  providers: [],
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  ngOnInit(): void {
  }

  jumpUp( index) {
    const card = document.getElementsByClassName('card')[index] as HTMLElement;
    card.style.transform = 'translateY(-20px)';
  }

  resetPosition(index) {
    const card = document.getElementsByClassName('card')[index] as HTMLElement;
    card.style.transform = 'none';
  }
}
