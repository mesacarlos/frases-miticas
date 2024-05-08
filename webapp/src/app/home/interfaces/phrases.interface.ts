import { InvolvedUser, User } from "../../auth/interfaces/user.interface";

export interface Phrase
{
    id: number;
    author: string;
    date: string;
    text: string;
    context: string | null;
	involvedUsers : InvolvedUser[];
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

export interface Search
{
    search: string;
}
