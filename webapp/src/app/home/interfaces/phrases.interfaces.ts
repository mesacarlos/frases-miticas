export interface Phrase
{
    id: number;
    author: string;
    date: string;
    text: string;
    context: string | null;
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
