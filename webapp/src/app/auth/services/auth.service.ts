import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, of, switchMap } from "rxjs";

import { environments } from "../../../environments/environments";
import { Auth, ChangePassword } from "../interfaces/user.interface";
import { JwtPayload, jwtDecode } from "jwt-decode";

@Injectable({
    providedIn: 'root'
})
export class AuthService
{
    constructor(private http: HttpClient) {}

    private headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ localStorage.getItem('token') }`
    });

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

    public getUsername(): Observable<string>
    {
        return this.http.get<any>(
            `${ environments.API_GATEWAY }/user/self`,
            { headers: this.headers }
        ).pipe(
            map(response => response.data.username),
            catchError(() => of(''))
        );
    }

    public isAuthenticated(): boolean
    {
        return !!localStorage.getItem('token');
    }

    public changePassword(changePassword: ChangePassword): Observable<boolean>
    {
        return this.getUsername()
            .pipe(
                switchMap(username =>
                {
                    return this.http.post<any>(
                        `${ environments.API_GATEWAY }/account/change-password`,
                        {
                            "username": username,
                            "oldPassword": changePassword.oldPassword,
                            "newPassword": changePassword.newPassword
                        },
                        { headers: this.headers }
                    ).pipe(
                        map(response => response.success),
                        catchError(() => of(false))
                    );
                }),
                catchError(() => of(false))
            );
    }

    public verifyToken(): boolean
    {
        const token = localStorage.getItem('token');

        if (!token)
            return false;

        try {
            const decode: JwtPayload = jwtDecode(token);
            const timeExpire: number = (decode.exp ?? 0) * 1000;

            return !!decode && timeExpire - Date.now() > 0;

        } catch (err) {
            return false;
        }
    }
}
