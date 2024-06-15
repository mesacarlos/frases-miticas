import { JwtPayload } from "jwt-decode";

export interface MyJwtPayload extends JwtPayload {
    SuperUser: boolean;
    UserId: string;
    Username: string;
}
