import type { Review } from "@/data/reviews";

type ReviewCardProps = {
  review: Review;
};

export default function ReviewCard({
  review,
}: ReviewCardProps) {
  return (
    <article className="review-card">
      <p className="review-card__quote">
        {review.quote}
      </p>

      <div className="review-card__person">
        <div
          className="review-card__avatar"
          aria-hidden="true"
        />

        <div>
          <p className="review-card__name">
            {review.name}
          </p>

          <p className="review-card__role">
            {review.role}
          </p>
        </div>
      </div>
    </article>
  );
}