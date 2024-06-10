import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, of } from "rxjs";

import { environments } from "../../../environments/environments";
import { NewUser, User } from "../../auth/interfaces/users.interface";
import { AuthService } from "../../auth/services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class UsersService
{
    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {}

    private headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ localStorage.getItem('token') }`
    });

    public getUsers(): Observable<User[]>
    {
        return this.http.get<Users>(
            `${ environments.API_GATEWAY }/user`,
            { headers: this.headers }
        ).pipe(
            map(response =>
                {
                    let users: User[] = [];

                    for (let i = 0; i < response.data.length; i++)
                    {
                        const user: User = {
                            id: response.data[i].id,
                            username: response.data[i].username,
                            fullName: response.data[i].fullName,
                            isSuperAdmin: response.data[i].isSuperAdmin,
                            profilePictureUrl: response.data[i].profilePictureUrl
                        }

                        users.push(user);
                    }

                    return users;
                }
            ),
            catchError(() => of([]))
        );
    }

    public addUser(user: NewUser): Observable<boolean>
    {
        if (!this.authService.isAdmin())
            throw new Error("You don´t have permission to perform this operation");

        return this.http.post<any>(
            `${ environments.API_GATEWAY }/admin/user`,
            user,
            { headers: this.headers }
        ).pipe(
            map(response =>
                {
                    console.log(response);

                    return !!response;
                }
            ),
            catchError(() => of(false))
        );
    }
}

export interface Users
{
    data: User[];
}
