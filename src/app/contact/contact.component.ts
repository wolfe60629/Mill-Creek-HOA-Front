import { Component } from '@angular/core'
import { Contact } from './contact.model'

@Component({
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  contacts = [
    new Contact(
      'Mill Creek Facebook',
      'https://www.facebook.com/groups/407921640614324',
      'Facebook',
      'facebook',
    )
  ];
}
