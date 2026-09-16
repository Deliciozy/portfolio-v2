import Link from "next/link";

import Container from "@/components/layout/Container";

export default function Navbar() {
  return (
    <header className="site-nav">
      <Container>
        <nav className="site-nav__inner">
          <Link
            href="/"
            className="site-nav__name"
          >
            Mary Chen
          </Link>

          <div className="site-nav__links">
            <Link href="/#work">
              Works
            </Link>

            <Link href="/about">
              About me
            </Link>

            <Link href="/resume.pdf">
              Resume
            </Link>
          </div>
        </nav>
      </Container>
    </header>
  );
}