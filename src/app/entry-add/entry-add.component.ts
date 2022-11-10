import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Util } from 'app/util';
import { Title } from '@angular/platform-browser';
import { EntryAddRequest } from 'app/services/entry/entryaddrequest';
import { EntryAddResponse } from 'app/services/entry/entryaddresponse';
import { EntryService } from 'app/services/entry/entry.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export interface Country {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-entry-add',
  templateUrl: './entry-add.component.html',
  styleUrls: ['./entry-add.component.css']
})
export class EntryAddComponent implements OnInit {
  clicked = false;
  util: Util = new Util();
  entryAddRequest: EntryAddRequest = new EntryAddRequest();
  entryAddResponse: EntryAddResponse = new EntryAddResponse();
  role: string[];
  editor = ClassicEditor;

  constructor(
    private router: Router,
    private titleService: Title,
    private entryService: EntryService,
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Entry - Add');
  }

  save() {
    this.clicked = !this.clicked;

    this.entryService.postEntryAdd(this.entryAddRequest)
    .subscribe(
      successResponse => {
        this.clicked = !this.clicked;

        this.entryAddResponse = successResponse;

        this.util.showNotification('info', 'top', 'center', this.entryAddResponse.message);

        this.entryAddRequest = new EntryAddRequest();
        this.entryAddRequest.tbEntry.tbeContent = '';
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
