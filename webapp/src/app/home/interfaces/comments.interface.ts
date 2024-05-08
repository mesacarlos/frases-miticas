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
