import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { first } from 'rxjs/operators'
import { auth } from 'firebase/app'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

interface user {
	username: string,
	uid: string
}

@Injectable()
export class UserService {
	private user: user
	baseAPIRoot: string = environment.baseUrl;
	baseAPIRoute: string = 'api/user';
	baseAPIUrl: string = this.baseAPIRoot + this.baseAPIRoute;

	constructor(private afAuth: AngularFireAuth, private http: HttpClient) {

	}

	setUser(user: user) {
		this.user = user;
	}

	getUser(){
		return this.afAuth.auth.currentUser;
	}

	getUsername(): string {
		return this.user.username;
	}

	reAuth(username: string, password: string) {
		return this.afAuth.auth.currentUser
		.reauthenticateWithCredential(auth.EmailAuthProvider.credential(username + '@gmail.com', password));
	}

	updatePassword(newpassword: string) {
		return this.afAuth.auth.currentUser.updatePassword(newpassword);
	}

	updateEmail(newemail: string) {
		return this.afAuth.auth.currentUser.updateEmail(newemail + '@gmail.com');
	}

	async isAuthenticated() {
		if(this.user) return true;
		const user = await this.afAuth.authState.pipe(first()).toPromise();
		if(user) {
			this.setUser({
				username: user.email.split('@')[0],
				uid: user.uid
			})
			return true;
		}
		return false;
	}

	getUID(): string {
		return this.user.uid;
	}

	verifyAuth(){
		let user = {
			Id : JSON.parse(localStorage.getItem('currentUser')).Id,
			Token : localStorage.getItem('access_token')
		}
		return this.http.post(`${this.baseAPIUrl}/verify`, user);
	}
}