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

export interface Auth
{
    data: { token: string };
    success: boolean;
    message: string | null;
}
