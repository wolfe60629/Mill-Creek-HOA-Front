import { Component, OnInit } from '@angular/core';
import {LoginService} from '../services/login.service';
import {Router} from '@angular/router';
import {BoardMember} from '../types/boardMember';
import {BoardMemberService} from '../services/board-member.service';
import {CommunityEvent} from '../types/communityEvent';
import {RequestsService} from '../services/requests.service';
import {EventService} from '../services/event.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})


export class AdminComponent implements OnInit {
  referenceGroups: ReferenceGroup[];
  boardMembers: BoardMember[];
  communityEvents: CommunityEvent[];

  selectedReferenceGroup: ReferenceGroup;
  readOnlyMode: boolean;
  loading = false;
  addLabel: string;


  confirmationDialogKey = 'admin-values-confirmation-dialog';

  constructor(private loginService: LoginService,
              private boardMemberService: BoardMemberService,
              private router: Router,
              private eventService: EventService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    // Check if authentication has happened
    const tokenValue = this.loginService.getAuthorizationHeaderValue();
    if (tokenValue == null || tokenValue === '') {
      this.router.navigate(['/login']);
    }
    this.loginService.checkAuthToken();

    // Load Possible Reference Groups
    this.referenceGroups = [
        {label: 'Board Members', groupCode: 'board_members'},
        {label: 'Request Settings', groupCode: 'request_settings'},
        {label: 'Community Events', groupCode: 'community_events'}
      ];

      this.selectedReferenceGroup = this.referenceGroups[0];

      // Load Board Members
      this.boardMemberService.getAllBoardMembers().subscribe(boardMembers => {
        boardMembers.forEach((boardMember) => {
          boardMember.readonly = true;
        });

        this.boardMembers = boardMembers;

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
    const newBoardMember = new BoardMember();
    newBoardMember.name = '';
    newBoardMember.email = '';
    newBoardMember.title = '';
    newBoardMember.readonly = false;
    this.boardMembers.unshift(newBoardMember);
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
      this.messageService.add({severity: 'success', summary: 'Event Added Successfully!'});
      communityEvent.readonly = true;
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


  formatAMPM(date) {
    const newDate = new Date(date);

    let hours = newDate.getHours();
    let minutes = newDate.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? 0 + minutes : minutes;
    const strTime = hours + ':' + (minutes === 0 ? '00' : minutes) + ' ' + ampm;
    const strMonth = newDate.getUTCMonth() + 1;
    const strDay = newDate.getDate();
    const strYear = newDate.getFullYear();
    const strDate = strMonth + '/' + strDay + '/' + strYear;
    return strDate + ' ' + strTime;
  }
}

class ReferenceGroup {
  label: String;
  groupCode: String;
  readonly ?: boolean;
}

