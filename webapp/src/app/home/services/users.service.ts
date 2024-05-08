import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, of } from "rxjs";

import { environments } from "../../../environments/environments";
import { User } from "../../auth/interfaces/user.interface";

@Injectable({
    providedIn: 'root'
})
export class UsersService
{
    constructor(private http: HttpClient) {}

    private headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ localStorage.getItem('token') }`
    });

    public getUsers(): Observable<User[]>
    {
        return this.http.get<GetUsers>(
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
}

export interface GetUsers
{
    data: GetUser[];
}

export interface GetUser
{
    id: number,
    username: string;
    fullName: string;
    isSuperAdmin: boolean;
    profilePictureUrl: string;
}
