import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BoardMemberService } from '../services/board-member.service';
import { LoginService } from '../services/login.service';
import { BoardMember } from '../types/boardMember';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  standalone: false,
})
export class ContactComponent implements OnInit {
  contacts: BoardMember[] = [];
  isAdmin = false;
  showAddForm = false;
  editingContactId: number | null = null;

  newTitle = '';
  newName = '';
  newEmail = '';

  editTitle = '';
  editName = '';
  editEmail = '';

  resourceLinks = [
    {
      name: 'Resident Login',
      description: 'Pay dues, view statements, and update your account',
      href: 'https://hms.cincwebaxis.com/account/loginmodernthemes',
      icon: 'login',
    },
    {
      name: 'ARC Portal',
      description: 'Fences, decks, and exterior changes—start here before you build',
      href: 'https://hms-inc.net/',
      icon: 'home_work',
    },
  ];

  constructor(
    private boardMemberService: BoardMemberService,
    private loginService: LoginService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit(): void {
    this.loginService.checkAuthToken();
    this.isAdmin = this.loginService.getAuthorizationHeaderValue().length > 0;
    this.loadContacts();
  }

  openAddForm(): void {
    this.cancelEdit();
    this.showAddForm = true;
  }

  cancelAddForm(): void {
    this.showAddForm = false;
    this.newTitle = '';
    this.newName = '';
    this.newEmail = '';
  }

  startEdit(contact: BoardMember): void {
    this.cancelAddForm();
    this.editingContactId = Number(contact.id);
    this.editTitle = contact.title ?? '';
    this.editName = contact.name ?? '';
    this.editEmail = contact.email ?? '';
  }

  cancelEdit(): void {
    this.editingContactId = null;
    this.editTitle = '';
    this.editName = '';
    this.editEmail = '';
  }

  isEditing(contact: BoardMember): boolean {
    return this.editingContactId === Number(contact.id);
  }

  saveNewContact(): void {
    if (!this.newTitle.trim() || !this.newName.trim() || !this.newEmail.trim()) {
      this.messageService.add({ severity: 'warn', summary: 'Title, name, and email are required.' });
      return;
    }

    const payload: BoardMember = {
      title: this.newTitle.trim(),
      name: this.newName.trim(),
      email: this.newEmail.trim(),
    };

    this.boardMemberService.saveNewBoardMember(payload).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Board member added.' });
        this.cancelAddForm();
        this.loadContacts();
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Failed to add board member.' }),
    });
  }

  saveEdit(contact: BoardMember): void {
    if (!this.editTitle.trim() || !this.editName.trim() || !this.editEmail.trim()) {
      this.messageService.add({ severity: 'warn', summary: 'Title, name, and email are required.' });
      return;
    }

    const payload: BoardMember = {
      ...contact,
      title: this.editTitle.trim(),
      name: this.editName.trim(),
      email: this.editEmail.trim(),
    };

    this.boardMemberService.saveNewBoardMember(payload).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Board member updated.' });
        this.cancelEdit();
        this.loadContacts();
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Failed to update board member.' }),
    });
  }

  confirmDeleteContact(contact: BoardMember): void {
    this.confirmationService.confirm({
      key: 'confirm',
      header: 'Delete this board member?',
      message: `"${contact.name}" will be removed from the Contact section.`,
      accept: () => {
        this.boardMemberService.deleteBoardMember(contact).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Board member deleted.' });
            if (this.editingContactId === Number(contact.id)) {
              this.cancelEdit();
            }
            this.loadContacts();
          },
          error: () => this.messageService.add({ severity: 'error', summary: 'Failed to delete board member.' }),
        });
      },
    });
  }

  private loadContacts(): void {
    this.boardMemberService.getAllBoardMembers().subscribe({
      next: boardMembers => {
        this.contacts = Array.isArray(boardMembers) ? boardMembers : [];
      },
      error: () => {
        this.contacts = [];
      },
    });
  }
}
