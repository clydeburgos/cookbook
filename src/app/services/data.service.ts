import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject }    from 'rxjs';

@Injectable()
export class DataService { 
    public _subject = new Subject<object>();
    public event = this._subject.asObservable();

    baseAPIRoot: string = environment.baseUrl;
    baseAPIRoute: string = 'api/recipe';
    baseAPIUrl: string = this.baseAPIRoot + this.baseAPIRoute;
    requestOptions: any;
    constructor(private http:HttpClient) {
        this.requestOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
            })
        }
    }


    public publishAddedRecipe(recipe: any){
        this._subject.next(recipe);
    }
}