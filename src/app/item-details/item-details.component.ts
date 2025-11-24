import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';

import { HackerNewsAPIService } from '../shared/services/hackernews-api.service';
import { SettingsService } from '../shared/services/settings.service';
import { VisitTrackingService } from '../shared/services/visit-tracking.service';

import { Story } from '../shared/models/story';
import { Settings } from '../shared/models/settings';
import { Comment } from '../shared/models/comment';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {
  sub: Subscription;
  item: Story;
  errorMessage = '';
  settings: Settings;

  constructor(
    private _hackerNewsAPIService: HackerNewsAPIService,
    private _settingsService: SettingsService,
    private _visitTrackingService: VisitTrackingService,
    private route: ActivatedRoute,
    private _location: Location
  ) {
    this.settings = this._settingsService.settings;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let itemID = +params['id'];
      this._hackerNewsAPIService.fetchItemContent(itemID).subscribe(item => {
        this.item = item;
        const lastVisitTime = this._visitTrackingService.getLastVisit(itemID);
        if (lastVisitTime && this.item.comments) {
          this.markNewComments(this.item.comments, lastVisitTime);
        }
        this._visitTrackingService.recordVisit(itemID);
      }, error => this.errorMessage = 'Could not load item comments.');
    });
    window.scrollTo(0, 0);
  }

  markNewComments(comments: Comment[], lastVisit: number) {
    comments.forEach(comment => {
      comment.isNew = comment.time * 1000 > lastVisit;
      if (comment.comments) {
        this.markNewComments(comment.comments, lastVisit);
      }
    });
  }

  goBack() {
    this._location.back();
  }

  get hasUrl(): boolean {
    return this.item.url.indexOf('http') === 0;
  }

}
