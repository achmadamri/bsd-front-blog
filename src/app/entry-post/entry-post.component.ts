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
import { EntryCommentRequest } from 'app/services/entry/entrycommentrequest';
import { EntryCommentResponse } from 'app/services/entry/entrycommentresponse';

export interface Country {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-entry-post',
  templateUrl: './entry-post.component.html',
  styleUrls: ['./entry-post.component.css']
})
export class EntryPostComponent implements OnInit {
  clicked = false;
  util: Util = new Util();
  getEntryRequest: GetEntryRequest = new GetEntryRequest();
  getEntryResponse: GetEntryResponse = new GetEntryResponse();
  entryEditRequest: EntryEditRequest = new EntryEditRequest();
  entryEditResponse: EntryEditResponse = new EntryEditResponse();
  entryCommentRequest: EntryCommentRequest = new EntryCommentRequest();
  entryCommentResponse: EntryCommentResponse = new EntryCommentResponse();
  role: string[];
  editor = ClassicEditor;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
    private entryService: EntryService,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.getEntryRequest.tbeId = params.get('tbeId') == null ? '0' : params.get('tbeId');

      this.entryService.getEntryPost(this.getEntryRequest)
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

  postComment() {
    this.clicked = !this.clicked;

    this.entryCommentRequest.tbEntry.tbeId = parseInt(this.getEntryRequest.tbeId);

    this.entryService.postEntryComment(this.entryCommentRequest)
    .subscribe(
      successResponse => {
        this.clicked = !this.clicked;

        this.entryEditResponse = successResponse;

        this.util.showNotification('info', 'top', 'center', this.entryEditResponse.message);

        this.entryService.getEntryPost(this.getEntryRequest)
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
    this.router.navigate(['/entry-view']);
  }
}
