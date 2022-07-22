import { HTTP_INTERCEPTORS, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { 
    LocalStoresServices, 
    CryptoJsService, 
} from "../utils";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private localStoresServices: LocalStoresServices,
        private cryptoService: CryptoJsService,
    ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req.clone({
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        });

        const token = this.localStoresServices.getToken();

        if(token){
            authReq = req.clone({
                headers: new HttpHeaders({
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'x-access-token': (this.cryptoService.decrypt(token))
                })
            });
        }
        return next.handle(authReq);
    }
}

export const authInterceptorProviders = [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
];