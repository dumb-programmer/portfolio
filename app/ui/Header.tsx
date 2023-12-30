export default function Header() {
    return <header className="flex justify-end absolute right-10 top-10">
        <nav>
            <ul className="flex gap-6">
                <li>
                    <a href="/projects">Projects</a>
                </li>
                <li>
                    <a href="/about">About</a>
                </li>
                <li>
                    <a href="/blog">Blog</a>
                </li>
            </ul>
        </nav>
    </header>;
}