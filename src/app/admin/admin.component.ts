import { Component, OnInit } from '@angular/core';
import {LoginService} from '../services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})


export class AdminComponent implements OnInit {
  referenceGroups: ReferenceGroup[];

  selectedReferenceGroup: ReferenceGroup;
  readOnlyMode: boolean;
  loading = false;
  addLabel: string;


  confirmationDialogKey = 'admin-values-confirmation-dialog';

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    // Check if authentication has happened
    const tokenValue = this.loginService.getAuthorizationHeaderValue();
    if (tokenValue == null || tokenValue === '') {
      this.router.navigate(['/login']);
    }

    this.loginService.checkAuthToken();

    this.referenceGroups = [
        {label: 'Board Members', groupCode: 'board_members'},
        {label: 'Request Email', groupCode: 'request_email'},
        {label: 'Community Events', groupCode: 'community_events'}
      ];

      this.selectedReferenceGroup = this.referenceGroups[0];
  }

  addValue() {
  }

  onReferenceGroupSelected() {
    this.loading = true;
      this.addLabel = 'Add Value';
  }

  toggleEditMode(dataRow: ValidValueDataRow) {
    if (!dataRow.readonly) {
      dataRow.editMode = !dataRow.editMode;
    }
  }

  editRow(dataRow: ValidValueDataRow) {
    this.toggleEditMode(dataRow);
  }

  cancelEdit(dataRow: any) {
  }

}

class ReferenceGroup {
  label: String;
  groupCode: String;
  readonly ?: boolean;
}

class ValidValueDataRow {
  groupId: number;
  groupCode: string;
  groupValue: string;
  selectedProgramValues?: string[];
  readonly?: boolean;
  editMode: boolean;
  loading: boolean;
}

