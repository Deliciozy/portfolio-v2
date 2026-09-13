import Container from "@/components/layout/Container";

export default function Footer() {
  return (
    <footer
      id="about"
      className="site-footer"
    >
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
            <a href="#work">
              Works
            </a>

            <a href="#about">
              About me
            </a>

            <a href="/resume.pdf">
              Resume
            </a>
          </nav>
        </div>
      </Container>
    </footer>
  );
}