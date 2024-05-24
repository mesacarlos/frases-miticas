import { Phrase } from "../home/interfaces/phrases.interface";
import { PhrasesService } from "../home/services/phrases.service";

export default class PhraseManagement
{
    private static instance: PhraseManagement;
    public loading: boolean = true;
    public phrases: Phrase[] = [];
    public length: number = 0;

    private constructor(
        private phrasesService: PhrasesService
    ) {}

    public static getInstance(phrasesService: PhrasesService): PhraseManagement
    {
        if (!this.instance)
            this.instance = new PhraseManagement(phrasesService);

        return this.instance;
    }

    public loadPhrases(
        pageSize: number = -1,
        pageIndex: number = 1,
        search: string = '',
        from: Date = new Date(0),
        to: Date = new Date(),
        authors: number[] = []
    )
    {
        this.loading = true;

        this.phrasesService.getPhrases(pageSize, pageIndex, search, from, to, authors)
            .subscribe(response =>
            {
                if (response)
                {
                    this.phrases = response.phrases;
                    this.length = response.totalItems;
                }

                this.loading = false;
            });
    }
}
