export default class Theme
{
    private static DARK: string = 'dark';
    private static LIGHT: string = 'light';

    static themes: DocsSiteTheme[] = [
        {
            primary: '#3F51B5',
            accent: '#E91E63',
            displayName: 'Indigo & Pink',
            name: 'indigo-pink',
            isDark: false,
        },
        {
            primary: '#9C27B0',
            accent: '#4CAF50',
            displayName: 'Purple & Green',
            name: 'purple-green',
            isDark: true,
        },
    ];

    static checkTheme(): void
    {
        const html = document.querySelector('html');

        if (!html)
        {
            console.error("HTML label not exists");
            return;
        }

        if (this.checkIfConfigExists(html))
            return;

        if (html.classList.contains(this.DARK))
            localStorage.setItem('theme', this.DARK);
        else
            localStorage.setItem('theme', this.LIGHT);
    }

    static changeTheme(): void
    {
        const html = document.querySelector('html');

        if (!html)
        {
            console.error("HTML label not exists");
            return;
        }

        if (localStorage.getItem('theme') === this.DARK)
        {
            localStorage.setItem('theme', this.LIGHT);
            html.classList.remove(this.DARK);
            return;
        }

        localStorage.setItem('theme', this.DARK);
        html.classList.add(this.DARK);
    }

    static checkIfConfigExists(html: HTMLElement): boolean
    {
        if (!localStorage.getItem('theme'))
            return false;

        if (localStorage.getItem('theme') === this.DARK)
            html.classList.add(this.DARK);
        else
            html.classList.remove(this.DARK);

        return true;
    }

    static isDarkMode(): boolean
    {
        return localStorage.getItem('theme') === this.DARK;
    }
}

export interface DocsSiteTheme
{
    primary: string,
    accent: string,
    displayName: string,
    name: string,
    isDark: boolean,
}
