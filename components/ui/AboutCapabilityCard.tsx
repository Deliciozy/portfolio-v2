import type {
    AboutCapability,
  } from "@/data/about";
  
  type AboutCapabilityCardProps = {
    capability:
      AboutCapability;
  };
  
  function Icon({
    type,
  }: {
    type:
      AboutCapability["icon"];
  }) {
    if (type === "captain") {
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M12 3v15M8 7h8M6 14c.8 3.2 2.8 5 6 5s5.2-1.8 6-5M9 20h6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    }
  
    if (type === "guardian") {
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M12 3 18 5v5c0 4.2-2.1 7.6-6 10-3.9-2.4-6-5.8-6-10V5l6-2Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
  
          <path
            d="M12 3v17"
            stroke="currentColor"
            strokeWidth="1.4"
          />
        </svg>
      );
    }
  
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="10.5"
          cy="10.5"
          r="5.5"
          stroke="currentColor"
          strokeWidth="1.6"
        />
  
        <path
          d="m15 15 5 5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  
  export default function AboutCapabilityCard({
    capability,
  }: AboutCapabilityCardProps) {
    return (
      <article className="about-capability">
        <div className="about-capability__top">
          <div className="about-capability__icon">
            <Icon
              type={
                capability.icon
              }
            />
          </div>
  
          <div
            className="about-capability__signal"
            aria-hidden="true"
          >
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
  
        <div className="about-capability__copy">
          <h3 className="about-capability__title">
            {capability.title}
          </h3>
  
          <p className="about-capability__subtitle">
            {capability.subtitle}
          </p>
  
          <p className="about-capability__description">
            {
              capability.description
            }
          </p>
        </div>
      </article>
    );
  }