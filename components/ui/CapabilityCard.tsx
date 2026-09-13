type CapabilityCardProps = {
    icon: string;
    title: string;
    subtitle: string;
    description: string;
  };
  
  export default function CapabilityCard({
    icon,
    title,
    subtitle,
    description,
  }: CapabilityCardProps) {
    return (
      <article className="capability-card">
        <div className="capability-card__top">
          <span className="capability-card__icon" aria-hidden="true">
            {icon}
          </span>
  
          <span className="capability-card__signal" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
        </div>
  
        <div className="capability-card__content">
          <h3 className="capability-card__title">{title}</h3>
  
          <p className="capability-card__subtitle">{subtitle}</p>
  
          <p className="capability-card__description">{description}</p>
        </div>
      </article>
    );
  }