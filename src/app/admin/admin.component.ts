import { Component, OnInit } from '@angular/core';
import {LoginService} from '../services/login.service';
import {Router} from '@angular/router';
import {BoardMember} from '../types/boardMember';
import {BoardMemberService} from '../services/board-member.service';
import {CommunityEvent} from '../types/communityEvent';
import {EventService} from '../services/event.service';
import {MessageService} from 'primeng/api';
import {GeneralService} from '../services/general.service';
import {Setting} from '../types/setting';
import {SettingsService} from '../services/settings.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css'],
    standalone: false
})

export class AdminComponent implements OnInit {
  boardMembers: BoardMember[] = [];
  communityEvents: CommunityEvent[] = [];

  activeTab: 'events' | 'board' | 'settings' = 'events';
  isRequestEmailEdit: boolean = false;
  loading = false;
  requestEmail: Setting;
  confirmationDialogKey = 'admin-values-confirmation-dialog';

  constructor(private loginService: LoginService,
              private boardMemberService: BoardMemberService,
              private router: Router,
              private eventService: EventService,
              private messageService: MessageService,
              public generalService: GeneralService,
              private settingsService: SettingsService) { }

  ngOnInit(): void {
    const tokenValue = this.loginService.getAuthorizationHeaderValue();
    if (!tokenValue) {
      this.router.navigate(['/login']);
      return;
    }
    this.loginService.checkAuthToken();

    this.loadBoardMembers();
    this.loadEvents();
  }

  private loadBoardMembers() {
    console.log('[Admin] Loading board members');
    this.boardMemberService.getAllBoardMembers().subscribe({
      next: boardMembers => {
        console.log('[Admin] Board members response', boardMembers);
        if (!Array.isArray(boardMembers)) { return; }
        boardMembers.forEach(b => b.readonly = true);
        this.boardMembers = boardMembers;
      },
      error: err => { console.warn('[Admin] Board members load failed', err); this.messageService.add({severity: 'warn', summary: 'Failed to load board members', detail: err}); }
    });
  }

  private loadEvents() {
    console.log('[Admin] Loading events');
    this.eventService.getAllEvents().subscribe({
      next: events => {
        console.log('[Admin] Events response', events);
        if (!Array.isArray(events)) { return; }
        events.forEach(e => e.readonly = true);
        this.communityEvents = events;
      },
      error: err => { console.warn('[Admin] Events load failed', err); this.messageService.add({severity: 'warn', summary: 'Failed to load events', detail: err}); }
    });
  }

  setTab(tab: 'events' | 'board' | 'settings') { console.log('[Admin] Switching tab to', tab); this.activeTab = tab; }

  editRow(row: any) { row.readonly = false; }
  cancelEdit(row: any) { row.readonly = true; }

  addNewBoardMemberRow() {
    this.boardMembers.push({ title: '', name: '', email: '', readonly: false, newMember: true });
  }

  addNewEventRow() {
    const newEvent = new CommunityEvent();
    newEvent.eventName = '';
    newEvent.description = '';
    newEvent.startDate = null;
    newEvent.endDate = null;
    newEvent.readonly = false;
    this.communityEvents.unshift(newEvent);
  }

  onEventSave(communityEvent: CommunityEvent) {
    if (!communityEvent) return;
    this.eventService.saveNewEvent(communityEvent).subscribe(() => {
      this.messageService.add({severity: 'success', summary: 'Event Saved Successfully!'});
      communityEvent.readonly = true;
    }, err => this.messageService.add({severity: 'warn', summary: err}));
  }

  onBoardMemberSave(boardMember: BoardMember) {
    if (!boardMember || Object.values(boardMember).some(v => v === null || v === '')) {
      this.messageService.add({severity: 'warn', summary: 'Please fill in all fields.'});
      return;
    }
    this.boardMemberService.saveNewBoardMember(boardMember).subscribe(() => {
      this.messageService.add({severity: 'success', summary: 'Board Member Saved Successfully!'});
      boardMember.readonly = true;
      if (boardMember.newMember) {
        boardMember.newMember = false;
        this.addNewBoardMemberRow();
      }
    }, err => this.messageService.add({severity: 'warn', summary: err}));
  }

  onDeleteCommunityEvent(communityEvent: CommunityEvent) {
    if (!communityEvent) return;
    this.eventService.deleteEvent(communityEvent).subscribe(() => {
      this.messageService.add({severity: 'success', summary: 'Event Deleted Successfully!'});
      this.eventService.getAllEvents().subscribe(events => {
        events.forEach(e => e.readonly = true);
        this.communityEvents = events;
      });
    }, err => this.messageService.add({severity: 'warn', summary: err}));
  }

  onDeleteBoardMember(boardMember: BoardMember) {
    if (!boardMember) return;
    this.boardMemberService.deleteBoardMember(boardMember).subscribe(() => {
      this.messageService.add({severity: 'success', summary: 'Board Member Deleted Successfully!'});
      this.boardMemberService.getAllBoardMembers().subscribe(boardMembers => {
        boardMembers.forEach(b => b.readonly = true);
        this.boardMembers = boardMembers;
        this.addNewBoardMemberRow();
      });
    }, err => this.messageService.add({severity: 'warn', summary: err}));
  }

  trackByFn(index: number, item: any) { return item?.id || item?._id || item?.email || item?.eventName || index; }
}

