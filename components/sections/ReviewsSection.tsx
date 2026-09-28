import Image from "next/image";

import Reveal from "@/components/motion/Reveal";

import ReviewCard from "@/components/ui/ReviewCard";
import SectionHeading from "@/components/ui/SectionHeading";

import {
  reviews,
} from "@/data/reviews";

export default function ReviewsSection() {
  return (
    <section className="home-reviews">
      <div className="home-section-container">
        <SectionHeading
          index="05"
          title="Reviews"
        />

        <div className="home-reviews__layout">
          <Reveal
            className="home-team"
            distance={60}
          >
            <div className="home-team__image-wrap">
              <Image
                src="/images/home/team.png"
                alt="Mary Chen with her team"
                fill
                sizes="
                  (min-width: 1200px) 397px,
                  (min-width: 810px) 370px,
                  351px
                "
                className="home-team__image"
              />
            </div>

            <div className="home-team__label">
              My Team
            </div>
          </Reveal>

          <div className="home-reviews__cards">
            <div className="home-reviews__left">
              <Reveal
                className="home-review-wrap home-review-wrap--long"
                distance={60}
              >
                <ReviewCard
                  review={
                    reviews[0]
                  }
                />
              </Reveal>

              <Reveal
                className="home-review-wrap home-review-wrap--short"
                distance={60}
              >
                <ReviewCard
                  review={
                    reviews[1]
                  }
                />
              </Reveal>
            </div>

            <div className="home-reviews__right">
              <Reveal
                className="home-review-wrap home-review-wrap--short"
                distance={60}
              >
                <ReviewCard
                  review={
                    reviews[2]
                  }
                />
              </Reveal>

              <Reveal
                className="home-review-wrap home-review-wrap--long"
                distance={60}
              >
                <ReviewCard
                  review={
                    reviews[3]
                  }
                />
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}