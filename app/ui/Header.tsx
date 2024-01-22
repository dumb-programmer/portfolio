export default function Header() {
    return <header className="flex justify-end absolute right-10 top-10">
        <nav>
            <ul className="flex gap-6">
                <li>
                    <a className="focus:outline-offset-2 focus:outline-2 focus:outline-purple-600 hover:text-purple-600 transition-all" href="/projects">Projects</a>
                </li>
                <li>
                    <a className="focus:outline-offset-2 focus:outline-2 focus:outline-purple-600 hover:text-purple-600 transition-all" href="/about">About</a>
                </li>
                <li>
                    <a className="focus:outline-offset-2 focus:outline-2 focus:outline-purple-600 hover:text-purple-600 transition-all" href="/blog">Blog</a>
                </li>
            </ul>
        </nav>
    </header>;
}