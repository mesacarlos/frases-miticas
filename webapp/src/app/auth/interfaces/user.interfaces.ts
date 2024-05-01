export interface UserLogin
{
    username: string;
    password: string;
}

export interface UserRegister
{
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    fullName: string;
    isSuperAdmin: boolean;
}
