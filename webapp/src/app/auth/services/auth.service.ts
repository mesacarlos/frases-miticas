import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, of } from "rxjs";

import { environments } from "../../../environments/environments";
import { Auth } from "../interfaces/user.interfaces";

@Injectable({
    providedIn: 'root'
})
export class AuthService
{
    constructor(private http: HttpClient) {}

    public login(username: string, password: string): Observable<boolean>
    {
        return this.http.post<Auth>(`${ environments.API_GATEWAY }/account/login`, { username, password })
            .pipe(
                map(response =>
                {
                    if (response.success)
                        localStorage.setItem('token', response.data.token);

                    return response.success;
                }),
                catchError(() => of(false))
            );
    }
}
