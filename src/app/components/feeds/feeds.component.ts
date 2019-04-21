import { Component, OnInit } from '@angular/core';
import { FeedService } from 'src/app/services/feed.service';
import { FeedModel } from 'src/app/models/feed.model';
import { routerTransition } from 'src/app/app.animations';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss'],
  animations: [routerTransition()]
})
export class FeedsComponent implements OnInit {
  loading: boolean = false;
  searchInput: string = '';
  feeds: any[] = [];
  feedsClone: any[] = [];
  constructor(private feedService: FeedService) { }

  ngOnInit() {
    this.getFeeds();
  }

  getFeeds(){
    this.loading = true;
    this.feedService.getFeedContent().subscribe((res : any) => {
      this.feeds = res.items;
      this.loading = false;
      this.feedsClone = res.items;
    });
  }

  filter(){
    this.loading = true;
    if(this.searchInput) {
      this.feeds = this.feeds.filter((item) => {
        return item.title.toString().toLowerCase().includes(this.searchInput);
      });
    } 
    else {
      this.feeds = this.feedsClone;
    }
    
    this.loading = false;
  }

}
