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
}

export interface GetPhrases
{
    phrases: Phrase[];
    totalItems: number;
}
