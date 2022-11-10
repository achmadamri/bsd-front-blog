import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { EntryService } from 'app/services/entry/entry.service';
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

  EntryAdd() {
    this.router.navigate(['/entry-add']);
  }

}
