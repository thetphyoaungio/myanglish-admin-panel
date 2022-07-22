import { Injectable } from "@angular/core";

const TOKEN_KEY = 'laruklar';
const USER_NAME_KEY = 'parusapar';

@Injectable({providedIn:'root'})
export class LocalStoresServices {
    saveToken(data:string){
        localStorage.removeItem(TOKEN_KEY);
        localStorage.setItem(TOKEN_KEY, data);
    }
    getToken():string|null{
        return localStorage.getItem(TOKEN_KEY);
    }
    clearToken(){
        localStorage.removeItem(TOKEN_KEY);
    }

    saveLoggedInUserName(data:string){
        localStorage.removeItem(USER_NAME_KEY);
        localStorage.setItem(USER_NAME_KEY, data);
    }
    getLoggedInUserName():string|null{
        return localStorage.getItem(USER_NAME_KEY);
    }
    clearLoggedInUserName(){
        localStorage.removeItem(USER_NAME_KEY);
    }

    clearAuth(){
        this.clearToken();
        this.clearLoggedInUserName();
    }
}