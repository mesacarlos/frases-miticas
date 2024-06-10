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

export interface User
{
    id: number;
    username: string;
    fullName: string;
    isSuperAdmin: boolean;
    profilePictureUrl: string;
}

export interface ChangePassword
{
    oldPassword: string;
    newPassword: string;
    newPasswordConfirm: string;
}

export interface InvolvedUser
{
	id: number;
	username: string;
	fullname: string;
	profilePictureUrl: string;
}
