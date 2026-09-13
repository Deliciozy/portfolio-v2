import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import ReviewCard from "@/components/ui/ReviewCard";
import Reveal from "@/components/motion/Reveal";

import StaggerGroup, {
  StaggerItem,
} from "@/components/motion/StaggerGroup";

import { reviews } from "@/data/reviews";

export default function ReviewsSection() {
  const leftReviews =
    reviews.slice(0, 2);

  const rightReviews =
    reviews.slice(2, 4);

  return (
    <Section
      size="sm"
      className="reviews-section"
    >
      <Container>
        <Reveal
          className="section-heading"
          distance={18}
        >
          <p className="section-kicker">
            // 05 //
          </p>

          <h2 className="section-title">
            Reviews
          </h2>
        </Reveal>

        <div className="reviews-layout">
          <div className="reviews-team">
            <Reveal distance={20}>
              <div className="reviews-team__placeholder">
                Team Image
              </div>

              <span className="reviews-team__label">
                My Team
              </span>
            </Reveal>
          </div>

          <StaggerGroup
            className="reviews-column"
            stagger={0.1}
          >
            {leftReviews.map(
              (review) => (
                <StaggerItem
                  key={review.name}
                  distance={18}
                >
                  <ReviewCard
                    review={review}
                  />
                </StaggerItem>
              )
            )}
          </StaggerGroup>

          <StaggerGroup
            className="reviews-column"
            stagger={0.1}
            delay={0.08}
          >
            {rightReviews.map(
              (review) => (
                <StaggerItem
                  key={review.name}
                  distance={18}
                >
                  <ReviewCard
                    review={review}
                  />
                </StaggerItem>
              )
            )}
          </StaggerGroup>
        </div>
      </Container>
    </Section>
  );
}