import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

export default function Home() {
  return (
    <main>
      <Section>
        <Container>
          <h1
            style={{
              margin: 0,
              fontSize: "var(--text-h1)",
              lineHeight: 0.9,
            }}
          >
            Portfolio V2
          </h1>

          <p
            style={{
              marginTop: "2rem",
              fontSize: "var(--text-body)",
            }}
          >
            Responsive system test
          </p>
        </Container>
      </Section>
    </main>
  );
}