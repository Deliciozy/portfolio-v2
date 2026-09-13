import Container from "@/components/layout/Container";

export default function Navbar() {
  return (
    <header className="site-nav">
      <Container>
        <nav className="site-nav__inner">
          <a href="/" className="site-nav__name">
            Mary Chen
          </a>

          <div className="site-nav__links">
            <a href="#work">Works</a>
            <a href="#about">About me</a>
            <a href="/resume.pdf">Resume</a>
          </div>
        </nav>
      </Container>
    </header>
  );
}