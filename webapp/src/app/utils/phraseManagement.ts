import { Phrase } from "../home/interfaces/phrases.interface";
import { PhrasesService } from "../home/services/phrases.service";

export default class PhraseManagement
{
    private static instance: PhraseManagement;
    private pageSize: number = -1;
    private pageIndex: number = 1;
    private search: string = '';
    private from: Date = new Date(0);
    private to: Date = new Date();
    private authors: number[] = [];

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

    public setPageSize(pageSize: number): PhraseManagement
    {
        this.pageSize = pageSize;

        return this;
    }

    public setPageIndex(pageIndex: number): PhraseManagement
    {
        this.pageIndex = pageIndex;

        return this;
    }

    public setSearch(search: string): PhraseManagement
    {
        this.search = search;

        return this;
    }

    public setFrom(from: Date): PhraseManagement
    {
        this.from = from;

        return this;
    }

    public setTo(to: Date): PhraseManagement
    {
        this.to = to;

        return this;
    }

    public setAuthors(authors: number[]): PhraseManagement
    {
        this.authors = authors;

        return this;
    }

    public loadPhrases(): void
    {
        this.loading = true;

        this.phrasesService.getPhrases(
            this.pageSize,
            this.pageIndex,
            this.search,
            this.from,
            this.to,
            this.authors
        ).subscribe(response =>
            {
                if (response)
                {
                    this.phrases = response.phrases;
                    this.length = response.totalItems;
                }

                this.loading = false;
            });
    }

    public resetState(): PhraseManagement
    {
        this.setPageSize(-1)
            .setPageIndex(1)
            .setSearch('')
            .setFrom(new Date(0))
            .setTo(new Date())
            .setAuthors([]);

        return this;
    }
}
