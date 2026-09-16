import Link from "next/link";

import Container from "@/components/layout/Container";

export default function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="site-footer__inner">
          <div>
            <p className="site-footer__name">
              Mary Chen
            </p>

            <p className="site-footer__caption">
              Portfolio
            </p>
          </div>

          <nav
            className="site-footer__links"
            aria-label="Footer navigation"
          >
            <Link href="/#work">
              Works
            </Link>

            <Link href="/about">
              About me
            </Link>

            <Link href="/resume.pdf">
              Resume
            </Link>
          </nav>
        </div>
      </Container>
    </footer>
  );
}