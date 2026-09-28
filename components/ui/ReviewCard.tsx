import Image from "next/image";

import type {
  Review,
} from "@/data/reviews";

type ReviewCardProps = {
  review: Review;
};

export default function ReviewCard({
  review,
}: ReviewCardProps) {
  return (
    <article className="home-review">
      <p className="home-review__quote">
        {review.quote}
      </p>

      <div
        className="home-review__divider"
        aria-hidden="true"
      />

      <div className="home-review__person">
        <div
          className="home-review__avatar"
          style={{
            overflow: "hidden",
            boxShadow:
              "0 1px 2px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Image
            src={review.avatar}
            alt={`${review.name} portrait`}
            width={45}
            height={45}
            sizes="45px"
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              borderRadius: "inherit",
            }}
          />
        </div>

        <div className="home-review__person-copy">
          <h5>
            {review.name}
          </h5>

          <p>
            {review.role}
          </p>
        </div>
      </div>
    </article>
  );
}