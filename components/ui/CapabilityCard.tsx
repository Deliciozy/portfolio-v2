type CapabilityVariant =
  | "captain"
  | "guardian"
  | "explorer";

type CapabilityCardProps = {
  title: string;
  subtitle: string;
  description?: string;
  body?: string;
  copy?: string;
  icon?: CapabilityVariant;
  className?: string;
};

function getVariant(
  title: string,
  icon?: CapabilityVariant,
): CapabilityVariant {
  if (icon) {
    return icon;
  }

  const value = title
    .trim()
    .toLowerCase();

  if (value.includes("captain")) {
    return "captain";
  }

  if (value.includes("guardian")) {
    return "guardian";
  }

  return "explorer";
}

function getAccentCount(
  variant: CapabilityVariant,
) {
  if (variant === "captain") {
    return 1;
  }

  if (variant === "guardian") {
    return 2;
  }

  return 3;
}

function CapabilityIcon({
  variant,
}: {
  variant: CapabilityVariant;
}) {
  if (variant === "captain") {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="capability-card__icon-svg"
      >
        <path
          d="M12 3.4V20.3"
          vectorEffect="non-scaling-stroke"
        />

        <path
          d="M8.8 7.1H15.2"
          vectorEffect="non-scaling-stroke"
        />

        <circle
          cx="12"
          cy="4.6"
          r="1.35"
        />

        <path
          d="M6.1 12.9V13.45C6.1 16.8 8.75 19.45 12.1 19.45C15.45 19.45 18.1 16.8 18.1 13.45V12.9"
          vectorEffect="non-scaling-stroke"
        />

        <path
          d="M3.85 13.1H6.1"
          vectorEffect="non-scaling-stroke"
        />

        <path
          d="M18.1 13.1H20.35"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    );
  }

  if (variant === "guardian") {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="capability-card__icon-svg"
      >
        <path
          d="M12 3.4L18.75 6.2V11.05C18.75 15.85 16.2 19.1 12 20.8C7.8 19.1 5.25 15.85 5.25 11.05V6.2L12 3.4Z"
          vectorEffect="non-scaling-stroke"
        />

        <path
          d="M12 3.75V20.45"
          vectorEffect="non-scaling-stroke"
        />

        <path
          d="M5.95 10.25H18.05"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="capability-card__icon-svg"
    >
      <circle
        cx="10"
        cy="10"
        r="5.55"
        vectorEffect="non-scaling-stroke"
      />

      <path
        d="M14.25 14.25L19.4 19.4"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function CapabilityAccent({
  activeCount,
}: {
  activeCount: number;
}) {
  return (
    <div
      className="capability-card__accent"
      aria-hidden="true"
    >
      {Array.from({
        length: 3,
      }).map((_, index) => {
        const isActive =
          index < activeCount;

        return (
          <span
            key={index}
            className={
              isActive
                ? "capability-card__accent-pill capability-card__accent-pill--active"
                : "capability-card__accent-pill"
            }
          />
        );
      })}
    </div>
  );
}

export default function CapabilityCard({
  title,
  subtitle,
  description,
  body,
  copy,
  icon,
  className = "",
}: CapabilityCardProps) {
  const variant =
    getVariant(
      title,
      icon,
    );

  const activeCount =
    getAccentCount(
      variant,
    );

  const bodyText =
    description ??
    body ??
    copy ??
    "";

  const cardClassName = [
    "capability-card",
    `capability-card--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article
      className={cardClassName}
    >
      <div className="capability-card__top">
        <div className="capability-card__icon">
          <CapabilityIcon
            variant={variant}
          />
        </div>

        <CapabilityAccent
          activeCount={
            activeCount
          }
        />
      </div>

      <div className="capability-card__content">
        <h3 className="capability-card__title">
          {title}
        </h3>

        <p className="capability-card__subtitle">
          {subtitle}
        </p>

        <p className="capability-card__body">
          {bodyText}
        </p>
      </div>
    </article>
  );
}