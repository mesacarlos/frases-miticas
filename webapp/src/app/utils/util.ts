
export default class Util
{
    private static reactionsDicctionary: SkeletonReaction = {
        "like": "&#128077;",
        "dislike": "&#128078;",
        "love": "&#129505;",
        "fire": "&#128293;"
    };

    static getWindowWidth(): string
    {
        let width: string = '60%';

        if (window.innerWidth < 600)
            width = '95%';

        return width;
    }

    static getReactions(): SkeletonReaction
    {
        return this.reactionsDicctionary;
    }
}

export interface SkeletonReaction
{
    [icon: string]: string;
}
