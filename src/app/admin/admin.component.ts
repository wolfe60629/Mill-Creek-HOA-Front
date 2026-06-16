import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BoardMemberService } from '../services/board-member.service';
import { DocumentsService } from '../services/documents.service';
import { EventService } from '../services/event.service';
import { GeneralService } from '../services/general.service';
import { LoginService } from '../services/login.service';
import { SettingsService } from '../services/settings.service';
import { BoardMember } from '../types/boardMember';
import { CommunityEvent } from '../types/communityEvent';
import { Setting } from '../types/setting';

type AdminTab = 'events' | 'board' | 'settings';
type EventsStatusFilter = 'all' | 'upcoming' | 'past';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  standalone: false,
})
export class AdminComponent implements OnInit {
  boardMembers: BoardMember[] = [];
  communityEvents: CommunityEvent[] = [];

  activeTab: AdminTab = 'events';
  eventsFilter = '';
  boardFilter = '';
  eventsStatusFilter: EventsStatusFilter = 'all';

  loadingEvents = false;
  loadingBoard = false;
  loadingDocuments = false;
  loadingSettings = false;
  savingSettings = false;

  documentCount = 0;
  isRequestEmailEdit = false;
  requestEmail: Setting = { settingName: 'requestEmail', value: '' };

  readonly confirmationDialogKey = 'admin-values-confirmation-dialog';

  constructor(
    private loginService: LoginService,
    private boardMemberService: BoardMemberService,
    private router: Router,
    private eventService: EventService,
    private messageService: MessageService,
    public generalService: GeneralService,
    private settingsService: SettingsService,
    private documentsService: DocumentsService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit(): void {
    if (!this.loginService.getAuthorizationHeaderValue()) {
      this.router.navigate(['/login']);
      return;
    }

    this.loginService.checkAuthToken();
    this.loadBoardMembers();
    this.loadEvents();
    this.loadDocumentCount();
    this.loadSettings();
  }

  get upcomingEventCount(): number {
    return this.communityEvents.filter(event => this.isUpcoming(event)).length;
  }

  get filteredEvents(): CommunityEvent[] {
    const query = this.eventsFilter.trim().toLowerCase();

    return this.communityEvents.filter(event => {
      if (this.eventsStatusFilter === 'upcoming' && !this.isUpcoming(event)) {
        return false;
      }
      if (this.eventsStatusFilter === 'past' && !this.isPast(event)) {
        return false;
      }
      if (!query) {
        return true;
      }

      return [event.eventName, event.description, event.location].some(value =>
        (value || '').toLowerCase().includes(query),
      );
    });
  }

  get filteredBoardMembers(): BoardMember[] {
    const query = this.boardFilter.trim().toLowerCase();
    if (!query) {
      return this.boardMembers;
    }

    return this.boardMembers.filter(member =>
      [member.title, member.name, member.email].some(value =>
        (value || '').toLowerCase().includes(query),
      ),
    );
  }

  setTab(tab: AdminTab, eventsStatus: EventsStatusFilter = 'all'): void {
    this.activeTab = tab;
    if (tab === 'events') {
      this.eventsStatusFilter = eventsStatus;
    }
  }

  editRow(row: BoardMember | CommunityEvent): void {
    row.readonly = false;
  }

  cancelEdit(row: BoardMember | CommunityEvent): void {
    if (this.isNewRow(row)) {
      this.removeRow(row);
      return;
    }

    row.readonly = true;
  }

  addNewBoardMemberRow(): void {
    this.boardMembers.unshift({
      title: '',
      name: '',
      email: '',
      readonly: false,
      newMember: true,
    });
  }

  addNewEventRow(): void {
    const newEvent = new CommunityEvent();
    newEvent.eventName = '';
    newEvent.description = '';
    newEvent.location = '';
    newEvent.startDate = null;
    newEvent.endDate = null;
    newEvent.readonly = false;
    this.communityEvents.unshift(newEvent);
    this.setTab('events');
  }

  onEventSave(communityEvent: CommunityEvent): void {
    if (!communityEvent?.eventName?.trim()) {
      this.messageService.add({ severity: 'warn', summary: 'Event name is required.' });
      return;
    }
    if (!communityEvent.startDate) {
      this.messageService.add({ severity: 'warn', summary: 'Start date and time are required.' });
      return;
    }

    this.eventService.saveNewEvent(communityEvent).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Event saved.' });
        this.loadEvents();
      },
      error: err => this.messageService.add({ severity: 'warn', summary: 'Could not save event', detail: err }),
    });
  }

  onBoardMemberSave(boardMember: BoardMember): void {
    if (!boardMember?.title?.trim() || !boardMember?.name?.trim() || !boardMember?.email?.trim()) {
      this.messageService.add({ severity: 'warn', summary: 'Please fill in title, name, and email.' });
      return;
    }

    this.boardMemberService.saveNewBoardMember(boardMember).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Board member saved.' });
        boardMember.readonly = true;
        boardMember.newMember = false;
        this.loadBoardMembers();
      },
      error: err => this.messageService.add({ severity: 'warn', summary: 'Could not save board member', detail: err }),
    });
  }

  onDeleteCommunityEvent(communityEvent: CommunityEvent): void {
    if (!communityEvent) {
      return;
    }

    this.confirmationService.confirm({
      key: this.confirmationDialogKey,
      header: 'Delete this event?',
      message: `“${communityEvent.eventName || 'Untitled event'}” will be removed from the public calendar.`,
      accept: () => {
        this.eventService.deleteEvent(communityEvent).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Event deleted.' });
            this.loadEvents();
          },
          error: err => this.messageService.add({ severity: 'warn', summary: 'Could not delete event', detail: err }),
        });
      },
    });
  }

  onDeleteBoardMember(boardMember: BoardMember): void {
    if (!boardMember) {
      return;
    }

    this.confirmationService.confirm({
      key: this.confirmationDialogKey,
      header: 'Delete this board member?',
      message: `“${boardMember.name || 'This contact'}” will be removed from the Contact page.`,
      accept: () => {
        this.boardMemberService.deleteBoardMember(boardMember).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Board member deleted.' });
            this.loadBoardMembers();
          },
          error: err => this.messageService.add({ severity: 'warn', summary: 'Could not delete board member', detail: err }),
        });
      },
    });
  }

  startRequestEmailEdit(): void {
    this.isRequestEmailEdit = true;
  }

  cancelRequestEmailEdit(): void {
    this.isRequestEmailEdit = false;
    this.loadSettings();
  }

  saveRequestEmail(): void {
    const email = this.requestEmail?.value?.trim();
    if (!email) {
      this.messageService.add({ severity: 'warn', summary: 'Enter an email address for document requests.' });
      return;
    }

    this.savingSettings = true;
    this.requestEmail.value = email;
    this.settingsService.saveSetting(this.requestEmail).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Settings saved.' });
        this.isRequestEmailEdit = false;
        this.savingSettings = false;
      },
      error: err => {
        this.messageService.add({ severity: 'warn', summary: 'Could not save settings', detail: err });
        this.savingSettings = false;
      },
    });
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['/']);
  }

  openSiteSection(section: string): void {
    this.router.navigate(['/'], { fragment: section });
  }

  isUpcoming(event: CommunityEvent): boolean {
    const reference = event.endDate || event.startDate;
    if (!reference) {
      return false;
    }
    return new Date(reference).getTime() >= Date.now();
  }

  isPast(event: CommunityEvent): boolean {
    const reference = event.endDate || event.startDate;
    if (!reference) {
      return false;
    }
    return new Date(reference).getTime() < Date.now();
  }

  eventStatusLabel(event: CommunityEvent): string {
    return this.isUpcoming(event) ? 'Upcoming' : 'Past';
  }

  trackByFn(index: number, item: BoardMember | CommunityEvent): string | number {
    const id = (item as BoardMember).id ?? (item as CommunityEvent).id;
    if (id != null) {
      return Number(id);
    }
    return (item as BoardMember).email ?? (item as CommunityEvent).eventName ?? index;
  }

  private loadBoardMembers(): void {
    this.loadingBoard = true;
    this.boardMemberService.getAllBoardMembers().subscribe({
      next: boardMembers => {
        if (!Array.isArray(boardMembers)) {
          this.boardMembers = [];
          return;
        }
        boardMembers.forEach(member => (member.readonly = true));
        this.boardMembers = boardMembers;
      },
      error: err => {
        this.messageService.add({ severity: 'warn', summary: 'Failed to load board members', detail: err });
        this.boardMembers = [];
      },
      complete: () => {
        this.loadingBoard = false;
      },
    });
  }

  private loadEvents(): void {
    this.loadingEvents = true;
    this.eventService.getAllEvents().subscribe({
      next: events => {
        if (!Array.isArray(events)) {
          this.communityEvents = [];
          return;
        }
        events.forEach(event => (event.readonly = true));
        this.communityEvents = events.sort(
          (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
        );
      },
      error: err => {
        this.messageService.add({ severity: 'warn', summary: 'Failed to load events', detail: err });
        this.communityEvents = [];
      },
      complete: () => {
        this.loadingEvents = false;
      },
    });
  }

  private loadDocumentCount(): void {
    this.loadingDocuments = true;
    this.documentsService.getAllDocuments().subscribe({
      next: documents => {
        this.documentCount = Array.isArray(documents) ? documents.length : 0;
      },
      error: () => {
        this.documentCount = 0;
      },
      complete: () => {
        this.loadingDocuments = false;
      },
    });
  }

  private loadSettings(): void {
    this.loadingSettings = true;
    this.settingsService.getSettingByName('requestEmail').subscribe({
      next: (setting: Setting) => {
        this.requestEmail = setting ?? { settingName: 'requestEmail', value: '' };
      },
      error: () => {
        this.requestEmail = { settingName: 'requestEmail', value: '' };
      },
      complete: () => {
        this.loadingSettings = false;
      },
    });
  }

  private isNewRow(row: BoardMember | CommunityEvent): boolean {
    return !(row as BoardMember).id && !(row as CommunityEvent).id;
  }

  private removeRow(row: BoardMember | CommunityEvent): void {
    if ('email' in row && 'title' in row) {
      this.boardMembers = this.boardMembers.filter(member => member !== row);
      return;
    }

    this.communityEvents = this.communityEvents.filter(event => event !== row);
  }
}
