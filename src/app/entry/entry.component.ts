import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { EntryService } from 'app/services/entry/entry.service';
import { EntryDeleteRequest } from 'app/services/entry/entrydeleterequest';
import { EntryDeleteResponse } from 'app/services/entry/entrydeleteresponse';
import { GetEntryListRequest } from 'app/services/entry/getentrylistrequest';
import { GetEntryListResponse } from 'app/services/entry/getentrylistresponse';
import { Util } from 'app/util';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html'
})
export class EntryComponent implements OnInit {
  clicked = false;
  util: Util = new Util();
  length = 100;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;
  pageDisabled: boolean = false;
  getEntryListRequest: GetEntryListRequest = new GetEntryListRequest();
  getEntryListResponse: GetEntryListResponse = new GetEntryListResponse();
  entryDeleteRequest: EntryDeleteRequest = new EntryDeleteRequest();
  entryDeleteResponse: EntryDeleteResponse = new EntryDeleteResponse();
  tbeTitle = "";
  tbeChunk = "";
  tbeContent = "";

  constructor(
    private router: Router,
    private titleService: Title,
    private entryService: EntryService,
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Entry - Entry');
      
    this.getEntryList(null);
  }

  getEntryList(pageEvent: PageEvent) {
    this.clicked = !this.clicked;

    this.entryService.getEntryList(this.tbeTitle, this.tbeChunk, this.tbeContent, pageEvent != null ? pageEvent.length : this.length, pageEvent != null ? pageEvent.pageSize : this.pageSize, pageEvent != null ? pageEvent.pageIndex : this.pageIndex, this.getEntryListRequest)
      .subscribe(
        successResponse => {
          this.clicked = !this.clicked;

          this.getEntryListResponse = successResponse;

          this.length = this.getEntryListResponse.length;

          if (pageEvent != null) {
            this.length = pageEvent.length;
            this.pageSize = pageEvent.pageSize;
            this.pageIndex = pageEvent.pageIndex;
          }          
        },
        errorResponse => {
          this.clicked = !this.clicked;
          
          this.getEntryListResponse = new GetEntryListResponse();
        }
      );
  }

  getPage(pageEvent: PageEvent) {
    this.getEntryList(pageEvent);
  }

  entryAdd() {
    this.router.navigate(['/entry-add']);
  }

  delete(tbeId: number) {
    this.clicked = !this.clicked;
    
    this.entryDeleteRequest.tbEntry.tbeId = tbeId;

    this.entryService.postEntryDelete(this.entryDeleteRequest)
    .subscribe(
      successResponse => {
        this.clicked = !this.clicked;

        this.entryDeleteResponse = successResponse;

        this.util.showNotification('info', 'top', 'center', this.entryDeleteResponse.message);

        this.getEntryList(null);
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

}
