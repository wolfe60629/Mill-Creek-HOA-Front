import {Component, OnInit} from '@angular/core';
import { Contact } from './contact.model'
import {LoginService} from '../services/login.service';
import {BoardMemberService} from '../services/board-member.service';
import {Router} from '@angular/router';

@Component({
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  contacts = [];
  staticPages = [];
  constructor(private boardMemberService: BoardMemberService) { }

  ngOnInit(): void {
    this.boardMemberService.getAllBoardMembers().subscribe(boardMembers => {
      this.contacts = boardMembers.map(boardMember => {
       return {name: boardMember.name, href: 'mailto:' + boardMember.email, icon: 'user', title: boardMember.title, email: boardMember.email };
      });

      this.staticPages.push(...[
          new Contact(
              'Facebook Page',
              'https://www.facebook.com/groups/407921640614324',
              'Facebook',
              'facebook'),
          new Contact(
              'Instagram',
              '',
              'Instagram',
              'instagram')]
        );
    });


  }
}
