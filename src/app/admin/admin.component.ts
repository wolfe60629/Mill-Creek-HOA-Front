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
  referenceGroups: ReferenceGroup[];
  boardMembers: BoardMember[];
  communityEvents: CommunityEvent[];

  selectedReferenceGroup: ReferenceGroup;
  isRequestEmailEdit: boolean = false;
  loading = false;
  addLabel: string;
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
    // Check if authentication has happened
    const tokenValue = this.loginService.getAuthorizationHeaderValue();
    if (tokenValue == null || tokenValue === '') {
      this.router.navigate(['/login']);
    }
    this.loginService.checkAuthToken();

    // Load Possible Reference Groups
    this.referenceGroups = [
        {label: '👥 Board Members', groupCode: 'board_members'},
      {label: '📅 Community Events', groupCode: 'community_events'},
    ];

      this.selectedReferenceGroup = this.referenceGroups[0];

      // Load Board Members
      this.boardMemberService.getAllBoardMembers().subscribe(boardMembers => {
        boardMembers.forEach((boardMember) => {
          boardMember.readonly = true;
        });

        this.boardMembers = boardMembers;
        this.addNewBoardMemberRow();

        // Load Community Events
        this.eventService.getAllEvents().subscribe((events) => {
          events.forEach((event) => {
            event.readonly = true;
          });

          this.communityEvents = events;
        });
      });
  }

  addValue() {
  }

  onReferenceGroupSelected() {
    this.loading = true;
      this.addLabel = 'Add Value';
  }


  editRow(boardMemberRow: BoardMember) {
    boardMemberRow.readonly = false;
  }

  cancelEdit(boardMemberRow: BoardMember) {
    boardMemberRow.readonly = true;
  }

  addNewBoardMemberRow() {
    this.boardMembers.push({
      title: '',
      name: '',
      email: '',
      readonly: false,
      newMember: true
    });
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
    if (!communityEvent) {
      return;
    }

    this.eventService.saveNewEvent(communityEvent).subscribe(() => {
      this.messageService.add({severity: 'success', summary: 'Event Saved Successfully!'});
      communityEvent.readonly = true;
    }, (err) => {
      this.messageService.add({severity: 'warn', summary: err});
    });
  }

  onBoardMemberSave(boardMember: BoardMember) {
    if (!boardMember || Object.values(boardMember).some(value => value === null || value === "")) {
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

    }, (err) => {
      this.messageService.add({severity: 'warn', summary: err});
    });
  }


  onDeleteCommunityEvent(communityEvent: CommunityEvent) {
    if (!communityEvent) {
      return;
    }

    this.eventService.deleteEvent(communityEvent).subscribe(() => {
      this.messageService.add({severity: 'success', summary: 'Event Deleted Successfully!'});
      this.eventService.getAllEvents().subscribe((events) => {
        events.forEach((event) => {event.readonly = true; });
        this.communityEvents = events;
      });
    }, (err) => {
      this.messageService.add({severity: 'warn', summary: err});
    });
  }


  onDeleteBoardMember(boardMember: BoardMember) {
    if (!boardMember) {
      return;
    }

    this.boardMemberService.deleteBoardMember(boardMember).subscribe(() => {
      this.messageService.add({severity: 'success', summary: 'Board Member Deleted Successfully!'});
      this.boardMemberService.getAllBoardMembers().subscribe((boardMembers: BoardMember[]) => {
        boardMembers.forEach((board) => {board.readonly = true; });
        this.boardMembers = boardMembers;
        this.addNewBoardMemberRow();
      });
    }, (err) => {
      this.messageService.add({severity: 'warn', summary: err});
    });
  }
}

class ReferenceGroup {
  label: String;
  groupCode: String;
  readonly ?: boolean;
}

