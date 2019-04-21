import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class FeedService {
    baseAPIRoot: string = environment.baseUrl;
    baseAPIRoute: string = 'api/recipe';
    baseAPIUrl: string = this.baseAPIRoot + this.baseAPIRoute;
    requestOptions: any;
    private rssToJsonServiceBaseUrl: string = 'https://rss2json.com/api.json?rss_url=';
    private recipeSource: string = 'https://www.bonappetit.com/feed/latest-recipes/rss';
    constructor(private http: HttpClient) { 
        this.requestOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
            })
        }
    }

    getFeedContent(url?: string): Observable<any> {
        url = url ? url : this.recipeSource;
        return this.http.get(this.rssToJsonServiceBaseUrl + url);
    }
}
