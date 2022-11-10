import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Util } from 'app/util';
import { Title } from '@angular/platform-browser';
import { EntryEditRequest } from 'app/services/entry/entryEditrequest';
import { EntryEditResponse } from 'app/services/entry/entryEditresponse';
import { EntryService } from 'app/services/entry/entry.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { GetEntryRequest } from 'app/services/entry/getentryrequest';
import { GetEntryResponse } from 'app/services/entry/getentryresponse';

export interface Country {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-entry-edit',
  templateUrl: './entry-edit.component.html',
  styleUrls: ['./entry-edit.component.css']
})
export class EntryEditComponent implements OnInit {
  clicked = false;
  util: Util = new Util();
  getEntryRequest: GetEntryRequest = new GetEntryRequest();
  getEntryResponse: GetEntryResponse = new GetEntryResponse();
  entryEditRequest: EntryEditRequest = new EntryEditRequest();
  entryEditResponse: EntryEditResponse = new EntryEditResponse();
  role: string[];
  editor = ClassicEditor;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
    private entryService: EntryService,
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Entry - Edit');

    this.route.paramMap.subscribe(params => {
      this.getEntryRequest.tbeId = params.get('tbeId') == null ? '0' : params.get('tbeId');

      this.entryService.getEntry(this.getEntryRequest)
        .subscribe(
          successResponse => {
            this.getEntryResponse = successResponse;

            this.entryEditRequest.tbEntry = this.getEntryResponse.tbEntry;
          },
          errorResponse => {
            this.util.showNotification('danger', 'top', 'center', errorResponse.error.error + '<br>' + errorResponse.error.message);
            this.router.navigate(['/user-login']);
          }
        );
    });
  }

  save() {
    this.clicked = !this.clicked;

    this.entryService.postEntryEdit(this.entryEditRequest)
    .subscribe(
      successResponse => {
        this.clicked = !this.clicked;

        this.entryEditResponse = successResponse;

        this.util.showNotification('info', 'top', 'center', this.entryEditResponse.message);
      },
      errorResponse => {
        this.clicked = !this.clicked;

        if (errorResponse.error.status === 400) {
          let message = "";

          for (let i = 0; i < errorResponse.error.errors.length; i++) {
            message = message + errorResponse.error.errors[i].defaultMessage + "<br>";
          }

          this.util.showNotification('danger', 'top', 'center', message);
        } else if (errorResponse.error.status === 403) {
          this.util.showNotification('danger', 'top', 'center', errorResponse.error.error + '<br>' + errorResponse.error.message);

          this.router.navigate(['/entry-login']);
        } else {
          this.util.showNotification('danger', 'top', 'center', errorResponse.error.message);
        }
      }
    );
  }

  back() {
    this.router.navigate(['/entry']);
  }
}
