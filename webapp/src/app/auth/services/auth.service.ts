import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { jwtDecode } from "jwt-decode";
import { Observable, catchError, map, of, switchMap } from "rxjs";

import { Auth, ChangePassword, User } from "../interfaces/user.interface";
import { environments } from "../../../environments/environments";
import { MyJwtPayload } from '../interfaces/auth.interface';

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

    public getUserSelf(): Observable<User | null>
    {
        return this.http.get<any>(
            `${ environments.API_GATEWAY }/user/self`,
            { headers: this.headers }
        ).pipe(
            map( response => response.data ),
            catchError(() => of(null))
        );
    }

    public isAuthenticated(): boolean
    {
        return this.decodeToken() !== null;
    }

    public isAdmin(): boolean
    {
        return this.decodeToken()?.SuperUser ?? false;
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
        const decode = this.decodeToken();

        if (decode === null)
            return false;

        const timeExpire: number = (decode.exp ?? 0) * 1000;

        return !!decode && timeExpire - Date.now() > 0;
    }

    private decodeToken(): MyJwtPayload | null
    {
        try {
            const token = localStorage.getItem('token');

            if (!token)
                return null;

            const decode: MyJwtPayload = jwtDecode(token);

            if (decode)
                return decode;

            return null;

        } catch (err) {
            return null;
        }
    }
}
