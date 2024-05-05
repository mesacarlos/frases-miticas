import { User } from "../../auth/interfaces/user.interfaces";

export interface Phrase
{
    id: number;
    author: string;
    date: string;
    text: string;
    context: string | null;
	involvedUsers : InvolvedUser[];
}

export interface InvolvedUser
{
	id: number;
	username: string;
	fullname: string;
	profilePictureUrl: string;
}

export interface AddPhrase
{
    author: string;
    date: Date;
    text: string;
    context: string;
    users: User[]
}

export interface GetPhrases
{
    phrases: Phrase[];
    totalItems: number;
}

export interface Comment
{
    id: number;
    quoteId: number;
    date: string;
    text: string;
    user: {
        id: number;
        username: string;
        userFullName: string;
        profilePictureUrl: string;
    }
}

export interface AddComment
{
    comment: string;
}

export interface ChangePassword
{
    oldPassword: string;
    newPassword: string;
    newPasswordConfirm: string;
}

export interface Search
{
    search: string;
}
