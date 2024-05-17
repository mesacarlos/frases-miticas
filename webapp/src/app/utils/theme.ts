export default class Theme
{
    private static DARK: string = 'dark';
    private static LIGHT: string = 'light';

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
        return localStorage.getItem('theme') === this.DARK ?? true;
    }
}
