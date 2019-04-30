export class BaseComponent { 
    constructor(){};
    public isLoggedIn(){
        return localStorage.getItem('isLoggedIn') && JSON.parse(localStorage.getItem('isLoggedIn'));
    }

    public userPhoto() {
        let photo = this.getCurrentUser().PhotoUrl;
        return photo ? photo : 'https://thesocietypages.org/socimages/files/2009/05/nopic_192.gif';
    }

    public onLogIn(){
        localStorage.setItem('isLoggedIn', 'true');
    }

    public onLogOut(){
        localStorage.clear();
    }

    public setUser(userData: any){
        localStorage.setItem('currentUser', JSON.stringify(userData));
    }

    public getCurrentUser(){
        return localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null;
    }

    public getCurrentUserId(){
        return this.getCurrentUser() ? this.getCurrentUser().Id : null;
    }

    public setUserToken(token: string) {
		localStorage.setItem('access_token', token);
	}

	private getUserToken() {
		return localStorage.getItem('access_token');
	}
}