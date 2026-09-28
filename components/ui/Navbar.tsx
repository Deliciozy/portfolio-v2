import Link from "next/link";

export default function Navbar() {
  return (
    <header className="site-nav">
      <div className="site-nav__frame">
        <Link
          href="/"
          className="site-nav__brand"
        >
          Mary Chen
        </Link>

        <nav
          className="site-nav__links"
          aria-label="Primary navigation"
        >
          <Link href="/#work">
            Works
          </Link>

          <Link href="/about">
            About me
          </Link>

          <Link href="/resume">
            Resume
          </Link>
        </nav>
      </div>
    </header>
  );
}