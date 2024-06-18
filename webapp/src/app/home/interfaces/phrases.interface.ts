import { InvolvedUser, User } from "../../auth/interfaces/users.interface";

export interface Phrase
{
    id: number;
    author: string;
    date: string;
    text: string;
    context: string | null;
	involvedUsers : InvolvedUser[];
    reactions: Reaction[];
    commentCount: number;
}

export interface AddPhrase
{
    author: string;
    date: Date;
    text: string;
    context: string;
    users: User[]
}

export interface EditPhrase
{
    id: number;
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

export interface Reaction
{
    userId: number;
    type: string;
}
